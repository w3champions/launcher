import { environment } from '@/environment';
import { IPlayerInstance } from '@/game/game.types';
import { ingameBridge } from '@/game/ingame-bridge';
import logger from '@/logger';

const { remote } = window.require("electron");
const { spawn } = window.require("child_process");
const path = require('path');
const WebSocketClass = window.require("ws");

interface IFloWorkerStartupData {
    port: number;
    version: string;
}

enum EFloWorkerEventTypes {
    ClientInfo = 'ClientInfo',
    ListNodes = 'ListNodes',
    PlayerSession = 'PlayerSession',
    PingUpdate = 'PingUpdate',
    Disconnect = 'Disconnect'
}

interface IFloWorkerEvent {
    type: EFloWorkerEventTypes;
}

interface IPlayerSessionEvent extends IFloWorkerEvent {
    player: IFloWorkerPlayer;
}

export interface IFloAuthData {
    token: string;
}

interface IFloWorkerPlayer {
    id: number;
    name: string;
}

export class FloWorkerInstance {
    private isWindows: boolean;
    private pathToWc3: string;
    private floWorkerProcess?: any;
    private workerInfo?: IFloWorkerStartupData;
    private isWorkerStarted: boolean = false;
    private floWorkerWs?: WebSocket;
    private lastConnectToken?: string;
    private reconnectInterValHandle?: any;

    public playerInstance?: IPlayerInstance;

    constructor(isWindows: boolean, pathToWc3: string) {
        this.isWindows = isWindows;
        this.pathToWc3 = pathToWc3;
    }

    public async connect(playerInstance: IPlayerInstance, token: string) {
        if (!this.isWorkerStarted) {
            await this.startWorker();
        }

        this.lastConnectToken = token;
        this.playerInstance = playerInstance;
        this.floWorkerWs?.send(
            JSON.stringify({
                type: "Connect",
                token: token,
            })
        );
    }

    public disconnect() {
        this.floWorkerWs?.send(
            JSON.stringify({
                type: "Disconnect"
            })
        );
    }

    public isConnected() {
        return this.playerInstance && this.playerInstance.readyState == WebSocket.OPEN;
    }

    public isUsedBy(battleTag: string) {
        return this.playerInstance?.player?.battleTag == battleTag;
    }

    public async startWorker() {
        const promise = new Promise<void>((res) => {
            const floExecutable = (this.isWindows || environment.isDev) ? 'flo-worker.exe' : 'flo-worker';
            let floWorkerPath: string;
            if (environment.isDev) {
                floWorkerPath = path.join(`libs`, floExecutable);
            } else {
                floWorkerPath = path.join(`${remote.app.getAppPath()}.unpacked`, floExecutable);
            }
            this.floWorkerProcess = spawn(floWorkerPath, ['--installation-path', this.pathToWc3]);
            this.floWorkerProcess.stdout.on('data', async (data: Buffer) => {
                if (!this.workerInfo && data) {
                    const dataString = data.toString();
                    const parsed = JSON.parse(dataString);
    
                    if (parsed.version && parsed.port) {
                        logger.info('Flo worker started');
    
                        this.workerInfo = parsed;
                        await this.attachToFloWorkerWebsocket();
                        this.isWorkerStarted = true;
                        res();
                    }
                }
            });
    
            this.floWorkerProcess.stderr.on('data', (data: any) => {
                console.error(`stderr: ${data}`);
            });
    
            this.floWorkerProcess.on('close', (code: any) => {
                this.floWorkerProcess = null;
                this.workerInfo = undefined;
                this.isWorkerStarted = false;
                console.log(`child process exited with code ${code}`);
            });
        });
        
        return promise;
    }

    private onPlayerSessionReceived() {
        if (this.reconnectInterValHandle) {
            clearInterval(this.reconnectInterValHandle);
        }
        ingameBridge.sendFloConnected(this.playerInstance as any);
    }

    private onDisconnectRecieved() {
        ingameBridge.sendFloDisconnected(this.playerInstance as any);

        if (this.reconnectInterValHandle) {
            clearInterval(this.reconnectInterValHandle);
        }

        this.reconnectInterValHandle = setInterval(() => {
            logger.info('Reconnecting to flo server');
            this.connect(this.playerInstance as any, this.lastConnectToken as string);
        }, 2000);
    }

    private async attachToFloWorkerWebsocket() {
        const promise = new Promise<void>((res, rej) => {
            if (!this.workerInfo) {
                logger.error('flo worker info is missing');
                rej('flo worker info is missing');
                return;
            }
    
            const ws = new WebSocketClass(`ws://127.0.0.1:${this.workerInfo?.port}`, {
                // request must from this origin or w3flo.com
                origin: "http://localhost:3000",
            });
    
            this.floWorkerWs = ws;
    
            ws.on("open", () => {
                logger.info(`Connected to flo worker websocket on ${this.workerInfo?.port}`);
                res();
            });
    
            ws.on("close", function close() {
                console.log("disconnected");
            });
    
            ws.on("message", (data: any) => {
                const parsed = JSON.parse(data) as IFloWorkerEvent;
                this.processFloWorkerMessage(parsed);
            });
        });

        return promise;
    }

    private processFloWorkerMessage(parsed: IFloWorkerEvent) {
        switch (parsed.type) {
            case EFloWorkerEventTypes.PlayerSession:
                {
                    this.onPlayerSessionReceived();
                    break;
                }
            case EFloWorkerEventTypes.Disconnect:
                {
                    this.onDisconnectRecieved();
                    break;
                }
        }
    }
}