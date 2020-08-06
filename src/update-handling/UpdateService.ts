const Store = window.require("electron-store");

export class UpdateService {
    private store = new Store();

    loadMapsPath(): string {
        return this.store.get("wc3MapKey")
    }

    saveMapPath(value: string) {
        this.store.set("wc3MapKey", value);
    }

    loadBnetPath(): string {
        return this.store.get("bnetKey")
    }

    saveBnetPath(value: string) {
        this.store.set("bnetKey", value);
    }

    loadW3CVersion(): string {
        return this.store.get("currentVersionKey")
    }

    saveLocalW3CVersion(value: string) {
        this.store.set("currentVersionKey", value);
    }

    loadW3Path(): string {
        return this.store.get("wc3PathKey");
    }

    saveW3Path(value: string) {
        this.store.set("wc3PathKey", value);
    }
}
