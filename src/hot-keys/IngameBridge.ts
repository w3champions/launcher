import store from "@/globalState/vuex-store";
import logger from "@/logger";

const http = window.require("http");
const WebSocket = window.require("ws");

export class IngameBridge {
    private store = store;
    private server = http.createServer();
    private wss = new WebSocket.Server({ server: this.server });
    private wc3webSocket!: WebSocket;

    constructor() {
        this.store.dispatch.hotKeys.loadLastW3cPort();
        logger.info(`trying to reconnect to ${this.lastW3cPort}`)
        if (this.lastW3cPort) {
            try {
                this.SetupWebsocketToWC3(this.lastW3cPort);
            } catch (e) {
                logger.warn(e);
                logger.info(`could not connect to ${this.lastW3cPort}, reset port`)
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
        this.wc3webSocket = new WebSocket(wc3Socket);

        this.wc3webSocket.onerror = () => {
            logger.warn(`connection to wc3 (${wc3Socket}) refused, game is probably off`)
        }

        this.wc3webSocket.onopen = () => {
            logger.info(`Opened port to wc3 (${wc3Socket})`)
            this.store.dispatch.hotKeys.saveLastW3cPort(wc3Socket)
            this.server.close()
            this.wss.close()
            logger.info(`closed websocketserver for w3c push again`)
        }

        this.wc3webSocket.onmessage = (message: MessageEvent) => {
            try {
                if (this.isMessage(message, "ExitedGame")) {
                    logger.info("User exited game, turn off hotkeys")
                    this.store.dispatch.hotKeys.exitGame();
                }

                if (this.isMessage(message, "UpdateLoadingScreenInfo")) {
                    logger.info("User ENTERED game, turn on hotkeys")
                    this.store.dispatch.hotKeys.enterGame();
                }
            }

            catch (e) {
                logger.error(e)
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
