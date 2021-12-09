const Store = window.require("electron-store");

export class VersionService {
    private store = new Store();

    private testKey = "isTestKey";
    private isChinaProxyEnabledKey = "isChinaProxyEnabledKey"

    public switchToMode(mode: boolean) {
        this.store.set(this.testKey, mode);
    }

    public loadMode() {
        return this.store.get(this.testKey) ?? false;
    }

    public loadIsChinaProxyEnabled() {
        return this.store.get(this.isChinaProxyEnabledKey) !== false;
    }

    public saveIsChinaProxyEnabled(enabled: boolean) {
        this.store.set(this.isChinaProxyEnabledKey, enabled);
    }
}
