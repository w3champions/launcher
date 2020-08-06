import store from '../store/index'

const { remote } = window.require("electron");
const axios = window.require("axios");
const fs = window.require("fs");
const AdmZip = window.require('adm-zip');

export abstract class LauncherStrategy{
    private store = store;

    abstract getDefaultPathMap(): string;
    abstract getDefaultPathWc3(): string;
    abstract getDefaultBnetPath(): string;
    abstract turnOnLocalFiles(): void;
    abstract startWc3Process(bnetPath: string): void;

    unsetLoading() {
        this.store.commit.updateHandling.FINISH_WEBUI_DL();
        this.store.commit.updateHandling.FINISH_MAPS_DL();
    }

    public startWc3() {
        this.makeSureJoinBugFilesAreGone();
        this.startWc3Process(this.bnetPath);
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
            return "";
        }

        const openDialogReturnValue = await remote.dialog.showOpenDialog({
            properties: ["openDirectory", "openFile"],
            filters: [
                { name: 'Applications', extensions: ['app'] },
            ]
        });

        return openDialogReturnValue.filePaths[0];
    }

    public async switchToPtr() {
        this.store.commit.updateHandling.START_WEBUI_DL();
        await this.downloadAndWriteFile("webui", this.w3Path, (() => {
            this.store.commit.updateHandling.FINISH_WEBUI_DL();
            this.store.dispatch.setTestMode(true);
        }), true);
    }

    public async switchToProd() {
        this.store.commit.updateHandling.START_WEBUI_DL();
        await this.downloadAndWriteFile("webui", this.w3Path, (() => {
            this.store.commit.updateHandling.FINISH_WEBUI_DL();
            this.store.dispatch.setTestMode(false);
        }));
    }

    private async downloadAndWriteFile(fileName: string, to: string, onFinish: () => void, isTest: boolean = false) {
        axios.get({url: `${this.store.state.updateUrl}api/${fileName}?ptr=${isTest}`, responseType: 'arraybuffer'})
            .then((body: any) => {
                const zip = new AdmZip(body);
                zip.extractAllTo(to, true);
                onFinish();
            })
            .catch((e: Error) =>  {
                console.log(e);
            })
    }

    public async updateIfNeeded() {
        this.store.commit.updateHandling.START_DLS();
        if (!this.needsW3cUpdate) {
            console.log("no need for update")
            this.unsetLoading();
            return;
        }

        const w3path = await this.updateW3cPath();
        if (!w3path) return;
        const w3mapPath = await this.updateMapPath();
        if (!w3mapPath) return;
        const bnetPath = this.updateBnetPath();
        if (!bnetPath) return;

        await this.downloadAndWriteFile("maps", w3mapPath, this.store.commit.updateHandling.FINISH_MAPS_DL);
        await this.downloadAndWriteFile("webui", w3path, this.store.commit.updateHandling.FINISH_WEBUI_DL);

        this.store.dispatch.updateHandling.saveLocalW3CVersion(this.onlineW3cVersion);

        this.turnOnLocalFiles();
    }

    public async updateBnetPath() {
        const defaultBnetPath = this.getDefaultBnetPath();
        console.log("default bnet: " + defaultBnetPath);
        const bnetPath = await this.getFolderFromUserIfNeverStarted(
            this.bnetPath,
            defaultBnetPath,
            "Battle.Net not found",
            "Battle.Net folder not found, please locate it manually"
        );

        if (!bnetPath) {
            return;
        }

        this.store.dispatch.updateHandling.saveBnetPath(bnetPath)

        return bnetPath;
    }

    public async hardSetBnetPath() {
        await this.hardSetPath("Battle-Net", this.store.commit.updateHandling.SET_BNET_PATH);
    }

    public async hardSetW3cPath() {
        await this.hardSetPath("Warcraft III", this.store.commit.updateHandling.SET_W3_PATH);
    }

    public async redownloadW3c() {
        this.store.commit.updateHandling.START_DLS();
        await this.downloadAndWriteFile("maps", this.mapsPath, this.store.commit.updateHandling.FINISH_MAPS_DL);
        await this.downloadAndWriteFile("webui", this.w3Path, this.store.commit.updateHandling.FINISH_WEBUI_DL);
    }

    public async hardSetMapPath() {
        await this.hardSetPath("Map", this.store.commit.updateHandling.SET_MAPS_PATH);
    }

    private async hardSetPath(locationName: string, set: (s: string) => void) {
        const path = await this.openDialogForUserFolderSelction(`Select ${locationName} Folder`, `Please locate the ${locationName} Folder manually`);
        if (!path) return;
        set(path);
    }

    public async updateMapPath() {
        const defaultMapPath = this.getDefaultPathMap();
        console.log("default map path: " + defaultMapPath);
        const w3mapPath = await this.getFolderFromUserIfNeverStarted(
            this.mapsPath,
            defaultMapPath,
            "Mapfolder not found",
            "The mapfolder of Warcraft III was not found, please locate it manually"
        );

        if (!w3mapPath) {
            return;
        }

        this.store.dispatch.updateHandling.saveMapPath(w3mapPath)

        return w3mapPath;
    }

    public async updateW3cPath() {
        const defaultPathWc3 = this.getDefaultPathWc3();
        console.log("default wc3 path: " + defaultPathWc3);
        let w3path = await this.getFolderFromUserIfNeverStarted(
            this.w3Path,
            defaultPathWc3,
            "Warcraft III not found",
            "Warcraft III folder not found, please locate it manually"
        );
        if (fs.existsSync(`${w3path}/_retail_`)) {
            w3path = `${w3path}/_retail_`;
        }

        if (!w3path) {
            return;
        }

        this.store.dispatch.updateHandling.saveW3Path(w3path)

        return w3path;
    }

    private makeSureJoinBugFilesAreGone() {
        if (fs.existsSync(`${this.w3Path}/Maps/W3Champions`))
        {
            console.log(`delete maps in ${this.w3Path}/Maps/W3Champions`)
            fs.rmdirSync(`${this.w3Path}/Maps/W3Champions`, { recursive: true }, (e: Error) => { throw e })
        }

        const w3PathWithoutRetail = this.w3Path.replace("/_retail_", "");
        if (fs.existsSync(`${w3PathWithoutRetail}/Maps/W3Champions`))
        {
            console.log(`delete maps in ${w3PathWithoutRetail}/Maps/W3Champions`)
            fs.rmdirSync(`${w3PathWithoutRetail}/Maps/W3Champions`, { recursive: true }, (e: Error) => { throw e })
        }
    }
}
