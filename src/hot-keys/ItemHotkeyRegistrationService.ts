import store from '../globalState/vuex-store'
import {ClickCombination, HotKey, ModifierKey} from "@/hot-keys/hotkeyTypes";

const { globalShortcut } = window.require("electron").remote;
const robot = window.require("robotjs");
const Store = window.require("electron-store");

export class ItemHotkeyRegistrationService {
    private keyValueStore = new Store();
    private lastPortKey = "lastPortKey";

    private hotKeyStoreKey = "hotKeyStoreKey"

    public saveHotKeys(hotKeys: HotKey[]) {
        this.keyValueStore.set(this.hotKeyStoreKey, hotKeys);
    }

    get hotKeys() {
        return store.state.hotKeys.hotKeys;
    }

    get stateMachine() {
        return store.state.hotKeys.hotKeyStateMachine;
    }

    public loadHotKeys() {
        return this.keyValueStore.get(this.hotKeyStoreKey);
    }

    public toggleOnOff(combo: ClickCombination) {
        this.register(combo, () => {
            store.commit.hotKeys.TOGGLE_HOTKEYS()
        })
    }

    public registerKey(hotKey: HotKey) {
        this.register(hotKey.combo, () => {
            robot.keyTap(hotKey.key);
        });
    }

    public saveLastW3cPort(port: string) {
        this.keyValueStore.set(this.lastPortKey, port);
    }

    public loadLastW3cPort() {
        return this.keyValueStore.get(this.lastPortKey);
    }

    private register(combo: ClickCombination, fkt: () => void) {
        const keyCode = this.keyCode(combo);
        if (globalShortcut.isRegistered(keyCode)) {
            globalShortcut.unregister(keyCode)
        }

        globalShortcut.register(keyCode, fkt)
    }

    private keyCode(combo: ClickCombination) {
        const keys = [combo.modifier !== ModifierKey.None ? ModifierKey[combo.modifier] : null, combo.hotKey].filter(f => f);
        return keys.join("+");
    }

    public disableHotKeys() {
        globalShortcut.unregister("enter");
        globalShortcut.unregister("escape");
        this.hotKeys.forEach(h => globalShortcut.unregister(this.keyCode(h.combo)));
    }

    public activateHotKeys() {
        this.enableChatCommands();
        this.hotKeys.forEach(h => this.registerKey(h));
    }

    private enableChatCommands() {
        this.register({modifier: ModifierKey.None, hotKey: "enter"}, this.enterFunction)
        // this.register({modifier: ModifierKey.None, hotKey: "escape"}, this.escapeFunction)
    }

    private enterFunction() {
        globalShortcut.unregister("enter");
        robot.keyTap("enter");
        store.commit.hotKeys.HOTKEY_STATE_PRESS_ENTER();
        globalShortcut.register("enter", this.enterFunction);
    }

    // private escapeFunction() {
    //     globalShortcut.unregister("escape");
    //     robot.keyTap("escape");
    //     store.commit.hotKeys.HOTKEY_STATE_PRESS_ESCAPE();
    //     globalShortcut.register("escape", this.escapeFunction);
    // }
}

