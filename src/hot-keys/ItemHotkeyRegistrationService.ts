import {ClickCombination, HotKey, ModifierKey} from "@/hot-keys/hotkeyTypes";
import {InGameState} from "@/hot-keys/HotKeyStateMachine";

const { globalShortcut } = window.require("electron").remote;
const robot = window.require("robotjs");
const Store = window.require("electron-store");
const http = window.require("http");
const WebSocket = window.require("ws");

export class ItemHotkeyRegistrationService {
    private store = new Store();

    private server = http.createServer();
    private wss = new WebSocket.Server({ server: this.server });

    private hotKeyStoreKey = "hotKeyStoreKey"

    constructor() {

        this.wss.on("connection", (ws: WebSocket) => {
            // @ts-ignore
            ws.onmessage = (message: any) => {
                const data = message.data;
                if (data.startsWith("SET-WC3-SOCKET_")) {
                    console.log(data.split("_")[1]);
                }
            };
        });

        this.server.listen(38123);
    }

    get isInGame() {
        return this.store.direct.hotKeys.state.hotKeyStateMachine instanceof InGameState;
    }

    get hotKeys() {
        return this.store.direct.hotKeys.state.hotKeys;
    }

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

    public resetKey(combo: ClickCombination) {
        this.register(combo, () => this.store.direct.hotKeys.commit.RESET_HOTKEY_STATE())
    }

    private registerKey(key: string, combo: ClickCombination) {
        this.register(combo, () => {
            if (this.isInGame) {
                robot.keyTap(key);
            }
        });
        this.saveHotKeys(this.hotKeys);
    }

    private register(combo: ClickCombination, fkt: () => void) {
        const keys = [ModifierKey[combo.modifier], combo.hotKey];
        const keyCode = keys.join("+");
        if (globalShortcut.isRegistered(keyCode)) {
            globalShortcut.unregister(keyCode)
        }

        globalShortcut.register(keyCode, fkt)
    }
}

