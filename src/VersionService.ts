const Store = window.require("electron-store");

export class VersionService {
    private store = new Store();

    private testKey = "isTestKey";

    public switchToMode(mode: boolean) {
        this.store.set(this.testKey, mode);
    }

    public loadMode() {
        return this.store.get(this.testKey);
    }
}
