import { IPlayerInstance } from '@/game/game.types';
import { ingameBridge } from '@/game/ingame-bridge';
import logger from '@/logger';
import { IFloNodeProxy } from '@/types/flo-types';
import { EFloWorkerEventTypes, EPlayerStatus, IFloDisconnect, IFloWorkerEvent, IPingUpdate, IPlayerSession, IWatchGameResponse } from './flo-worker-messages';
import { IFloAuthData, IFloNode, IFloNodeOverride, IFloWorkerInstanceSettings, IFloWorkerStartupData } from './types';
const { spawn } = window.require("child_process");
const WebSocketClass = window.require("ws");
const dns = window.require("dns");
const { globalShortcut } = window.require("electron").remote;

type OnEventCallback = (event: IFloWorkerEvent) => void;

export class FloWorkerInstance {
    private settings: IFloWorkerInstanceSettings
    private floWorkerProcess?: any;
    private workerInfo?: IFloWorkerStartupData;
    private isWorkerStarted: boolean = false;
    private floWorkerWs?: WebSocket;
    private lastAuthData?: IFloAuthData;
    private reconnectInterValHandle?: any;
    private nodePings: IFloNode[] = [];
    private playerInstance?: IPlayerInstance;
    private playerSession?: IPlayerSession;
    private isReconnecting = false;
    private isTestGameCheckDone = false;
    private onEvent: OnEventCallback | null = null;

    private isWatching = false;
    private lastWatchGameSpeed = 1;

    private watchGameDecreaseSpeedHotkey = 'f6';
    private watchGameIncreaseSpeedHotkey = 'f7';
    private watchGameHotkeysRegistered = false;

    constructor(settings: IFloWorkerInstanceSettings, onEvent?: OnEventCallback) {
        this.settings = settings;
        if (onEvent) {
            this.onEvent = onEvent
        }
    }

    get isInsideGame() {
        return this.playerSession?.status == EPlayerStatus.InGame;
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

    public reconnect(playerInstance: IPlayerInstance, authData: IFloAuthData) {
        if (this.reconnectInterValHandle) {
            clearInterval(this.reconnectInterValHandle);
        }

        this.reconnectInterValHandle = setInterval(() => {
            if (this.isReconnecting) {
                return;
            }
            this.isReconnecting = true;
            logger.info('Reconnecting to flo server');

            setTimeout(async () => {
                if (!this.floWorkerWs) {
                    logger.info('Reconnecting to flo worker websocket');
                    await this.attachToFloWorkerWebsocket();
                }
                await this.connect(playerInstance, authData);
                this.isReconnecting = false;
            }, 1000);
        }, 2000);
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

    public watchGame(token: string) {
        this.floWorkerWs?.send(
            JSON.stringify({
                type: 'WatchGame',
                token: token
            })
        );
    }

    public async setNodeAddrsOverrides(nodeOverrides: IFloNodeProxy[]) {
        if (!nodeOverrides) {
            nodeOverrides = [];
        }

        const dnsOverrides = nodeOverrides.filter(x => x.isDns);

        for (const dnsOverride of dnsOverrides) {
            dnsOverride.address = await this.resolveIpFromDns(dnsOverride.address);
        }

        const overrides: IFloNodeOverride[] = nodeOverrides.map(x => {
            return {
                node_id: x.nodeId,
                address: `${x.address}:${x.port}`
            }
        });

        const nodeOverridesMessage = JSON.stringify({
            type: 'SetNodeAddrOverrides',
            overrides
        });

        logger.info(`Setting node overrides: ${nodeOverridesMessage}`)

        this.floWorkerWs?.send(nodeOverridesMessage);
    }

    public isConnectedToGame() {
        return this.playerInstance && this.playerInstance.readyState == WebSocket.OPEN;
    }

    public isUsedBy(battleTag: string) {
        return this.playerInstance?.player?.battleTag == battleTag;
    }

    public async startWorker() {
        if (this.isInsideGame) {
            logger.info('Cannot start worker game because already in game.');
            return;
        }

        const promise = new Promise<void>((res) => {
            this.floWorkerProcess = spawn(this.settings.floWorkerExePath,
                ['--installation-path', this.settings.wc3FolderPath,
                    '--controller-host', this.settings.floControllerHostUrl,
                    '--ptr', this.settings.ptr ? "true" : "false",
                ],
                { cwd: this.settings.floWorkerFolderPath }
            );
            this.floWorkerProcess.stdout.on('data', async (data: Buffer) => {
                if (!this.workerInfo && data) {
                    const dataString = data.toString();
                    const parsed = JSON.parse(dataString);

                    if (parsed.version && parsed.port) {
                        logger.info(`Flo worker started against: ${this.settings.floControllerHostUrl}`);

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
        if (this.isInsideGame) {
            logger.info('Cannot stop worker game because already in game.');
            return;
        }

        logger.info('Stopping worker');
        this.floWorkerWs?.close();
        this.floWorkerProcess?.kill();
        this.isWorkerStarted = false;
    }

    private onPlayerSessionReceived(playerSession: IPlayerSession) {
        this.playerSession = playerSession;

        if (this.reconnectInterValHandle) {
            clearInterval(this.reconnectInterValHandle);
        }
        ingameBridge.sendFloConnected(this.playerInstance as any, this.workerInfo?.version as string);

        if (!this.isTestGameCheckDone) {
            this.startTestGame();
            setTimeout(() => this.killTestGame(), 1000);
            this.isTestGameCheckDone = true;
        }

        setTimeout(() => {
            this.setNodeAddrsOverrides(this.lastAuthData?.nodeOverrides || []);
        }, 2000);
    }

    public gameExited() {
        this.isWatching = false;
        this.lastWatchGameSpeed = 1;

        globalShortcut.unregister(this.watchGameDecreaseSpeedHotkey);
        globalShortcut.unregister(this.watchGameIncreaseSpeedHotkey);

        this.watchGameHotkeysRegistered = false;
    }

    private onDisconnectRecieved(floDisconnectEvent: IFloDisconnect) {
        logger.info('Disconnect received');
        ingameBridge.sendFloDisconnected(this.playerInstance as any);
        if (floDisconnectEvent.reason === "Multi") return; // Do not attempt reconnect if the user is connecting from another client.
        this.reconnect(this.playerInstance as any, this.lastAuthData as any);
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

            ws.on("close", () => {
                logger.info("ws disconnected");
                this.floWorkerWs = undefined;
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
        if (this.onEvent) {
            this.onEvent(parsed)
        }
        switch (parsed.type) {
            case EFloWorkerEventTypes.PlayerSession:
                {
                    this.onPlayerSessionReceived(parsed as any);
                    break;
                }
            case EFloWorkerEventTypes.PlayerSessionUpdate:
                {
                    const sessionUpdate = parsed as IPlayerSession;
                    this.playerSession = sessionUpdate;
                    break;
                }
            case EFloWorkerEventTypes.Disconnect:
                {
                    this.onDisconnectRecieved(parsed as IFloDisconnect);
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

                break;
            }
            case EFloWorkerEventTypes.WatchGameError: {
                this.onWatchGameError();
                break;
            }
            case EFloWorkerEventTypes.WatchGame: {
                this.onWatchGameSuccess(parsed as IWatchGameResponse);
                break;
            }
        }
    }

    private onWatchGameError() {
        this.isWatching = false;
        ingameBridge.sendWatchGameError(this.playerInstance as any);
    }

    private onWatchGameSuccess(data: IWatchGameResponse) {
        this.lastWatchGameSpeed = data.speed;
        this.isWatching = true;

        ingameBridge.sendWatchGameSuccess(this.playerInstance as any);

        if (!this.watchGameHotkeysRegistered) {
            // TODO (W3C-151)  make those hotkeys configurable from UI
            // Note that electron global shortcuts do not execute default key action
            globalShortcut.register(this.watchGameDecreaseSpeedHotkey, () => {
                this.watchGameChangeSpeed(-1);
            });

            globalShortcut.register(this.watchGameIncreaseSpeedHotkey, () => {
                this.watchGameChangeSpeed(1);
            });

            this.watchGameHotkeysRegistered = true;
        }
    }

    private resolveIpFromDns(dnsAddress: string) {
        const promise = new Promise<string>((res, rej) => {
            dns.lookup(dnsAddress, (err: any, ipAddress: string) => {
                res(ipAddress);
            });
        });

        return promise;
    }

    private setWatchGameSpeed(speed: number) {
        const setSpeedMessage = JSON.stringify({
            type: 'WatchGameSetSpeed',
            speed: speed
        });

        this.floWorkerWs?.send(setSpeedMessage);
    }

    private watchGameChangeSpeed(increment: number) {
        if (!this.isWatching) {
            return;
        }

        let newSpeed = this.lastWatchGameSpeed + increment;

        if (newSpeed < 1) {
            newSpeed = 1;
        }

        if (newSpeed > 4) {
            newSpeed = 4;
        }

        if (newSpeed != this.lastWatchGameSpeed) {
            this.setWatchGameSpeed(newSpeed);
        }
    }
}