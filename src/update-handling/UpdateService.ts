const Store = window.require("electron-store");

export class UpdateService {
    private store = new Store();

    private wc3PathKey = "wc3PathKey";
    private bnetKey = "bnetKey";
    private currentVersionKey = "currentVersionKey";
    private isClassicIconKey = "isClassicIconKey";

    loadBnetPath(): string {
        return this.store.get(this.bnetKey)
    }

    saveBnetPath(value: string) {
        this.store.set(this.bnetKey, value);
    }

    loadW3CVersion(): string {
        return this.store.get(this.currentVersionKey)
    }

    saveLocalW3CVersion(value: string) {
        this.store.set(this.currentVersionKey, value);
    }

    loadW3Path(): string {
        return this.store.get(this.wc3PathKey);
    }

    saveW3Path(value: string) {
        this.store.set(this.wc3PathKey, value);
    }

    loadIsClassicIcons(): boolean {
        return this.store.get(this.isClassicIconKey);
    }

    saveIsClassicIcons(value: boolean) {
        this.store.set(this.isClassicIconKey, value);
    }
}
