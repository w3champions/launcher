import logger from "@/logger";

const http = window.require("http");
const WebSocket = window.require("ws");
import { EventEmitter } from 'events';

export enum ELauncherMessageType {
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
    START_GAME = 'START_GAME',
    EXIT_GAME = 'EXIT_GAME',
    FLO_AUTH = 'FLO_AUTH',
    FLO_CONNECTED = 'FLO_CONNECTED'
}

export interface ILauncherMessage {
    type: ELauncherMessageType;
    data?: any;
}

export class IngameBridge extends EventEmitter {
    private server = http.createServer();
    private wss = new WebSocket.Server({ server: this.server });
    private ws?: WebSocket;

    public initialize() {
        this.wss.on("connection", (ws: WebSocket) => {
            this.ws = ws;

            ws.onmessage = (message: MessageEvent) => {
                logger.info(message);

                try {
                    const parsed = JSON.parse(message.data) as ILauncherMessage;

                    this.emit(parsed.type, parsed.data);
                }
                catch (e) {
                    logger.error(e)
                }
            };

            ws.onclose = () => {
                this.emit(ELauncherMessageType.DISCONNECTED);
            };
        });

        this.server.listen(38123);
    }

    public sendFloConnected() {
        const message: ILauncherMessage = {
            type: ELauncherMessageType.FLO_CONNECTED
        };

        this.sendMessage(message);
    }

    public sendMessage(message: ILauncherMessage) {
        if (this.ws) {
            this.ws.send(JSON.stringify(message));
        }
    }
}

export const ingameBridge = new IngameBridge();
