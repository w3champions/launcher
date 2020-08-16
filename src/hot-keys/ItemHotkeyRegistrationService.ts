import store from '../globalState/vuex-store'
import {ClickCombination, HotKey, ModifierKey} from "@/hot-keys/hotkeyTypes";
import {combiAsString} from "@/hot-keys/utilsFunctions";
import {
    F1,
    F2,
    F3,
    ITEM_BOTTOM_LEFT,
    ITEM_BOTTOM_RIGHT,
    ITEM_MIDDLE_LEFT,
    ITEM_MIDDLE_RIGHT,
    ITEM_TOP_LEFT,
    ITEM_TOP_RIGHT
} from "@/hot-keys/keyValuesRobotJs";

const { globalShortcut } = window.require("electron").remote;
const keyboard = window.require('./build/Release/send-keys-native')
const Store = window.require("electron-store");

// this functions somehow could not be made private, on register/unregister the this. operator somehow gets fucked
const enterFunction = () => {
    globalShortcut.unregister("enter");
    keyboard.pressEnter();
    store.commit.hotKeys.HOTKEY_STATE_PRESS_ENTER();
    globalShortcut.register("enter", enterFunction);
}

const escapeFunction = () => {
    globalShortcut.unregister("escape");
    keyboard.pressEscape();
    store.commit.hotKeys.HOTKEY_STATE_PRESS_ESCAPE();
    globalShortcut.register("escape", escapeFunction);
}

const f10function = () => {
    globalShortcut.unregister("f10");
    keyboard.pressF10();
    store.commit.hotKeys.HOTKEY_STATE_PRESS_F10();
    globalShortcut.register("f10", f10function);
}

const f12function = () => {
    globalShortcut.unregister("f12");
    keyboard.pressF12();
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
            if (hotKey.combo.modifier !== ModifierKey.None) {
                this.toggleModifierDown(hotKey.combo);
                this.pressCorrespondingKey(hotKey);
                this.toggleModifierUp(hotKey.combo);
            } else {
                this.pressCorrespondingKey(hotKey);
            }
        });
    }

    private pressCorrespondingKey(hotKey: HotKey) {
        switch (hotKey.key) {
            case F1 : {
                keyboard.pressF1();
                break;
            }
            case F2 : {
                keyboard.pressF2();
                break;
            }
            case F3 : {
                keyboard.pressF3();
                break;
            }
            case ITEM_TOP_LEFT : {
                keyboard.pressNum7();
                break;
            }
            case ITEM_MIDDLE_LEFT : {
                keyboard.pressNum4();
                break;
            }
            case ITEM_BOTTOM_LEFT : {
                keyboard.pressNum1();
                break;
            }
            case ITEM_TOP_RIGHT : {
                keyboard.pressNum8();
                break;
            }
            case ITEM_MIDDLE_RIGHT : {
                keyboard.pressNum5();
                break;
            }
            case ITEM_BOTTOM_RIGHT : {
                keyboard.pressNum2();
                break;
            }
        }
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

    private toggleModifierDown(combo: ClickCombination) {
        switch (combo.modifier) {
            case ModifierKey.CommandOrControl: {
                keyboard.releaseCtrl();
                break;
            }
            case ModifierKey.Alt: {
                keyboard.releaseAlt();
                break;
            }
        }
    }

    private toggleModifierUp(combo: ClickCombination) {
        switch (combo.modifier) {
            case ModifierKey.CommandOrControl: {
                keyboard.holdCtrl();
                break;
            }
            case ModifierKey.Alt: {
                keyboard.holdAlt();
                break;
            }
        }
    }
}

