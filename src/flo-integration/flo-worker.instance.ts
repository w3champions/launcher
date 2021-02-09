import { IPlayerInstance } from '@/game/game.types';
import { ingameBridge } from '@/game/ingame-bridge';
import logger from '@/logger';
const { spawn } = window.require("child_process");
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

export interface IFloPing {
    min: number;
    max: number;
    avg: number;
    current: number;
    loss_rate: number;
}

export interface IFloNode {
    id: string;
    name: string;
    location: string;
	country_id: string;
	ping: IFloPing;
}

export interface IPlayerNodeOverride {
    nodeId: number;
    port: number;
    address: string;
}

interface IFloNodeOverride {
    node_id: number;
    address: string;
}

export interface IFloAuthData {
    token: string;
    nodeOverrides: IPlayerNodeOverride[];
}

export interface IListNodesEvent extends IFloWorkerEvent {
    nodes: IFloNode[];
}

export interface IPingUpdate extends IFloWorkerEvent {
    ping_map: {[id: string]: IFloPing};
}

export interface IFloWorkerInstanceSettings {
    floWorkerFolderPath: string;
    floWorkerExePath: string;
    wc3FolderPath: string;
}

export class FloWorkerInstance {
    private settings: IFloWorkerInstanceSettings
    private floWorkerProcess?: any;
    private workerInfo?: IFloWorkerStartupData;
    private isWorkerStarted: boolean = false;
    private floWorkerWs?: WebSocket;
    private lastAuthData?: IFloAuthData;
    private reconnectInterValHandle?: any;
    private isReconnecting = false;
    private nodePings: IFloNode[] = [];

    public playerInstance?: IPlayerInstance;

    constructor(settings: IFloWorkerInstanceSettings) {
        this.settings = settings;
    }

    public async connect(playerInstance: IPlayerInstance, authData: IFloAuthData) {
        if (!this.isWorkerStarted) {
            await this.startWorker();
        }

        this.lastAuthData = authData;
        this.playerInstance = playerInstance;
        this.floWorkerWs?.send(
            JSON.stringify({
                type: 'Connect',
                token: authData.token,
            })
        );
    }

    public disconnect() {
        this.floWorkerWs?.send(
            JSON.stringify({
                type: 'Disconnect'
            })
        );
    }

    public startTestGame() {
        this.floWorkerWs?.send(
            JSON.stringify({
                type: 'StartTestGame',
                name: 'w3c-test'
            })
        );
    }

    public killTestGame() {
        this.floWorkerWs?.send(
            JSON.stringify({
                type: 'KillTestGame',
                name: 'w3c-test'
            })
        );
    }

    public setNodeAddrsOverrides(nodeOverrides: IPlayerNodeOverride[]) {
        debugger
        const overrides: IFloNodeOverride[] = nodeOverrides.map(x => {
            return {
                node_id: x.nodeId,
                address: `${x.address}:${x.port}`
            }
        });

        this.floWorkerWs?.send(JSON.stringify({
            type: 'SetNodeAddrOverrides',
            overrides
        }));
    }

    public isConnected() {
        return this.playerInstance && this.playerInstance.readyState == WebSocket.OPEN;
    }

    public isUsedBy(battleTag: string) {
        return this.playerInstance?.player?.battleTag == battleTag;
    }

    public async startWorker() {
        const promise = new Promise<void>((res) => {
            this.floWorkerProcess = spawn(this.settings.floWorkerExePath, ['--installation-path', this.settings.wc3FolderPath], {cwd: this.settings.floWorkerFolderPath});
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

            this.floWorkerProcess.on('error', function (startErr: any) {
                logger.error('start error' + startErr);
            });
    
            this.floWorkerProcess.stderr.on('data', (data: any) => {
                logger.error(`stderr: ${data}`);
            });
    
            this.floWorkerProcess.on('close', (code: any) => {
                this.floWorkerProcess = null;
                this.workerInfo = undefined;
                this.isWorkerStarted = false;
                logger.info(`child process exited with code ${code}`);
            });
        });
        
        return promise;
    }

    public stopWorker() {
        logger.info('Stopping worker');
        this.floWorkerWs?.close();
        this.floWorkerProcess?.kill();
        this.isWorkerStarted = false;
    }

    private onPlayerSessionReceived() {
        if (this.reconnectInterValHandle) {
            clearInterval(this.reconnectInterValHandle);
        }
        ingameBridge.sendFloConnected(this.playerInstance as any, this.workerInfo?.version as string);

        this.startTestGame();
        setTimeout(()=> this.killTestGame() , 1000);

        this.setNodeAddrsOverrides(this.lastAuthData?.nodeOverrides || []);
    }

    private onDisconnectRecieved() {
        ingameBridge.sendFloDisconnected(this.playerInstance as any);

        if (this.reconnectInterValHandle) {
            clearInterval(this.reconnectInterValHandle);
        }

        this.reconnectInterValHandle = setInterval(() => {
            if (this.isReconnecting) {
                return;
            }
            this.isReconnecting = true;
            logger.info('Reconnecting to flo server');
            this.stopWorker();

            setTimeout(async () => {
                await this.connect(this.playerInstance as any, this.lastAuthData as IFloAuthData);
                this.isReconnecting = false;
            }, 1000);
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
                logger.info("ws disconnected");
            });
    
            ws.on("message", (data: any) => {
                const parsed = JSON.parse(data) as IFloWorkerEvent;
                this.processFloWorkerMessage(parsed);
                logger.info(data);
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
            case EFloWorkerEventTypes.ListNodes: {
                this.nodePings = (parsed as any)?.nodes || [];
                break;
            }
            case EFloWorkerEventTypes.PingUpdate: {
                const pingMap = (parsed as IPingUpdate)?.ping_map;

                if (pingMap) {
                    for (const node of this.nodePings) {
                        const ping = pingMap[node.id];

                        if (ping) {
                            node.ping.avg = ping.avg;
                            node.ping.current = ping.current;
                            node.ping.max = ping.max;
                            node.ping.min = ping.min;
                            node.ping.loss_rate = ping.loss_rate;
                        }
                    }

                    ingameBridge.sendPingUpdates(this.playerInstance as any, this.nodePings)
                }
            }
        }
    }
}