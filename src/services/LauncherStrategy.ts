import {EventEmitter} from "events";

const Store = window.require("electron-store");
const BASE_UPDATE_URL = process.env.IS_TEST
    ? "https://update-service.test.w3champions.com/"
    : "https://update-service.prod.test.w3champions.com/";

const { remote } = window.require("electron");
const https = window.require("https");
const fs = window.require("fs");
const AdmZip = window.require('adm-zip');

export abstract class LauncherStrategy extends EventEmitter{
    private store = new Store();
    private _isLoadingMaps = false;
    private _isLoadingUi = false;

    private mapFinished = "MapFinished";
    private webUiFinished = "WebUiFinished";
    private loadingFinished = "LoadingFinished";

    abstract getDefaultPathMap(): string;
    abstract getDefaultPathWc3(): string;
    abstract getDefaultBnetPath(): string;
    abstract turnOnLocalFiles(): void;
    abstract startWc3Process(w3Path: string): void;

    constructor() {
        super();
        this.on(this.webUiFinished, () => {
            console.log("webui finished")
            this._isLoadingUi = false;
            if (!this._isLoadingMaps) {
                console.log("files updated after webui")
                this.emit(this.loadingFinished)
            }
        })
        this.on(this.mapFinished, () => {
            console.log("maps finished")
            this._isLoadingMaps = false;
            if (!this._isLoadingUi) {
                console.log("files updated after map")
                this.emit(this.loadingFinished)
            }
        })
    }

    setLoading() {
        this._isLoadingUi = true;
        this._isLoadingMaps = true;
    }

    unsetLoading() {
        this._isLoadingUi = false;
        this._isLoadingMaps = false;
        this.emit(this.loadingFinished);
    }

    get mapPath(): string {
        return this.store.get("wc3MapKey")
    }

    set mapPath(value: string) {
        this.store.set("wc3MapKey", value);
    }

    get bnetPath(): string {
        return this.store.get("bnetKey")
    }

    set bnetPath(value: string) {
        this.store.set("bnetKey", value);
    }

    get currentVersion(): string {
        return this.store.get("currentVersionKey")
    }

    set currentVersion(value: string) {
        this.store.set("currentVersionKey", value);
    }

    get w3Path(): string {
        return this.store.get("wc3PathKey");
    }

    set w3Path(value: string) {
        this.store.set("wc3PathKey", value);
    }

    public startWc3() {
        this.startWc3Process(this.bnetPath);
    }

    private async needsUpdate() {
        const currentVersion = this.currentVersion;
        const version = await (
            await fetch(`${BASE_UPDATE_URL}api/client-version`)
        ).json();
        if (version.version === currentVersion) {
            return null;
        }

        return version.version;
    }

    public async repairWc3() {
        this.w3Path = "";
        this.mapPath = "";
        this.bnetPath = "";
        this.currentVersion = "";
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
            buttons: ["Locate Folder", "Cancel Update"],
        });
        if (folderResult.response === 1) {
            return "";
        }
        const openDialogReturnValue = await remote.dialog.showOpenDialog({
            properties: ["openDirectory"],
        });
        return openDialogReturnValue.filePaths[0];
    }


    private async downloadAndWriteFile(fileName: string, to: string, onFinish: () => void) {
        const tempFile = `${remote.app.getPath("downloads")}/temp_${fileName}.zip`;
        const file = fs.createWriteStream(tempFile);
        https.get(`${BASE_UPDATE_URL}api/${fileName}`, function(response: any) {
            response.pipe(file).on("finish", async function() {
                file.close();
                const zip = new AdmZip(tempFile);
                zip.extractAllTo(to, true);
                fs.unlinkSync(tempFile);
                onFinish();
            });
        });
    }

    public async updateIfNeeded() {
        this.setLoading();
        const newVersion = await this.needsUpdate();
        if (!newVersion) {
            console.log("no need for update, start wc3")
            this.unsetLoading();
            return;
        }

        const defaultPathWc3 = this.getDefaultPathWc3();
        console.log("default wc3 path: " + defaultPathWc3);
        const w3path = await this.getFolderFromUserIfNeverStarted(
            this.w3Path,
            defaultPathWc3,
            "Warcraft III not found",
            "Warcraft III folder not found, please locate it manually"
        );

        if (!w3path) return;
        this.w3Path = w3path;

        const defaultMapPath = this.getDefaultPathMap();
        console.log("default map path: " + defaultMapPath);
        const w3mapPath = await this.getFolderFromUserIfNeverStarted(
            this.mapPath,
            defaultMapPath,
            "Mapfolder not found",
            "The mapfolder of Warcraft III was not found, please locate it manually"
        );

        if (!w3mapPath) return;
        this.mapPath = w3mapPath;

        const defaultBnetPath = this.getDefaultBnetPath();
        console.log("default bnet: " + defaultBnetPath);
        const bnetPath = await this.getFolderFromUserIfNeverStarted(
            this.bnetPath,
            defaultBnetPath,
            "Battle.Net not found",
            "Battle.Net folder not found, please locate it manually"
        );

        if (!bnetPath) return;
        this.bnetPath = bnetPath;

        await this.downloadAndWriteFile("maps", w3mapPath, (() => this.emit(this.mapFinished)));
        await this.downloadAndWriteFile("webui", w3path, (() => this.emit(this.webUiFinished)));

        this.currentVersion = newVersion;

        this.turnOnLocalFiles();
    }
}
