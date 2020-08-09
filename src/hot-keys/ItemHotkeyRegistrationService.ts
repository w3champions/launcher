import {ClickCombination, HotKey, ModifierKey} from "@/hot-keys/hotkeyTypes";
import {InGameState} from "@/hot-keys/HotKeyStateMachine";
import store from '../globalState/vuex-store'

const { globalShortcut } = window.require("electron").remote;
const robot = window.require("robotjs");
const Store = window.require("electron-store");
const http = window.require("http");
const WebSocket = window.require("ws");

export class ItemHotkeyRegistrationService {
    private vuexStore = store;
    private keyValueStore = new Store();
    private lastPortKey = "lastPortKey";

    private server = http.createServer();
    private wss = new WebSocket.Server({ server: this.server });
    private wc3webSocket!: WebSocket;

    private hotKeyStoreKey = "hotKeyStoreKey"

    constructor() {
        const lastPortToWC3 = this.keyValueStore.get(this.lastPortKey);
        if (lastPortToWC3) {
            try {
                this.SetupWebsocketToWC3(lastPortToWC3);
            } catch (e) {
                this.keyValueStore.set(this.lastPortKey, "")
            }
        }

        this.wss.on("connection", (ws: WebSocket) => {
            ws.onmessage = (message: MessageEvent) => {
                const data = message.data;
                if (data.startsWith("SET-WC3-SOCKET_")) {
                    const wc3Socket = data.split("_")[1];
                    this.SetupWebsocketToWC3(wc3Socket);
                }
            };
        });

        this.server.listen(38123);
    }

    private SetupWebsocketToWC3(wc3Socket: string) {
        if (this.wc3webSocket) {
            this.wc3webSocket.close();
        }

        this.wc3webSocket = new WebSocket(wc3Socket);
        this.wc3webSocket.onopen = () => {
            console.log("Opened port to wc3")
            this.keyValueStore.set(this.lastPortKey, wc3Socket)
        }

        this.wc3webSocket.onmessage = (message: MessageEvent) => {
            if (this.isMessage(message, "ExitedGame")) {
                console.log("User exited game, turn off hotkeys")
                this.vuexStore.commit.hotKeys.HOTKEY_STATE_EXITED_GAME()
            }

            if (this.isMessage(message, "UpdateLoadingScreenInfo")) {
                console.log("User ENTERED game, turn on hotkeys")
                this.vuexStore.commit.hotKeys.HOTKEY_STATE_INGAME()
            }
        }
    }

    get isInGame() {
        return this.vuexStore.state.hotKeys.hotKeyStateMachine instanceof InGameState;
    }

    get hotKeys() {
        return this.vuexStore.state.hotKeys.hotKeys;
    }

    public saveHotKeys(hotKeys: HotKey[]) {
        this.keyValueStore.set(this.hotKeyStoreKey, hotKeys);
    }

    public loadHotKeys() {
        return this.keyValueStore.get(this.hotKeyStoreKey);
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
        this.register(combo, () => this.vuexStore.commit.hotKeys.RESET_HOTKEY_STATE())
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

    private isMessage(message: MessageEvent, messageType: string) {
        return message.data.indexOf(messageType) > 1;
    }
}

