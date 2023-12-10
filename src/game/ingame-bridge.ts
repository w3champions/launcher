import logger from "@/logger";
import store from "@/globalState/vuex-store";

const fs = window.require("fs");
const { remote, ipcRenderer } = window.require("electron");
const http = window.require("http");
const WebSocket = window.require("ws");
import { EventEmitter } from 'events';
import { EGateway, ICurrentPlayer, IDownloadMapData, IDownloadMapProgressData, IPlayerInstance } from './game.types';
import { AuthenticationService } from "@/globalState/AuthenticationService";
import { W3cToken } from "@/globalState/rootTypings";
import { IFloNetworkTest } from '@/types/flo-types';
import { OAUTH_ENABLED } from '@/constants';
import { GameUtils } from './game-utils';
import { IFloNode } from "@/flo-integration/types";

export enum ELauncherMessageType {
    REQUEST_AUTHENTICATION_TOKEN = 'REQUEST_AUTHENTICATION_TOKEN',
    RECEIVED_AUTHENTICATION_TOKEN_FROM_LAUNCHER = 'RECEIVED_AUTHENTICATION_TOKEN_FROM_LAUNCHER',
    INVALID_STATE = 'INVALID_STATE',
    IS_LEGACY_WINDOWS = 'IS_LEGACY_WINDOWS',

    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
    LAUNCHER_VERSION = 'LAUNCHER_VERSION',
    START_GAME = 'START_GAME',
    EXIT_GAME = 'EXIT_GAME',
    FLO_AUTH = 'FLO_AUTH',
    FLO_CONNECTED = 'FLO_CONNECTED',
    FLO_DISCONNECTED = 'FLO_DISCONNECTED',
    FLO_RECONNECT = 'FLO_RECONNECT',
    FLO_CHECK_BONJOUR = 'FLO_CHECK_BONJOUR',
    FLO_CHECK_BONJOUR_RESULT = 'FLO_CHECK_BONJOUR_RESULT',
    FLO_PING_UPDATE = 'FLO_PING_UPDATE',
    FLO_NETWORK_TEST_REQUEST = 'FLO_NETWORK_TEST_REQUEST',
    FLO_NETWORK_TEST_STARTED = 'FLO_NETWORK_TEST_STARTED',
    FLO_NETWORK_TEST_PROGRESS = 'FLO_NETWORK_TEST_PROGRESS',
    FLO_NETWORK_TEST_RESULT = 'FLO_NETWORK_TEST_RESULT',
    FLO_SET_NODE_OVERRIDES = 'FLO_SET_NODE_OVERRIDES',
    FLO_WATCH_GAME = 'FLO_WATCH_GAME',
    FLO_WATCH_GAME_SUCCESS = 'FLO_WATCH_GAME_SUCCESS',
    FLO_WATCH_GAME_ERROR = 'FLO_WATCH_GAME_ERROR',

    FLO_CREATE_TEST_GAME = 'FLO_CREATE_TEST_GAME',
    FLO_KILL_TEST_GAME = 'FLO_KILL_TEST_GAME',

    MAP_DOWNLOAD = 'MAP_DOWNLOAD',
    MAP_DOWNLOAD_PROGRESS = 'MAP_DOWNLOAD_PROGRESS',
    MAP_DOWNLOAD_COMPLETE = 'MAP_DOWNLOAD_COMPLETE',
    MAP_DOWNLOAD_FAILED = 'MAP_DOWNLOAD_FAILED'
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
    private launcherVersion = '0.0.0';
    private diagnosticsData?: string;
    private inited = false;

    public initialize() {
        if (this.inited) {
            return
        }
        this.inited = true;

        this.launcherVersion = remote.app.getVersion();

        ipcRenderer.on('diagnostic-data-forward', (_event: any, diagnosticsData: string) => {
            this.diagnosticsData = diagnosticsData;
        });

        ipcRenderer.send('diagnostic-data');

        this.wss.on("connection", (ws: WebSocket, req: any) => {
            const authenticationService = new AuthenticationService();
            const token = authenticationService.loadAuthToken();

            if (this.checkForInvalidState())
            {
                this.reportAndFixInvalidState(ws);
                return;
            }
            let userInfo: W3cToken | null = null;
            if (OAUTH_ENABLED) {
                userInfo = authenticationService.getUserInfo(token?.jwt ?? '');
            }
            else {
                const paramsFromUrl = GameUtils.getPlayerFromUrl(req.url);
                if (paramsFromUrl) {
                    userInfo = {
                        battleTag: paramsFromUrl.battleTag,
                        name: paramsFromUrl.battleTag,
                        isAdmin: false,
                        jwt: '',
                    };
                }
            }

            if (!userInfo) {
                logger.warn('user not logged in correctly')
                return;
            }

            const pi = this.createPlayerInstance(ws, userInfo as any);
            pi.onmessage = (message: MessageEvent) => {
                logger.info({ type: message.type, data: message.data });

                try {
                    const parsed = JSON.parse(message.data) as ILauncherGameMessage;
                    const event: IIngameBridgeEvent = {
                        playerInstance: pi,
                        type: parsed.type,
                        data: parsed.data
                    }

                    if(parsed.type === ELauncherMessageType.REQUEST_AUTHENTICATION_TOKEN) {
                        const message: ILauncherGameMessage = {
                            type: ELauncherMessageType.RECEIVED_AUTHENTICATION_TOKEN_FROM_LAUNCHER,
                            data: {diagnosticsData: this.diagnosticsData, ...store.state.w3cToken } 
                        };
                        pi.sendMessage(message);
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

            if (store.state.isWindows) {
                this.sendIsLegacyWindows(pi);
            }
        });

        this.server.listen(38123);
    }

    public sendLauncherVersion(playerInstance: IPlayerInstance) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.LAUNCHER_VERSION,
            data: { launcherVersion: this.launcherVersion }
        };

        playerInstance.sendMessage(message);
    }

    public sendIsLegacyWindows(playerInstance: IPlayerInstance) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.IS_LEGACY_WINDOWS
        };

        playerInstance.sendMessage(message);
    }

    public sendFloConnected(playerInstance: IPlayerInstance, workerVersion: string) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.FLO_CONNECTED,
            data: {
                workerVersion
            }
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

    public sendMapDownloadProgress(playerInstance: IPlayerInstance,  downloadMapData: IDownloadMapData, percent: number) {
        const data: IDownloadMapProgressData = {
            mapFile: downloadMapData.mapFile,
            progressPercent: percent
        }
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.MAP_DOWNLOAD_PROGRESS,
            data: data
        };

        playerInstance.sendMessage(message);
    }

    public sendMapDownloadComplete(playerInstance: IPlayerInstance, downloadMapData: IDownloadMapData) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.MAP_DOWNLOAD_COMPLETE,
            data: downloadMapData
        };

        playerInstance.sendMessage(message);
    }

    public sendMapDownloadFailed(playerInstance: IPlayerInstance, downloadMapData: IDownloadMapData) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.MAP_DOWNLOAD_FAILED,
            data: downloadMapData
        };

        playerInstance.sendMessage(message);
    }

    public sendNetworkTestStart(playerInstance: IPlayerInstance) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.FLO_NETWORK_TEST_STARTED,
        };

        playerInstance.sendMessage(message);
    }

    public sendNetworkTestProgress(playerInstance: IPlayerInstance, progressPerc: number) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.FLO_NETWORK_TEST_PROGRESS,
            data: progressPerc
        };

        playerInstance.sendMessage(message);
    }

    public sendNetworkTestResult(playerInstance: IPlayerInstance, networkTest: IFloNetworkTest) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.FLO_NETWORK_TEST_RESULT,
            data: networkTest
        };

        playerInstance.sendMessage(message);
    }

    public sendWatchGameError(playerInstance: IPlayerInstance) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.FLO_WATCH_GAME_ERROR,
        };

        playerInstance.sendMessage(message);
    }

    public sendWatchGameSuccess(playerInstance: IPlayerInstance) {
        const message: ILauncherGameMessage = {
            type: ELauncherMessageType.FLO_WATCH_GAME_SUCCESS,
        };

        playerInstance.sendMessage(message);
    }

    private createPlayerInstance(ws: WebSocket, token: W3cToken) {
        const player = {
            battleTag: token.battleTag,
            toonName: token.battleTag,
            gateway: EGateway.Europe,
            gatewayPing: 30,
            token: token.jwt,
            country: '',
        } as ICurrentPlayer;

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
    
    private checkForInvalidState() {
        return fs.existsSync(`${store.getters.fileService.updateStrategy.w3Path}/Units/UnitData.slk`);
    }

    private reportAndFixInvalidState(ws: WebSocket) {
        const w3path = store.getters.fileService.updateStrategy.w3Path;
        const file = "Units/UnitData.slk";
        ws.send(JSON.stringify({
            type: ELauncherMessageType.INVALID_STATE,
            data: file
        }));
        logger.info(`detected modified slk: ${w3path}/${file}`);
        fs.unlinkSync(`${w3path}/${file}`);
        ws.send(JSON.stringify({ type: ELauncherMessageType.DISCONNECTED }));
        ws.close();
    }
}

export const ingameBridge = new IngameBridge();
