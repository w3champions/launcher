import { IFloNode } from '@/flo-integration/flo-worker.instance';
import logger from "@/logger";
import store from "@/globalState/vuex-store";

const http = window.require("http");
const WebSocket = window.require("ws");
import { EventEmitter } from 'events';
import { ICurrentPlayer, IPlayerInstance } from './game.types';
import { GameUtils } from './game.utils';

export enum ELauncherMessageType {
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
    LAUNCHER_VERSION = 'LAUNCHER_VERSION',
    START_GAME = 'START_GAME',
    EXIT_GAME = 'EXIT_GAME',
    FLO_AUTH = 'FLO_AUTH',
    FLO_CONNECTED = 'FLO_CONNECTED',
    FLO_DISCONNECTED = 'FLO_DISCONNECTED',
    FLO_CHECK_BONJOUR = 'FLO_CHECK_BONJOUR',
    FLO_CHECK_BONJOUR_RESULT = 'FLO_CHECK_BONJOUR_RESULT',
    FLO_PING_UPDATE = 'FLO_PING_UPDATE'
}

export interface ILauncherGameMessage {
    type: ELauncherMessageType;
    data?: any;
}

export interface IIngameBridgeEvent extends ILauncherGameMessage {
    playerInstance: IPlayerInstance;
}

export class IngameBridge extends EventEmitter {
    private server = http.createServer();
    private wss = new WebSocket.Server({ server: this.server });

    public initialize() {
        this.wss.on("connection", (ws: WebSocket, req: any) => {
            const pi = this.createPlayerInstance(ws, req.url);
            pi.onmessage = (message: MessageEvent) => {
                logger.info(message);

                try {
                    const parsed = JSON.parse(message.data) as ILauncherGameMessage;
                    const event: IIngameBridgeEvent = {
                        playerInstance: pi,
                        type: parsed.type,
                        data: parsed.data
                    }
                    this.emit(parsed.type, event);
                }
                catch (e) {
                    logger.error(e)
                }
            };

            pi.onclose = () => {
                this.emit(ELauncherMessageType.DISCONNECTED, pi);
            };

            this.sendLauncherVersion(pi);
        });

        this.server.listen(38123);
    }

    public sendLauncherVersion(playerInstance: IPlayerInstance) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.LAUNCHER_VERSION,
            data: { launcherVersion: store.state.updateHandling.localLauncherVersion }
        };

        playerInstance.sendMessage(message);
    }

    public sendFloConnected(playerInstance: IPlayerInstance) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.FLO_CONNECTED
        };

        playerInstance.sendMessage(message);
    }

    public sendFloDisconnected(playerInstance: IPlayerInstance) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.FLO_DISCONNECTED
        };

        playerInstance.sendMessage(message);
    }

    public sendFloBonjourCheckResult(playerInstance: IPlayerInstance, isRunning: boolean) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.FLO_CHECK_BONJOUR_RESULT,
            data: { isRunning }
        };

        playerInstance.sendMessage(message);
    }

    public sendPingUpdates(playerInstance: IPlayerInstance, nodePings: IFloNode[]) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.FLO_PING_UPDATE,
            data: nodePings
        };

        playerInstance.sendMessage(message);
    }

    private createPlayerInstance(ws: WebSocket, urlParams: string) {
        const player = GameUtils.getPlayerFromUrl(urlParams)
        const pi = ws as IPlayerInstance;

        pi.player = player as ICurrentPlayer;

        pi.isDisconnected = () => {
            return pi.readyState == pi.CLOSING || pi.readyState == pi.CLOSED;
        };

        pi.sendMessage = (message: ILauncherGameMessage) => {
            pi.send(JSON.stringify(message));
        };

        return pi;
    }
}

export const ingameBridge = new IngameBridge();
