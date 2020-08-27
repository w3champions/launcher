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
        return this.store.state.updateHandling.bnetPath;
    }

    get w3Path() {
        return this.store.state.updateHandling.w3Path;
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
        await this.store.dispatch.setTestMode(true);
        await this.downloadMapsAndUi();
    }

    public async switchToProd() {
        await this.store.dispatch.setTestMode(false);
        await this.downloadMapsAndUi();
    }

    private async downloadMapsAndUi() {
        this.store.commit.updateHandling.START_DLS();
        await this.downloadAndWriteFile("webui", this.w3Path);
        await this.downloadAndWriteFile("maps", this.mapsPath);
        this.store.commit.updateHandling.FINISH_DLS();
    }

    get updateUrl() {
        return this.store.state.updateUrl;
    }

    get isTest() {
        return this.store.state.isTest;
    }

    get w3PathWithOutRetail() {
        return this.w3Path.replace("/_retail_", "").replace("\\_retail_", "");
    }

    private async downloadAndWriteFile(fileName: string, to: string) {
        const url = `${this.updateUrl}api/${fileName}?ptr=${this.isTest}`;
        const body = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        const buffer = arrayBufferToBuffer(body.data);
        const zip = new AdmZip(buffer);

        try {
            zip.extractAllTo(to, true);
        } catch (e) {
            const tempFolder = `${remote.app.getPath("appData")}/w3champions/${fileName}_temp`;
            zip.extractAllTo(tempFolder, true);
            this.store.dispatch.updateHandling.sudoCopyFromTo({from: tempFolder, to})
        }
    }

    public async updateIfNeeded() {
        this.store.commit.updateHandling.START_DLS();
        if (!this.needsW3cUpdate) {
            logger.info("no need for update")
            this.unsetLoading();
            return;
        }

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

        await this.downloadAndWriteFile("maps", this.mapsPath);
        this.store.commit.updateHandling.FINISH_MAPS_DL();
        await this.downloadAndWriteFile("webui", w3path);
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
        await this.hardSetPath(this.store.commit.updateHandling.SET_BNET_PATH, this.bnetPath);
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
        await this.hardSetPath(this.store.commit.updateHandling.SET_W3_PATH, this.w3PathWithOutRetail);
        if (!fs.existsSync(`${this.store.state.updateHandling.w3Path}/Data`)) {
            this.store.commit.updateHandling.W3_PATH_IS_INVALID(true);
        } else {
            if (fs.existsSync(`${this.w3Path}/_retail_`)) {
                this.store.commit.updateHandling.SET_W3_PATH(`${this.w3Path}/_retail_`);
            }
            this.store.commit.updateHandling.W3_PATH_IS_INVALID(false);
            this.store.dispatch.updateHandling.saveW3Path(this.w3Path)
        }

        if (this.w3PathIsValid) {
            await this.redownloadW3c();
        }
    }

    private async hardSetPath(set: (s: string) => void, currentPath: string) {
        const path = await this.openSelectFolderDialog(currentPath);
        if (!path) return;
        set(path);
    }

    public async redownloadW3c() {
        this.store.commit.updateHandling.START_DLS();
        await this.downloadAndWriteFile("maps", this.mapsPath);
        await this.downloadAndWriteFile("webui", this.w3Path);
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
                fs.rmdirSync(`${this.w3Path}/Maps/W3Champions`, { recursive: true }, (e: Error) => { console.error(e) })
            }

            const w3PathWithoutRetail = this.w3PathWithOutRetail;
            if (fs.existsSync(`${w3PathWithoutRetail}/Maps/W3Champions`))
            {
                logger.info(`delete maps in ${w3PathWithoutRetail}/Maps/W3Champions`)
                fs.rmdirSync(`${w3PathWithoutRetail}/Maps/W3Champions`, { recursive: true }, (e: Error) => { console.error(e) })
            }
        } catch (e) {
            logger.error(e)
        }
    }
}
