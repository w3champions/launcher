import store from "@/globalState/vuex-store";
import { environment } from '@/environment';
import { ELauncherMessageType, IIngameBridgeEvent, ingameBridge } from '@/game/ingame-bridge';
import { FloWorkerInstance, IFloAuthData, IFloWorkerInstanceSettings } from './flo-worker.instance';
import { IPlayerInstance } from '@/game/game.types';
import logger from '@/logger';
import { IFloNetworkTest } from "@/types/flo-types";

const { remote } = window.require("electron");
const path = require('path');
const fs = window.require("fs");
const { exec } = window.require("child_process");
const { ipcRenderer } = window.require('electron')

export class FloWorkerService {
    private store = store;
    private primaryWorker?: FloWorkerInstance;
    private secondaryWorker?: FloWorkerInstance;
    private workers: FloWorkerInstance[] = [];

    public initialize() {
        const settings = this.createWorkerSettings();

        // Start one worker by default
        this.primaryWorker = new FloWorkerInstance(settings);
        this.primaryWorker.startWorker();

        // Create second worker used to connect second Warcraft 3 to the launcher
        this.secondaryWorker = new FloWorkerInstance(settings);

        this.workers.push(this.primaryWorker);
        this.workers.push(this.secondaryWorker);

        ingameBridge.on(ELauncherMessageType.FLO_AUTH, (event: IIngameBridgeEvent) => {
            const data = event.data as IFloAuthData;
            const pi = event.playerInstance;

            const workerInstance = this.getWorkerInstance(pi);
            workerInstance?.connect(pi, data);
        });

        ingameBridge.on(ELauncherMessageType.DISCONNECTED, (playerInstnace: IPlayerInstance) => {
        });

        ingameBridge.on(ELauncherMessageType.FLO_CHECK_BONJOUR, async (event: IIngameBridgeEvent) => {
            try {
                const isBonjourRuning = await this.isRunning('mDNSResponder.exe', 'mDNSResponder', 'mDNSResponder');
                ingameBridge.sendFloBonjourCheckResult(event.playerInstance, isBonjourRuning);
            }
            catch (err) {
                logger.error('Unable to execute get bonjour process:' + err);
            }
        });

        ingameBridge.on(ELauncherMessageType.FLO_CREATE_TEST_GAME,  (event: IIngameBridgeEvent)  => {
            const workerInstance = this.getWorkerInstance(event.playerInstance);
            workerInstance?.startTestGame();
        });

        ingameBridge.on(ELauncherMessageType.FLO_KILL_TEST_GAME, (event: IIngameBridgeEvent) => {
            const workerInstance = this.getWorkerInstance(event.playerInstance);
            workerInstance?.killTestGame();
        });

        ingameBridge.on(ELauncherMessageType.FLO_SET_NODE_OVERRIDES, (event: IIngameBridgeEvent) => {
            const workerInstance = this.getWorkerInstance(event.playerInstance);
            workerInstance?.setNodeAddrsOverrides(event.data);
        });

        ingameBridge.on(ELauncherMessageType.FLO_NETWORK_TEST_REQUEST, (event: IIngameBridgeEvent) => {
            ipcRenderer.once('flo-network-test-start', (wht: any) => {
                ingameBridge.sendNetworkTestStart(event.playerInstance);
            });

            ipcRenderer.removeAllListeners('flo-network-test-progress');
            ipcRenderer.on('flo-network-test-progress', (wht: any, progressPerc: number) => {
                ingameBridge.sendNetworkTestProgress(event.playerInstance, progressPerc);
            });

            ipcRenderer.once('flo-network-test-result', (wht: any, networkTest: IFloNetworkTest) => {
                ingameBridge.sendNetworkTestResult(event.playerInstance, networkTest);
            });

            ipcRenderer.send('flo-network-test', event.data);
        });
    }

    private getWorkerInstance(pi: IPlayerInstance) {
        let workerInstance = this.workers.find(x => x.isUsedBy(pi.player.battleTag));

        if (workerInstance) {
            return workerInstance;
        }

        workerInstance = this.workers.find(x => !x.isConnected());
        if (workerInstance) {
            return workerInstance;
        }

        return this.primaryWorker;
    }

    private isRunning(win: string, mac: string, linux: string){
        return new Promise<boolean>(function(resolve, reject){
            const plat = remote.process.platform;
            const cmd = plat == 'win32' ? 'tasklist' : (plat == 'darwin' ? 'ps -ax | grep ' + mac : (plat == 'linux' ? 'ps -A' : ''))
            const proc = plat == 'win32' ? win : (plat == 'darwin' ? mac : (plat == 'linux' ? linux : ''))
            if(cmd === '' || proc === ''){
                resolve(false)
            }
            exec(cmd, function(err: any, stdout: any, stderr: any) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(stdout.toLowerCase().indexOf(proc.toLowerCase()) > -1)
            });
        })
    }

    private createWorkerSettings() {
        const isWindows = this.store.state.isWindows;
        const floExecutable = (isWindows) ? 'flo-worker.exe' : 'flo-worker';
        let floWorkerFolderPath: string;
        if (environment.isDev) {
            const appPath = remote.app.getAppPath();
            let rootFolder = appPath.replace('\\dist_electron', '');
            rootFolder = rootFolder.replace('/dist_electron', '');
            floWorkerFolderPath =  path.join(rootFolder, `libs`);
        } else {
            floWorkerFolderPath = path.join(`${remote.app.getAppPath()}.unpacked`);
        }

        const floWorkerExePath = path.join(floWorkerFolderPath, floExecutable);
        const floLogsFolder = path.join(floWorkerFolderPath, 'flo-logs');

        if (!fs.existsSync(floLogsFolder)){
            fs.mkdirSync(floLogsFolder);
        }

        if (!isWindows) {
            fs.chmodSync(floLogsFolder, '755');
            fs.chmodSync(floWorkerFolderPath, '755');
            fs.chmodSync(floWorkerExePath, '755');
        }

        let wc3FolderPath = this.store.getters.updateService.loadW3Path();
        if (wc3FolderPath && wc3FolderPath.toLowerCase().includes('_retail_')) {
            wc3FolderPath = wc3FolderPath.replace('/_retail_', '');
            wc3FolderPath = wc3FolderPath.replace('\\_retail_', '');
        }

        const result: IFloWorkerInstanceSettings = {
            floWorkerFolderPath,
            floWorkerExePath,
            wc3FolderPath
        };

        return result;
    }
}

export const floWorkerService = new FloWorkerService();
