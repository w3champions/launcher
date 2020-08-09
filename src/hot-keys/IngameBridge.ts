import store from "@/globalState/vuex-store";

const http = window.require("http");
const WebSocket = window.require("ws");

export class IngameBridge {
    private store = store;
    private server = http.createServer();
    private wss = new WebSocket.Server({ server: this.server });
    private wc3webSocket!: WebSocket;

    constructor() {
        this.store.dispatch.hotKeys.loadLastW3cPort();
        if (this.lastW3cPort) {
            try {
                this.SetupWebsocketToWC3(this.lastW3cPort);
            } catch (e) {
                this.store.dispatch.hotKeys.saveLastW3cPort("")
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
            this.store.dispatch.hotKeys.saveLastW3cPort(wc3Socket)
            this.server.close()
            this.wss.close()
            console.log("closed websocketserver for w3c push again")
        }

        this.wc3webSocket.onmessage = (message: MessageEvent) => {
            try {
                if (this.isMessage(message, "ExitedGame")) {
                    console.log("User exited game, turn off hotkeys")
                    this.store.dispatch.hotKeys.exitGame();
                }

                if (this.isMessage(message, "UpdateLoadingScreenInfo")) {
                    console.log("User ENTERED game, turn on hotkeys")
                    this.store.dispatch.hotKeys.enterGame();
                }
            }

            catch (e) {
                console.log(e)
            }
        }
    }

    get lastW3cPort() {
        return this.store.state.hotKeys.lastW3cPort;
    }

    private isMessage(message: MessageEvent, messageType: string) {
        return message.data.indexOf(messageType) > 1;
    }
}
