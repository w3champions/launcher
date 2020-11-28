import store from "@/globalState/vuex-store";
import logger from "@/logger";

const http = window.require("http");
const WebSocket = window.require("ws");
import { EventEmitter } from 'events';

export enum ELauncherMessageType {
    START_GAME = 'START_GAME',
    EXIT_GAME = 'EXIT_GAME',
    FLO_AUTH = 'FLO_AUTH',
}

export interface ILauncherMessage {
    type: ELauncherMessageType;
    data: any;
}

export class IngameBridge extends EventEmitter {
    private store = store;
    private server = http.createServer();
    private wss = new WebSocket.Server({ server: this.server });

    constructor() {
        super();
        
        this.wss.on("connection", (ws: WebSocket) => {
            ws.onmessage = (message: MessageEvent) => {
                logger.info(message);

                try {
                    const parsed = JSON.parse(message.data) as ILauncherMessage;
                    if (parsed.type == ELauncherMessageType.EXIT_GAME) {
                        logger.info("User exited game, turn off hotkeys")
                        this.store.dispatch.hotKeys.exitGame();
                    }
    
                    if (parsed.type == ELauncherMessageType.START_GAME) {
                        logger.info("User ENTERED game, turn on hotkeys");
                        this.store.dispatch.hotKeys.enterGame();
                    }
    
                    if (parsed.type == ELauncherMessageType.FLO_AUTH) {
                        logger.info("FLO AUTH RECEIVED");
                    }
    
                    this.emit(parsed.type, parsed.data);
                }
                catch (e) {
                    logger.error(e)
                }
            };
        });

        this.server.listen(38123);
    }

    get lastW3cPort() {
        return this.store.state.hotKeys.lastW3cPort;
    }

    private isMessage(message: MessageEvent, messageType: string) {
        return message.data.indexOf(messageType) > 1;
    }
}
