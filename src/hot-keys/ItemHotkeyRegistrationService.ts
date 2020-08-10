import store from '../globalState/vuex-store'
import {ClickCombination, HotKey, ModifierKey} from "@/hot-keys/hotkeyTypes";
import {ITEM_BOTTOM_LEFT, NUM_LOCK} from "@/hot-keys/keyValuesRobotJs";

const { globalShortcut } = window.require("electron").remote;
const robot = window.require("robotjs");
const Store = window.require("electron-store");

// this functions somehow could not be made private, on register/unregister the this. operator somehow gets fucked
const enterFunction = () => {
    globalShortcut.unregister("enter");
    robot.keyTap("enter");
    store.commit.hotKeys.HOTKEY_STATE_PRESS_ENTER();
    globalShortcut.register("enter", enterFunction);
}

const escapeFunction = () => {
    globalShortcut.unregister("escape");
    robot.keyTap("escape");
    store.commit.hotKeys.HOTKEY_STATE_PRESS_ESCAPE();
    globalShortcut.register("escape", escapeFunction);
}

const f10function = () => {
    globalShortcut.unregister("f10");
    robot.keyTap("f10");
    store.commit.hotKeys.HOTKEY_STATE_PRESS_F10();
    globalShortcut.register("f10", f10function);
}

const f12function = () => {
    globalShortcut.unregister("f12");
    robot.keyTap("f12");
    store.commit.hotKeys.HOTKEY_STATE_PRESS_F12();
    globalShortcut.register("f12", f12function);
}

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
        globalShortcut.unregister("f10");
        globalShortcut.unregister("f12");
        this.hotKeys.forEach(h => globalShortcut.unregister(this.keyCode(h.combo)));
    }

    public enableHotKeys() {
        if (!this.isNumpadEnabled()) {
            robot.keyTap(NUM_LOCK);
        }

        this.makeSureNumpadIsEnabled()
        this.enableChatCommands();
        this.hotKeys.forEach(h => this.registerKey(h));
    }

    private enableChatCommands() {
        this.register({modifier: ModifierKey.None, hotKey: "enter"}, enterFunction)
        this.register({modifier: ModifierKey.None, hotKey: "escape"}, escapeFunction)
        this.register({modifier: ModifierKey.None, hotKey: "f10"}, f10function)
        this.register({modifier: ModifierKey.None, hotKey: "f12"}, f12function)
    }

    private isNumpadEnabled() {
        const el = window.document.createElement('textarea');

        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();

        robot.keyTap(ITEM_BOTTOM_LEFT);
        const textContent = el.textContent;
        document.body.removeChild(el);

        return textContent === "1"
    }

    private makeSureNumpadIsEnabled() {
        const el = window.document.createElement('button');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        el.style.zIndex = '-9999';
        window.document.body.appendChild(el);
        el.onclick = (e) => {
            if (!e.getModifierState("NumLock")) {
                robot.keyTap(ITEM_BOTTOM_LEFT);
            }
        }

        el.click();
    }
}

