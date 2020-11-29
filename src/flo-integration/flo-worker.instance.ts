import { environment } from '@/environment';
import { ingameBridge } from '@/ingame-bridge';
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
    PingUpdate = 'PingUpdate'
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

export class FloWorkerInstance
{
    private isWindows: boolean;
    private floWorkerProcess?: any;
    private workerInfo?: IFloWorkerStartupData;
    private floWorkerWs?: WebSocket;
    private gameSocket?: WebSocket;

    constructor(isWindows: boolean) {
        this.isWindows = isWindows;
        this.startWorker();
    }

    public connect(gameSocket: WebSocket, token: string) {
        this.gameSocket = gameSocket;
        this.floWorkerWs?.send(
            JSON.stringify({
                type: "Connect",
                token: token,
            })
        );
    }

    public isConnected() {
        return this.gameSocket && this.gameSocket.readyState == WebSocket.OPEN;
    }

    private startWorker() {
        const floExecutable = (this.isWindows || environment.isDev) ? 'flo-worker.exe' : 'flo-worker';

        let floWorkerPath: string;
        if (environment.isDev) {
            floWorkerPath = path.join(`libs`, floExecutable);
        } else {
            floWorkerPath = path.join(`${remote.app.getAppPath()}.unpacked`, floExecutable);
        }
        this.floWorkerProcess = spawn(floWorkerPath);
        this.floWorkerProcess.stdout.on('data', (data: Buffer) => {
            if (!this.workerInfo && data) {
                const dataString = data.toString();
                const parsed = JSON.parse(dataString);

                if (parsed.version && parsed.port) {
                    logger.info('Flo worker started');

                    this.workerInfo = parsed;
                    this.attachToFloWorkerWebsocket();
                }
            }
        });

        this.floWorkerProcess.stderr.on('data', (data: any) => {
            console.error(`stderr: ${data}`);
        });

        this.floWorkerProcess.on('close', (code: any) => {
            console.log(`child process exited with code ${code}`);
        });
    }

    private attachToFloWorkerWebsocket() {
        if (!this.workerInfo) {
            logger.error('flo worker info is missing')
            return;
        }

        const ws = new WebSocketClass(`ws://127.0.0.1:${this.workerInfo?.port}`, {
            // request must from this origin or w3flo.com
            origin: "http://localhost:3000",
        });

        this.floWorkerWs = ws;

        ws.on("open", () => {
            logger.info(`Connected to flo worker websocket on ${this.workerInfo?.port}`);
        });

        ws.on("close", function close() {
            console.log("disconnected");
        });

        ws.on("message", (data: any) => {
            const parsed = JSON.parse(data) as IFloWorkerEvent;
            if (parsed.type == EFloWorkerEventTypes.PlayerSession) {
                ingameBridge.sendFloConnected(this.gameSocket as any);
            }
            console.log(data);
        });
    }
}