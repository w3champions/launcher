import store from '../globalState/vuex-store'
import {ClickCombination, HotKey, ModifierKey} from "@/hot-keys/hotkeyTypes";
import {combiAsString} from "@/hot-keys/utilsFunctions";

const { globalShortcut } = window.require("electron").remote;
const Store = window.require("electron-store");

// this functions somehow could not be made private, on register/unregister the this. operator somehow gets fucked
const enterFunction = () => {
    globalShortcut.unregister("enter");
    // robot.keyTap("enter");
    store.commit.hotKeys.HOTKEY_STATE_PRESS_ENTER();
    globalShortcut.register("enter", enterFunction);
}

const escapeFunction = () => {
    globalShortcut.unregister("escape");
    // robot.keyTap("escape");
    store.commit.hotKeys.HOTKEY_STATE_PRESS_ESCAPE();
    globalShortcut.register("escape", escapeFunction);
}

const f10function = () => {
    globalShortcut.unregister("f10");
    // robot.keyTap("f10");
    store.commit.hotKeys.HOTKEY_STATE_PRESS_F10();
    globalShortcut.register("f10", f10function);
}

const f12function = () => {
    globalShortcut.unregister("f12");
    // robot.keyTap("f12");
    store.commit.hotKeys.HOTKEY_STATE_PRESS_F12();
    globalShortcut.register("f12", f12function);
}

export class ItemHotkeyRegistrationService {

    private keyValueStore = new Store();
    private lastPortKey = "lastPortKey";

    private hotKeyStoreKey = "hotKeyStoreKey"
    private hotKeyToggleKey = "hotKeyToggleKey"

    public saveHotKeys(hotKeys: HotKey[]) {
        this.keyValueStore.set(this.hotKeyStoreKey, hotKeys);
    }

    public loadHotKeys() {
        return this.keyValueStore.get(this.hotKeyStoreKey) ?? [];
    }

    public loadToggleKey() {
        return this.keyValueStore.get(this.hotKeyToggleKey);
    }

    public removeToggleOnOff(combo: ClickCombination) {
        globalShortcut.unregister(combiAsString(combo));
    }

    public toggleOnOff(combo: ClickCombination, fkt: () => void) {
        this.register(combo, fkt)

        this.keyValueStore.set(this.hotKeyToggleKey, combo)
    }

    public registerKey(hotKey: HotKey) {
        this.register(hotKey.combo, () => {
            // robot.keyTap(hotKey.key);
        });
    }

    public unregister(combo: ClickCombination) {
        const keyCode = combiAsString(combo);
        globalShortcut.unregister(keyCode)
    }

    public saveLastW3cPort(port: string) {
        this.keyValueStore.set(this.lastPortKey, port);
    }

    public loadLastW3cPort() {
        return this.keyValueStore.get(this.lastPortKey);
    }

    private register(combo: ClickCombination, fkt: () => void) {
        const keyCode = combiAsString(combo);
        if (globalShortcut.isRegistered(keyCode)) {
            globalShortcut.unregister(keyCode)
        }

        globalShortcut.register(keyCode, fkt)
    }

    public disableHotKeys(hotKeys: HotKey[]) {
        globalShortcut.unregister("enter");
        globalShortcut.unregister("escape");
        globalShortcut.unregister("f10");
        globalShortcut.unregister("f12");
        hotKeys.forEach(h => globalShortcut.unregister(combiAsString(h.combo)));
    }

    public enableHotKeys(hotKeys: HotKey[]) {
        this.enableChatCommands();
        hotKeys.forEach(h => this.registerKey(h));
    }

    private enableChatCommands() {
        this.register({modifier: ModifierKey.None, hotKey: "enter"}, enterFunction)
        this.register({modifier: ModifierKey.None, hotKey: "escape"}, escapeFunction)
        this.register({modifier: ModifierKey.None, hotKey: "f10"}, f10function)
        this.register({modifier: ModifierKey.None, hotKey: "f12"}, f12function)
    }
}

