import { environment } from '@/environment';
import store from "@/globalState/vuex-store";
import { ELauncherMessageType, ingameBridge } from '@/ingame-bridge';
import logger from '@/logger';
const WebSocket = window.require("ws");

const { remote } = window.require("electron");
const { spawn } = window.require("child_process");
const path = require('path');

interface IFloAuthData {
    token: string;
}

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

interface IFloWorkerPlayer {
    id: number;
    name: string;
}

interface IPlayerSessionEvent extends IFloWorkerEvent {
    player: IFloWorkerPlayer;
}

export class FloWorkerService {
    private floWorkerProcess?: any;
    private workerInfo?: IFloWorkerStartupData;
    private floWorkerWs?: WebSocket;
    private store = store;

    public initialize() {
        this.startWorker();

        ingameBridge.on(ELauncherMessageType.FLO_AUTH, (data: IFloAuthData) => {
            logger.info('Flo auth handle');

            if (this.floWorkerWs) {
                this.sendConnect(data.token);
            } else {
                this.attachToFloWorkerWebsocket(data.token);
            }
        });

        ingameBridge.on(ELauncherMessageType.DISCONNECTED, () => {
           
        });
    }

    private startWorker() {
        const floExecutable = (this.store.state.isWindows || environment.isDev) ? 'flo-worker.exe' : 'flo-worker';

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
                    this.workerInfo = parsed;
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

    private attachToFloWorkerWebsocket(token: string) {
        if (!this.workerInfo) {
            logger.error('flo worker info is missing')
            return;
        }

        const ws = new WebSocket(`ws://127.0.0.1:${this.workerInfo?.port}`, {
            // request must from this origin or w3flo.com
            origin: "http://localhost:3000",
        });

        this.floWorkerWs = ws;

        ws.on("open", () => {
            console.log("connected");
            this.sendConnect(token);
        });

        ws.on("close", function close() {
            console.log("disconnected");
        });

        ws.on("message", function incoming(data: any) {
            const parsed = JSON.parse(data) as IFloWorkerEvent;
            if (parsed.type == EFloWorkerEventTypes.PlayerSession) {
                ingameBridge.sendFloConnected();
            }
            console.log(data);
        });
    }

    private sendConnect(token: string) {
        this.floWorkerWs?.send(
            JSON.stringify({
                type: "Connect",
                token: token,
            })
        );
    }
}

export const floWorkerService = new FloWorkerService();