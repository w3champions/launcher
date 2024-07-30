import type { IEndpoint } from "@/background-thread/endpoint/endpoint.service";
import { AppStore } from "@/globalState/vuex-store";
import logger from "@/logger";

const { ipcRenderer } = window.require("electron");
const { remote } = window.require("electron");
const fs = window.require("fs");
const AdmZip = window.require('adm-zip');
const arrayBufferToBuffer = window.require('arraybuffer-to-buffer');

export abstract class LauncherStrategy {
    protected store: AppStore;

    abstract getDefaultPathMap(): string;
    abstract getDefaultPathWc3(): string;
    abstract getDefaultBnetPath(): string;
    abstract getDefaultBnetPathExecutable(): string;
    abstract getDefaultWc3Executable(): string;
    abstract turnOnLocalFiles(): void;
    abstract getWar3PreferencesFile(): string;
    abstract getWar3HotkeyFile(): string;
    abstract startWc3Process(bnetPath: string): void;
    abstract getCopyCommand(from: string, to: string): string;
    abstract getBattleNetAgentPath(): string;
    abstract getBnetPathFromAgentLogs(): string;
    abstract getWc3PathFromAgentLogs(): string;

    constructor(store: AppStore) {
        this.store = store;
    }

    unsetLoading() {
        this.store.commit.updateHandling.FINISH_WEBUI_DL();
        this.store.commit.updateHandling.FINISH_MAPS_DL();
    }

    public startWc3() {
        this.makeSureJoinBugFilesAreGone();
        this.turnOnLocalFiles();
        this.startWc3Process(this.bnetPath);
    }

    public async downloadMap(fileName: string, mapsPath: string, onProgress?: (percentage: number) => void) {
        if (!this.store) {
            return;
        }

        const delimiter = mapsPath.endsWith('/') || mapsPath.endsWith('\\') ? '' : '/';
        const to = `${mapsPath}${delimiter}${fileName}`;
        logger.info(`Download ${fileName} to: ${to}`)
        const url = this.endpoint.staticBaseUpdateFileUrl
            ? this.rewriteStaticUpdateFileUrl(this.endpoint.staticBaseUpdateFileUrl, `maps/${fileName}`, this.isTest)
            : `${this.endpoint.updateUrl}api/maps/download?mapPath=${fileName}`;

        try {
            const fileBytesArray = await this.downloadFileWithProgress(url, onProgress);
            const buffer = arrayBufferToBuffer(fileBytesArray);

        try {
                const lastSlash = to.lastIndexOf('/');
                const mapDir = to.substr(0, lastSlash);
                fs.mkdirSync(mapDir, { recursive: true });
                fs.writeFile(to, buffer, (err: any) => {
                    if (err) {
                        logger.error(err);
                    }
                });
            } catch (e) {
                logger.info(`normal download threw exception: ${e}`)
                const temPath = `${remote.app.getPath("appData")}/w3champions/${fileName}_temp`;
                fs.writeFile(temPath, buffer, () => { })
                logger.info(`try as sudo now from: ${temPath} to: ${to}`)
                this.store.dispatch.updateHandling.sudoCopyFromTo({ from: temPath, to })
            }

            return true;
        } catch (e) {
            logger.error(e);
            return false;
        }
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

    get onlineW3cVersion() {
        return this.store.state.updateHandling.onlineW3cVersion;
    }

    get needsW3cUpdate() {
        return this.onlineW3cVersion !== '' && this.localW3cVersion !== this.onlineW3cVersion;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private rewriteStaticUpdateFileUrl(base: string, fileName: string, _isTest: boolean) {
        let url
        if (fileName === 'maps') {
            url = `${base}maps_v${this.onlineW3cVersion}.zip`
        } else if (fileName === 'webui') {
            url = `${base}china-webui.zip`
        } else if (fileName === 'fonts') {
            url = `${base}fonts.zip`
        } else {
            url = `${base}${fileName}`
        }
        return `${url}?version=${encodeURIComponent(this.onlineW3cVersion)}`
    }

    public async repairWc3() {
        await this.store.dispatch.setTestMode(false);
        this.store.commit.updateHandling.START_DLS();
        this.store.dispatch.updateHandling.resetPaths();
        await this.updateIfNeeded();
        await ipcRenderer.invoke('flo-add-firewall-rule')
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
            const path = await this.openDialogForUserFolderSelection(header, message);
            if (!path) return false;
            return path;
        }

        return path;
    }

    private async openDialogForUserFolderSelection(
        title: string,
        message: string
    ) {
        const folderResult = await remote.dialog.showMessageBox({
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
                { name: 'Applications', extensions: ['app'] },
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

        await this.store.dispatch.updateHandling.loadOnlineW3CVersion();
        this.store.dispatch.updateHandling.saveLocalW3CVersion(this.onlineW3cVersion);
        logger.info(`switched to test/live with w3c version: ${this.localW3cVersion}`)
        this.store.commit.updateHandling.FINISH_DLS();
    }

    private async downloadWebui() {
        //await this.downloadAndWriteFile("webui", (this.isTest && this.isBlizzardPTR) ? this.w3Path.replace('_retail_', '_ptr_') : this.w3Path);
        this.store.getters.fileService.copyW3ChampionsFiles(
            this.isBlizzardPTR ? this.w3Path.replace('_retail_', '_ptr_') : this.w3Path,
            this.isTest);
    }

    private updateDownloadProgress(progress: number) {
        this.store.commit.updateHandling.DOWNLOAD_PROGRESS(progress);
    }

    get endpoint() {
        return this.store.getters.selectedEndpoint as IEndpoint
    }

    get isBlizzardPTR() {
        return this.store.state.updateHandling.isBlizzardPTRKey;
    }

    get isTest() {
        return this.store.state.isTest;
    }

    get w3PathWithOutRetail() {
        if (!this.w3Path) return ""
        return this.w3Path.replace("/_retail_", "").replace("\\_retail_", "");
    }

    private async downloadAndWriteFile(fileName: string, to: string, onProgress?: (percentage: number) => void) {
        logger.info(`Download ${fileName} to: ${to}`)

        const url = this.endpoint.staticBaseUpdateFileUrl 
            ? this.rewriteStaticUpdateFileUrl(this.endpoint.staticBaseUpdateFileUrl, fileName, this.isTest)
            : `${this.endpoint.updateUrl}api/${fileName}?ptr=${this.isTest}`;

        console.log(url)

        try {
            const fileBytesArray = await this.downloadFileWithProgress(url, onProgress);
            const buffer = arrayBufferToBuffer(fileBytesArray);
            const zip = new AdmZip(buffer);
            
            try {
                zip.extractAllTo(to, true);

                if(fileName == "maps" && this.isBlizzardPTR){
                    zip.extractAllTo(to.replace("Warcraft III", "Warcraft III Public Test"), true);
                }

            } catch (e) {
                logger.info(`normal download threw exception: ${e}`)
                const temPath = `${remote.app.getPath("appData")}/w3champions/${fileName}_temp`;
                zip.extractAllTo(temPath, true);
                logger.info(`try as sudo now from: ${temPath} to: ${to}`)
                this.store.dispatch.updateHandling.sudoCopyFromTo({ from: temPath, to });
            }

            return "";
        } catch (e) {
            logger.error(e);
        }
    }

    public async updateIfNeeded() {
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


        this.store.commit.updateHandling.FINISH_MAPS_DL();
        await this.downloadWebui()
        this.store.commit.updateHandling.FINISH_WEBUI_DL();

        this.store.dispatch.updateHandling.saveLocalW3CVersion(this.onlineW3cVersion);

        this.turnOnLocalFiles();
    }

    public async updateBnetPath() {
        let defaultBnetPath = this.getBnetPathFromAgentLogs();
        if (!defaultBnetPath) {
            defaultBnetPath = this.getDefaultBnetPath();
        }

        logger.info("default bnet: " + defaultBnetPath);
        const bnetPath = await this.getFolderFromUserIfNeverStarted(
            this.bnetPath,
            defaultBnetPath,
            "Battle.Net not found",
            "Battle.Net folder not found, please locate it manually"
        );

        if (!bnetPath || bnetPath === "defaultPath") {
            return "";
        }

        this.store.dispatch.updateHandling.saveBnetPath(bnetPath)

        return bnetPath;
    }

    public async hardSetBnetPath() {
        const selectedPath = await this.openSelectFolderDialog(this.bnetPath);
        if (!selectedPath) return;
        this.store.commit.updateHandling.SET_BNET_PATH(selectedPath);
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
        if (!fs.existsSync(`${path}/${this.getDefaultWc3Executable()}`)) {
            this.store.commit.updateHandling.W3_PATH_IS_INVALID(true);
        } else {
            this.store.commit.updateHandling.W3_PATH_IS_INVALID(false);

            if (!fs.existsSync(`${this.w3Path}/_retail_`) && fs.existsSync(`${this.w3Path}/x86_64`)) {
                this.store.dispatch.updateHandling.saveW3Path(path)
            } else {
                this.store.dispatch.updateHandling.saveW3Path(`${path}/_retail_`)
            }
        }

        if (this.w3PathIsValid) {
            await this.redownloadW3c();
        }
    }

    public async setCustomFont(value: boolean) {
        if (!this.w3PathIsValid) return;
        if (value) {
            this.downloadAndWriteFile("fonts", this.w3Path);
            if (this.isBlizzardPTR) {
                this.downloadAndWriteFile("fonts", this.w3Path.replace('retail', 'ptr'))
            }
        } else {
            fs.rmdirSync(`${this.w3Path}/fonts`, {recursive: true});
            if (this.isBlizzardPTR) {
                fs.rmdirSync(`${this.w3Path.replace('retail', 'ptr')}/fonts`,
                {recursive: true});
            }
        }
    }

    public async redownloadW3c() {
        if (!this.w3PathIsValid) return;
        this.store.commit.updateHandling.START_DLS();
        await this.downloadWebui();
        this.store.commit.updateHandling.FINISH_WEBUI_DL();
        this.store.commit.updateHandling.FINISH_MAPS_DL();
    }

    public async updateW3cPath() {
        let defaultW3Path = this.getWc3PathFromAgentLogs();
        if (!defaultW3Path) {
            defaultW3Path = this.getDefaultPathWc3();
        }

        logger.info("default wc3 path: " + defaultW3Path);
        let w3path = await this.getFolderFromUserIfNeverStarted(
            this.w3Path,
            defaultW3Path,
            "Warcraft III not found",
            "Warcraft III folder not found, please locate it manually"
        );

        if (fs.existsSync(`${w3path}/_retail_`)) {
            w3path = `${w3path}/_retail_`;
        }

        if (!w3path || w3path === "defaultPath") {
            return "";
        }

        this.store.dispatch.updateHandling.saveW3Path(w3path)

        return w3path;
    }

    private async downloadFileWithProgress(url: string, onProgress?: (percentage: number) => void) {
        const response = await fetch(url, { mode: 'no-cors' });
        const reader = response.body?.getReader();
        const contentLength = parseInt(response.headers.get('Content-Length') as string);
        let chunksAll;
        if (reader) {
            let receivedLength = 0;
            const chunks = [];
            while (true) { // eslint-disable-line no-constant-condition
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

                chunks.push(value as Uint8Array);
                receivedLength += value?.length || 0;
                if (onProgress) {
                    const percentCompleted = Math.floor(receivedLength / contentLength * 100);
                    onProgress(percentCompleted);
                }
            }

            chunksAll = new Uint8Array(receivedLength);
            let position = 0;
            for (const chunk of chunks) {
                chunksAll.set(chunk, position);
                position += chunk.length;
            }
        }

        return chunksAll;
    }

    private makeSureJoinBugFilesAreGone() {
        try {
            if (fs.existsSync(`${this.w3Path}/Maps/W3Champions`)) {
                logger.info(`delete maps in ${this.w3Path}/Maps/W3Champions`)
                fs.rmdirSync(`${this.w3Path}/Maps/W3Champions`, { recursive: true }, (e: Error) => { logger.error(e) })
            }

            const w3PathWithoutRetail = this.w3PathWithOutRetail;
            if (fs.existsSync(`${w3PathWithoutRetail}/Maps/W3Champions`)) {
                logger.info(`delete maps in ${w3PathWithoutRetail}/Maps/W3Champions`)
                fs.rmdirSync(`${w3PathWithoutRetail}/Maps/W3Champions`, { recursive: true }, (e: Error) => { logger.error(e) })
            }
        } catch (e) {
            logger.error(e)
        }
    }

    getPathFromAgentLogs(regex: RegExp): string {
        let path = '';

        try {
            const battleNetAgentPath = this.getBattleNetAgentPath();

            if (fs.existsSync(battleNetAgentPath)) {
                const agentFiles = fs.readdirSync(battleNetAgentPath) as string[];
                const agentFolders = agentFiles.filter(x => x.toLowerCase().startsWith('agent.')).reverse();

                for (const agentFolder of agentFolders) {
                    const dotIndex = agentFolder.indexOf('.');
                    const versionString = agentFolder.substr(dotIndex + 1);
                    const parsedVer = parseInt(versionString);

                    if (!isNaN(parsedVer)) {
                        const agentLogsDir = `${battleNetAgentPath}\\${agentFolder}\\Logs`;
                        if (fs.existsSync(agentLogsDir)) {
                            const allFiles = fs.readdirSync(agentLogsDir) as string[];
                            const logFiles = allFiles.filter(x => x.toLowerCase().startsWith('agent-')).reverse();

                            for (const file of logFiles) {
                                const content = fs.readFileSync(agentLogsDir + "\\" + file).toString();
                                path = this.getPathFromAgentLog(content, regex);

                                if (path) {
                                    break;
                                }
                            }
                        }
                    }
                    if (path) {
                        break;
                    }
                }
            }
        }
        catch (e) {
            logger.error(e);
        }

        return path;
    }

    private getPathFromAgentLog(content: any, regex: RegExp) {
        const result = content.match(regex);
        let path = '';
        if (result != null && result.length >= 2) {
            if (fs.existsSync(result[1])) {
                path = result[1].replace(/\//g, "\\");
            }
        }
        return path;
    }
}
