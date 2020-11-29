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

export interface ILauncherGameMessage {
    type: ELauncherMessageType;
    data?: any;
}

export interface IIngameBridgeEvent extends ILauncherGameMessage {
    gameSocket: WebSocket;
}

export class IngameBridge extends EventEmitter {
    private server = http.createServer();
    private wss = new WebSocket.Server({ server: this.server });

    public initialize() {
        this.wss.on("connection", (ws: WebSocket) => {
            ws.onmessage = (message: MessageEvent) => {
                logger.info(message);

                try {
                    const parsed = JSON.parse(message.data) as ILauncherGameMessage;
                    const event: IIngameBridgeEvent = {
                        gameSocket: ws,
                        type: parsed.type,
                        data: parsed.data
                    }
                    this.emit(parsed.type, event);
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

    public sendFloConnected(socket: WebSocket) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.FLO_CONNECTED
        };

        this.sendMessage(socket, message);
    }

    public sendMessage(socket: WebSocket, message: ILauncherGameMessage) {
        socket.send(JSON.stringify(message));
    }
}

export const ingameBridge = new IngameBridge();
