import {ClickCombination, HotKey, ModifierKey} from "@/hot-keys/hotkeyTypes";

const { globalShortcut } = window.require("electron").remote;
const robot = window.require("robotjs");
const Store = window.require("electron-store");

export class ItemHotkeyRegistrationService {
    private store = new Store();
    private hotKeyStoreKey = "hotKeyStoreKey"

    public saveHotKeys(hotKeys: HotKey[]) {
        this.store.set(this.hotKeyStoreKey, hotKeys);
    }

    public loadHotKeys() {
        return this.store.get(this.hotKeyStoreKey);
    }

    public f1(combo: ClickCombination) {
        this.registerKey("f1", combo)
    }

    public f2(combo: ClickCombination) {
        this.registerKey("f2", combo)
    }

    public f3(combo: ClickCombination) {
        this.registerKey("f2", combo)
    }

    public space(combo: ClickCombination) {
        this.registerKey("space", combo)
    }

    public itemTopLeft(combo: ClickCombination) {
        this.registerKey("numpad_7", combo)
    }

    public itemMiddleLeft(combo: ClickCombination) {
        this.registerKey("numpad_4", combo)
    }

    public itemBottomLeft(combo: ClickCombination) {
        this.registerKey("numpad_1", combo)
    }

    public itemTopRight(combo: ClickCombination) {
        this.registerKey("numpad_8", combo)
    }

    public itemMiddleRight(combo: ClickCombination) {
        this.registerKey("numpad_5", combo)
    }

    public itemBottomRight(combo: ClickCombination) {
        this.registerKey("numpad_2", combo)
    }

    private registerKey(key: string, combo: ClickCombination) {
        const keyCode = `${combo.modifier !== ModifierKey.None ? ModifierKey[combo.modifier] : ""}+${combo.hotKey}`;
        if (globalShortcut.isRegistered(keyCode)) {
            globalShortcut.unregister(keyCode)
        }

        globalShortcut.register(keyCode, () => {
            robot.keyTap(key);
        })
    }
}

