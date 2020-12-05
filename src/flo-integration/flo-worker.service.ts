import store from "@/globalState/vuex-store";
import { environment } from '@/environment';
import { ELauncherMessageType, IIngameBridgeEvent, ingameBridge } from '@/game/ingame-bridge';
import { FloWorkerInstance, IFloAuthData, IFloWorkerInstanceSettings } from './flo-worker.instance';
import { IPlayerInstance } from '@/game/game.types';

const { remote } = window.require("electron");
const path = require('path');
const fs = window.require("fs");

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

            let workerInstance = this.workers.find(x => x.isUsedBy(pi.player.battleTag));

            if (workerInstance) {
                workerInstance.connect(pi, data.token);
                return;
            }

            workerInstance = this.workers.find(x => !x.isConnected());
            if (workerInstance) {
                workerInstance.connect(pi, data.token);
                return;
            }

            this.primaryWorker?.connect(pi, data.token);
        });

        ingameBridge.on(ELauncherMessageType.DISCONNECTED, (playerInstnace: IPlayerInstance) => {
        });
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

        fs.chmodSync(floLogsFolder, '755');
        fs.chmodSync(floWorkerFolderPath, '755');
        fs.chmodSync(floWorkerExePath, '755');

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