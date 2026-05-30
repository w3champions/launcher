import { IPlayerInstance } from '@/game/game.types';
import { ingameBridge } from '@/game/ingame-bridge';
import logger from '@/logger';
import { IFloNodeProxy } from '@/types/flo-types';
import { EFloWorkerEventTypes, EPlayerStatus, IFloDisconnect, IFloWorkerEvent, IPingUpdate, IPlayerSession, IWatchGameResponse } from './flo-worker-messages';
import { IFloAuthData, IFloNode, IFloNodeOverride, IFloWorkerInstanceSettings, IFloWorkerStartupData } from './types';
const { spawn } = window.require("child_process");
const WebSocketClass = window.require("ws");
const dns = window.require("dns");
const { globalShortcut } = window.require("electron");

type OnEventCallback = (event: IFloWorkerEvent) => void;

const FLO_WORKER_STARTUP_TIMEOUT_MS = 10 * 1000;
const FLO_WORKER_WS_CONNECT_TIMEOUT_MS = 5 * 1000;
const WEB_SOCKET_OPEN = 1;

export class FloWorkerInstance {
    private settings: IFloWorkerInstanceSettings
    private floWorkerProcess?: any;
    private workerInfo?: IFloWorkerStartupData;
    private startupPromise?: Promise<void>;
    private workerStdoutBuffer = '';
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

        if (!this.floWorkerWs || this.floWorkerWs.readyState !== WEB_SOCKET_OPEN) {
            await this.attachToFloWorkerWebsocket();
        }

        this.lastAuthData = authData;
        this.playerInstance = playerInstance;

        this.sendToFloWorker({
            type: 'Connect',
            token: authData.token,
        }, 'Connect');
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
                try {
                    await this.connect(playerInstance, authData);
                }
                catch(e: any) {
                    logger.error(`Unable to reconnect to flo server: ${e?.message || e}`);
                }
                finally {
                    this.isReconnecting = false;
                }
            }, 1000);
        }, 2000);
    }

    public startTestGame() {
        this.sendToFloWorker({
            type: 'StartTestGame',
            name: 'w3c-test'
        }, 'StartTestGame');
    }

    public killTestGame() {
        this.sendToFloWorker({
            type: 'KillTestGame',
            name: 'w3c-test'
        }, 'KillTestGame');
    }

    public watchGame(token: string) {
        this.sendToFloWorker({
            type: 'WatchGame',
            token: token
        }, 'WatchGame');
    }

    public async setNodeAddrsOverrides(nodeOverrides: IFloNodeProxy[]) {
        if (!nodeOverrides) {
            nodeOverrides = [];
        }

        const overrides: IFloNodeOverride[] = [];
        for (const nodeOverride of nodeOverrides) {
            let address = nodeOverride.address;
            if (nodeOverride.isDns) {
                try {
                    address = await this.resolveIpFromDns(nodeOverride.address);
                }
                catch(e: any) {
                    logger.error(`Unable to resolve flo node override ${nodeOverride.address}: ${e?.message || e}`);
                    continue;
                }
            }

            overrides.push({
                node_id: nodeOverride.nodeId,
                address: `${address}:${nodeOverride.port}`
            });
        }

        const nodeOverridesMessage = JSON.stringify({
            type: 'SetNodeAddrOverrides',
            overrides
        });

        logger.info(`Setting node overrides: ${nodeOverridesMessage}`)

        this.sendToFloWorkerMessage(nodeOverridesMessage, 'SetNodeAddrOverrides');
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

        if (this.startupPromise) {
            return this.startupPromise;
        }

        this.startupPromise = new Promise<void>((res, rej) => {
            let settled = false;
            const startupTimeout = setTimeout(() => {
                failStartup(new Error('Timed out waiting for flo worker startup data.'));
            }, FLO_WORKER_STARTUP_TIMEOUT_MS);

            const cleanupStartup = () => {
                clearTimeout(startupTimeout);
                this.workerStdoutBuffer = '';
                this.startupPromise = undefined;
            };

            const failStartup = (error: Error) => {
                if (settled) {
                    return;
                }

                settled = true;
                cleanupStartup();
                this.workerInfo = undefined;
                this.isWorkerStarted = false;
                this.floWorkerProcess?.kill();
                logger.error(`Unable to start flo worker: ${error.message}`);
                rej(error);
            };

            const finishStartup = async (startupData: IFloWorkerStartupData) => {
                if (settled) {
                    return;
                }

                try {
                    logger.info(`Flo worker started against: ${this.settings.floControllerHostUrl}`);

                    this.workerInfo = startupData;
                    await this.attachToFloWorkerWebsocket();
                    this.isWorkerStarted = true;
                    settled = true;
                    cleanupStartup();
                    res();
                }
                catch(e: any) {
                    failStartup(e instanceof Error ? e : new Error(e?.message || e));
                }
            };

            this.floWorkerProcess = spawn(this.settings.floWorkerExePath,
                ['--installation-path', this.settings.wc3FolderPath,
                    '--controller-host', this.settings.floControllerHostUrl,
                    '--ptr', this.settings.ptr ? "true" : "false",
                ],
                { cwd: this.settings.floWorkerFolderPath }
            );
            this.floWorkerProcess.stdout.on('data', async (data: Buffer) => {
                if (!this.workerInfo && data) {
                    this.handleWorkerStdout(data, finishStartup);
                }
            });

            this.floWorkerProcess.on('error', (startErr: any) => {
                failStartup(startErr instanceof Error ? startErr : new Error(`start error ${startErr}`));
            });

            this.floWorkerProcess.stderr.on('data', (data: any) => {
                logger.error(`stderr: ${data}`);
            });

            this.floWorkerProcess.on('close', (code: any) => {
                this.floWorkerProcess = null;
                this.workerInfo = undefined;
                this.isWorkerStarted = false;
                logger.info(`child process exited with code ${code}`);

                if (!settled) {
                    failStartup(new Error(`flo worker exited before startup completed with code ${code}`));
                }
            });
        });

        return this.startupPromise;
    }

    public stopWorker() {
        if (this.isInsideGame) {
            logger.info('Cannot stop worker game because already in game.');
            return;
        }

        logger.info('Stopping worker');
        if (this.reconnectInterValHandle) {
            clearInterval(this.reconnectInterValHandle);
            this.reconnectInterValHandle = undefined;
        }
        this.isReconnecting = false;
        this.startupPromise = undefined;
        this.floWorkerWs?.close();
        this.floWorkerProcess?.kill();
        this.isWorkerStarted = false;
    }

    private onPlayerSessionReceived(playerSession: IPlayerSession) {
        this.playerSession = playerSession;

        if (this.reconnectInterValHandle) {
            clearInterval(this.reconnectInterValHandle);
            this.reconnectInterValHandle = undefined;
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
                rej(new Error('flo worker info is missing'));
                return;
            }

            let settled = false;
            const ws = new WebSocketClass(`ws://127.0.0.1:${this.workerInfo?.port}`, {
                // request must from this origin or w3flo.com
                origin: "http://localhost:3000",
            });

            const timeout = setTimeout(() => {
                rejectOnce(new Error(`Timed out connecting to flo worker websocket on ${this.workerInfo?.port}.`));
            }, FLO_WORKER_WS_CONNECT_TIMEOUT_MS);

            const cleanup = () => {
                clearTimeout(timeout);
            };

            const resolveOnce = () => {
                if (settled) {
                    return;
                }

                settled = true;
                cleanup();
                res();
            };

            const rejectOnce = (error: Error) => {
                if (settled) {
                    return;
                }

                settled = true;
                cleanup();
                if (this.floWorkerWs === ws) {
                    this.floWorkerWs = undefined;
                }
                try {
                    ws?.close();
                }
                catch(e: any) {
                    logger.error(`Unable to close flo worker websocket after connection failure: ${e?.message || e}`);
                }
                rej(error);
            };

            this.floWorkerWs = ws;

            ws.on("open", () => {
                logger.info(`Connected to flo worker websocket on ${this.workerInfo?.port}`);
                resolveOnce();
            });

            ws.on("error", (err: Error) => {
                logger.error(`flo worker websocket error: ${err?.message || err}`);
                rejectOnce(err instanceof Error ? err : new Error(String(err)));
            });

            ws.on("close", () => {
                logger.info("ws disconnected");
                if (!settled) {
                    rejectOnce(new Error('flo worker websocket closed before connection opened.'));
                    return;
                }
                if (this.floWorkerWs === ws) {
                    this.floWorkerWs = undefined;
                }
            });

            ws.on("message", (data: any) => {
                try {
                    const parsed = JSON.parse(data) as IFloWorkerEvent;
                    this.processFloWorkerMessage(parsed);
                    logger.info(data);
                }
                catch(e: any) {
                    logger.error(`Unable to parse flo worker websocket message: ${e?.message || e}`);
                }
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
                if (err) {
                    rej(err);
                    return;
                }
                res(ipAddress);
            });
        });

        return promise;
    }

    private setWatchGameSpeed(speed: number) {
        this.sendToFloWorker({
            type: 'WatchGameSetSpeed',
            speed: speed
        }, 'WatchGameSetSpeed');
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

    private handleWorkerStdout(data: Buffer, onStartupData: (startupData: IFloWorkerStartupData) => void) {
        this.workerStdoutBuffer += data.toString();

        const lines = this.workerStdoutBuffer.split(/\r?\n/);
        this.workerStdoutBuffer = lines.pop() || '';

        for (const line of lines) {
            this.tryHandleWorkerStartupLine(line, onStartupData);
        }

        this.tryHandleWorkerStartupLine(this.workerStdoutBuffer, onStartupData, false);
    }

    private tryHandleWorkerStartupLine(
        line: string,
        onStartupData: (startupData: IFloWorkerStartupData) => void,
        discardInvalid = true
    ) {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
            return;
        }

        try {
            const parsed = JSON.parse(trimmedLine);
            const port = Number(parsed?.port);
            if (parsed?.version && Number.isInteger(port)) {
                this.workerStdoutBuffer = '';
                onStartupData({
                    version: String(parsed.version),
                    port
                });
                return;
            }
        }
        catch(e) {
            if (!discardInvalid) {
                return;
            }
        }

        if (discardInvalid) {
            logger.info(trimmedLine);
        }
    }

    private sendToFloWorker(message: Record<string, unknown>, description: string) {
        this.sendToFloWorkerMessage(JSON.stringify(message), description);
    }

    private sendToFloWorkerMessage(message: string, description: string) {
        if (!this.floWorkerWs || this.floWorkerWs.readyState !== WEB_SOCKET_OPEN) {
            logger.error(`Cannot send ${description}: flo worker websocket is not open.`);
            return;
        }

        this.floWorkerWs.send(message);
    }
}
