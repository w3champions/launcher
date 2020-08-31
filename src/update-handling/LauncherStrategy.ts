import store from '../globalState/vuex-store'
import logger from "@/logger";

const { remote } = window.require("electron");
const axios = window.require("axios");
const fs = window.require("fs");
const AdmZip = window.require('adm-zip');
const arrayBufferToBuffer = window.require('arraybuffer-to-buffer');

export abstract class LauncherStrategy{
    private store = store;

    abstract getDefaultPathMap(): string;
    abstract getDefaultPathWc3(): string;
    abstract getDefaultBnetPath(): string;
    abstract getDefaultBnetPathExecutable(): string;
    abstract getDefaultWc3Executable(): string;
    abstract turnOnLocalFiles(): void;
    abstract getWar3PreferencesFile(): string;
    abstract startWc3Process(bnetPath: string): void;
    abstract getCopyCommand(from: string, to: string): string;

    unsetLoading() {
        this.store.commit.updateHandling.FINISH_WEBUI_DL();
        this.store.commit.updateHandling.FINISH_MAPS_DL();
    }

    public startWc3() {
        this.makeSureJoinBugFilesAreGone();
        this.startWc3Process(this.bnetPath);
    }

    get w3PathIsValid() {
      return !this.store.state.updateHandling.w3PathIsInvalid;
    }

    get bnetPath() {
        return this.store.state.updateHandling?.bnetPath ?? "";
    }

    get w3Path() {
        return this.store.state.updateHandling?.w3Path ?? "";
    }

    get localW3cVersion() {
        return this.store.state.updateHandling.localW3cVersion;
    }

    get mapsPath() {
        return this.store.state.updateHandling.mapsPath;
    }

    get onlineW3cVersion() {
        return this.store.state.updateHandling.onlineW3cVersion;
    }

    get needsW3cUpdate() {
        return this.localW3cVersion !== this.onlineW3cVersion;
    }

    public async repairWc3() {
        await this.store.dispatch.setTestMode(false);
        this.store.commit.updateHandling.START_DLS();
        this.store.dispatch.updateHandling.resetPaths();
        await this.updateIfNeeded();
    }

    private async getFolderFromUserIfNeverStarted(
        path: string,
        defaultLocation: string,
        header: string,
        message: string
    ) {
        if (fs.existsSync(defaultLocation)) {
            return defaultLocation;
        }

        if (!path) {
            const path = await this.openDialogForUserFolderSelction(header, message);
            if (!path) return false;
            return path;
        }

        return path;
    }

    private async openDialogForUserFolderSelction(
        title: string,
        message: string
    ) {
        const folderResult = await remote.dialog.showMessageBox(null, {
            title: title,
            message: message,
            buttons: ["Locate Folder", "Cancel"],
        });

        if (folderResult.response === 1) {
            return "defaultPath";
        }

        return await this.openSelectFolderDialog("");
    }

    private async openSelectFolderDialog(currentPath: string) {
        const openDialogReturnValue = await remote.dialog.showOpenDialog({
            properties: ["openDirectory", "openFile"],
            filters: [
                {name: 'Applications', extensions: ['app']},
            ],
            defaultPath: currentPath
        });

        return openDialogReturnValue.filePaths[0];
    }

    public async switchToPtr() {
        await this.switchToTestMode(true);
    }

    public async switchToProd() {
        await this.switchToTestMode(false);
    }

    private async switchToTestMode(mode: boolean) {
        if (!this.w3PathIsValid) return;
        await this.store.dispatch.setTestMode(mode);
        await this.downloadMapsAndUi();
    }

    private async downloadMapsAndUi() {
        this.store.commit.updateHandling.START_DLS();
        await this.downloadWebui();
        await this.downloadMaps();
        await this.store.dispatch.updateHandling.loadOnlineW3CVersion();
        this.store.dispatch.updateHandling.saveLocalW3CVersion(this.onlineW3cVersion);
        logger.info(`switched to test/live with w3c version: ${this.localW3cVersion}`)
        this.store.commit.updateHandling.FINISH_DLS();
    }

    private downloadWebui() {
        return this.downloadAndWriteFile("webui", this.w3Path);
    }

    private downloadMaps() {
        return this.downloadAndWriteFile("maps", this.mapsPath, this.updateDownloadProgress);
    }

    private updateDownloadProgress(progress: number) {
        logger.info("Download: " + progress);
        store.commit.updateHandling.DOWNLOAD_PROGRESS(progress);
    }

    get updateUrl() {
        return this.store.state.updateUrl;
    }

    get isTest() {
        return this.store.state.isTest;
    }

    get w3PathWithOutRetail() {
        return this.w3Path?.replace("/_retail_", "")?.replace("\\_retail_", "") ?? "";
    }

    private async downloadAndWriteFile(fileName: string, to: string, onProgress?: (percentage: number) => void) {
        logger.info(`Download ${fileName} to: ${to}`)
        const url = `${this.updateUrl}api/${fileName}?ptr=${this.isTest}`;

        try {
            const body = await axios.get(url, {
                responseType: 'arraybuffer',
                onDownloadProgress: (ev: ProgressEvent) => {
                    if (!onProgress) return;
                    const percentCompleted = Math.floor(ev.loaded / ev.total * 100)
                    onProgress(percentCompleted);
                }
            });

            const buffer = arrayBufferToBuffer(body.data);
            const zip = new AdmZip(buffer);

            try {
                zip.extractAllTo(to, true);
            } catch (e) {
                logger.info(`normal download threw exception: ${e}`)
                const temPath = `${remote.app.getPath("appData")}/w3champions/${fileName}_temp`;
                zip.extractAllTo(temPath, true);
                logger.info(`try as sudo now from: ${temPath} to: ${to}`)
                this.store.dispatch.updateHandling.sudoCopyFromTo({from: temPath, to})
            }

            return "";
        } catch (e) {
            logger.error(e);
        }
    }

    public async updateIfNeeded() {
        await this.store.dispatch.updateHandling.loadOnlineW3CVersion();
        if (!this.needsW3cUpdate) {
            logger.info("no need for update")
            return;
        }

        this.store.commit.updateHandling.START_DLS();

        const w3path = await this.updateW3cPath();
        if (!w3path) {
            this.unsetLoading();
            return;
        }

        const bnetPath = this.updateBnetPath();
        if (!bnetPath) {
            this.unsetLoading();
            return;
        }


        this.store.dispatch.updateHandling.saveMapPath(this.getDefaultPathMap())

        await this.downloadMaps()
        this.store.commit.updateHandling.FINISH_MAPS_DL();
        await this.downloadWebui()
        this.store.commit.updateHandling.FINISH_WEBUI_DL();

        this.store.dispatch.updateHandling.saveLocalW3CVersion(this.onlineW3cVersion);

        this.turnOnLocalFiles();
    }

    public async updateBnetPath() {
        const defaultBnetPath = this.getDefaultBnetPath();
        logger.info("default bnet: " + defaultBnetPath);
        const bnetPath = await this.getFolderFromUserIfNeverStarted(
            this.bnetPath,
            defaultBnetPath,
            "Battle.Net not found",
            "Battle.Net folder not found, please locate it manually"
        );

        if (bnetPath === "defaultPath") {
            return "";
        }

        this.store.dispatch.updateHandling.saveBnetPath(bnetPath)

        return bnetPath;
    }

    public async hardSetBnetPath() {
        const selectedPpath = await this.openSelectFolderDialog(this.bnetPath);
        if (!selectedPpath) return;
        this.store.commit.updateHandling.SET_BNET_PATH(selectedPpath);
        const path = `${this.store.state.updateHandling.bnetPath}/${this.getDefaultBnetPathExecutable()}`;
        logger.info(`bnet path selected: ${path}`)
        if (!fs.existsSync(path)) {
            this.store.commit.updateHandling.BNET_PATH_IS_INVALID(true);
        } else {
            this.store.commit.updateHandling.BNET_PATH_IS_INVALID(false);
            this.store.dispatch.updateHandling.saveBnetPath(this.store.state.updateHandling.bnetPath)
        }
    }

    public async hardSetW3cPath() {
        const path = await this.openSelectFolderDialog(this.w3PathWithOutRetail);
        if (!path || path === this.w3PathWithOutRetail) return;
        this.store.commit.updateHandling.SET_W3_PATH(path);
        logger.info(`w3 path to check: ${path}`)
        if (!fs.existsSync(`${path}/${this.getDefaultWc3Executable()}`) ) {
            this.store.commit.updateHandling.W3_PATH_IS_INVALID(true);
        } else {
            this.store.commit.updateHandling.W3_PATH_IS_INVALID(false);

            if (fs.existsSync(`${this.w3Path}/_retail_`)) {
                this.store.dispatch.updateHandling.saveW3Path(`${path}/_retail_`)
            } else {
                this.store.dispatch.updateHandling.saveW3Path(path)
            }
        }

        if (this.w3PathIsValid) {
            await this.redownloadW3c();
        }
    }

    public async redownloadW3c() {
        if (!this.w3PathIsValid) return;
        this.store.commit.updateHandling.START_DLS();
        await this.downloadMaps()
        await this.downloadWebui();
        this.store.commit.updateHandling.FINISH_WEBUI_DL();
        this.store.commit.updateHandling.FINISH_MAPS_DL();
    }

    public async updateW3cPath() {
        const defaultPathWc3 = this.getDefaultPathWc3();
        logger.info("default wc3 path: " + defaultPathWc3);
        let w3path = await this.getFolderFromUserIfNeverStarted(
            this.w3Path,
            defaultPathWc3,
            "Warcraft III not found",
            "Warcraft III folder not found, please locate it manually"
        );

        if (fs.existsSync(`${w3path}/_retail_`)) {
            w3path = `${w3path}/_retail_`;
        }

        if (w3path === "defaultPath") {
            return "";
        }

        this.store.dispatch.updateHandling.saveW3Path(w3path)

        return w3path;
    }

    private makeSureJoinBugFilesAreGone() {
        try {

            if (fs.existsSync(`${this.w3Path}/Maps/W3Champions`))
            {
                logger.info(`delete maps in ${this.w3Path}/Maps/W3Champions`)
                fs.rmdirSync(`${this.w3Path}/Maps/W3Champions`, { recursive: true }, (e: Error) => { logger.error(e) })
            }

            const w3PathWithoutRetail = this.w3PathWithOutRetail;
            if (fs.existsSync(`${w3PathWithoutRetail}/Maps/W3Champions`))
            {
                logger.info(`delete maps in ${w3PathWithoutRetail}/Maps/W3Champions`)
                fs.rmdirSync(`${w3PathWithoutRetail}/Maps/W3Champions`, { recursive: true }, (e: Error) => { logger.error(e) })
            }
        } catch (e) {
            logger.error(e)
        }
    }
}
