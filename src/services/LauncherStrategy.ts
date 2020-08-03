const Store = window.require("electron-store");
const BASE_UPDATE_URL = process.env.IS_TEST
    ? "https://update-service.test.w3champions.com/"
    : "https://update-service.prod.test.w3champions.com/";

const { remote } = window.require("electron");
const https = window.require("https");
const fs = window.require("fs");
const AdmZip = window.require('adm-zip');
const { spawn } = window.require("child_process");

export abstract class LauncherStrategy {
    private store: any;
    private _isLoading = false;
    constructor() {
        this.store = new Store();
    }

    abstract getDefaultPathMap(): string;
    abstract getDefaultPathWc3(): string;
    abstract getDefaultBnetPath(): string;
    abstract getBnetExecutable(): string;
    abstract turnOnLocalFiles(): void;

    get isLoading(): boolean {
        return this._isLoading
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

    public startWc3() {
        const bnetPath = `${this.bnetPath}\\${this.getBnetExecutable()}`;
        const ls = spawn(bnetPath, ['--exec="launch W3"'], {
            detached: true,
            windowsVerbatimArguments: true,
        });
        ls.unref();
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


    private async downloadAndWriteFile(fileName: string, to: string) {
        const tempFile = `${remote.app.getPath("downloads")}\\temp_${fileName}.zip`;
        const file = fs.createWriteStream(tempFile);
        https.get(`${BASE_UPDATE_URL}api/${fileName}`, function(response: any) {
            response.pipe(file).on("finish", async function() {
                file.close();
                const zip = new AdmZip(tempFile);
                zip.extractAllTo(to, true);
                fs.unlinkSync(tempFile);
            });
        });
    }

    public async updateIfNeeded(): Promise<boolean> {
        this._isLoading = true;
        const newVersion = await this.needsUpdate();
        if (!newVersion) {
            this._isLoading = false;
            return true;
        }

        let w3path = await this.getFolderFromUserIfNeverStarted(
            this.w3Path,
            this.getDefaultPathWc3(),
            "Warcraft III not found",
            "Warcraft III folder not found, please locate it manually"
        );
        if (fs.existsSync(`${w3path}\\_retail_`)) {
            w3path = `${w3path}\\_retail_`;
        }

        if (!w3path) return false;
        this.w3Path = w3path;

        const w3mapPath = await this.getFolderFromUserIfNeverStarted(
            this.mapPath,
            await this.getDefaultPathMap(),
            "Mapfolder not found",
            "The mapfolder of Warcraft III was not found, please locate it manually"
        );

        if (!w3mapPath) return false;
        this.mapPath = w3mapPath;

        const bnetPath = await this.getFolderFromUserIfNeverStarted(
            this.bnetPath,
            this.getDefaultBnetPath(),
            "Battle.Net not found",
            "Battle.Net folder not found, please locate it manually"
        );

        if (!bnetPath) return false;
        this.bnetPath = bnetPath;

        await this.downloadAndWriteFile("maps", w3mapPath);
        await this.downloadAndWriteFile("webui", w3path);

        this.currentVersion = newVersion;

        this.turnOnLocalFiles();

        this._isLoading = false;

        return true;
    }
}
