const Store = window.require("electron-store");

class VersionSwitcher {
    private isTest: boolean = true;
    private store = new Store();

    private testKey = "isTestKey";

    constructor() {
        this.isTest = this.store.get(this.testKey);
    }

    public switchToTest() {
        this.isTest = true;
        this.store.set(this.testKey, true);
    }

    public switchToProd() {
        this.isTest = false;
        this.store.set(this.testKey, false);
    }

    get NewsUrl() {
        return this.isTest
            ? "https://statistic-service-test.w3champions.com/"
            : "https://statistic-service.w3champions.com/";
    }

    get UpdateUrl() {
        return this.isTest
            ? "https://update-service.test.w3champions.com/"
            : "https://update-service.prod.test.w3champions.com/";
    }
}

export const versionSwitcher = new VersionSwitcher();
