import store from "@/globalState/vuex-store";
import { environment } from '@/environment';
import { ELauncherMessageType, IIngameBridgeEvent, ingameBridge } from '@/game/ingame-bridge';
import { FloWorkerInstance, IFloAuthData, IFloWorkerInstanceSettings } from './flo-worker.instance';
import { IPlayerInstance } from '@/game/game.types';
import logger from '@/logger';
import { netshService } from "./netsh.service";

const { remote } = window.require("electron");
const path = require('path');
const fs = window.require("fs");
const { exec } = window.require("child_process");

export class FloWorkerService {
    private store = store;
    private primaryWorker?: FloWorkerInstance;
    private secondaryWorker?: FloWorkerInstance;
    private workers: FloWorkerInstance[] = [];

    public initialize() {
        const settings = this.createWorkerSettings();
        this.tryAddFirewallRulesForWindows(settings);
 
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

        ingameBridge.on(ELauncherMessageType.FLO_CHECK_BONJOUR, async (event: IIngameBridgeEvent) => {
            try {
                const isBonjourRuning = await this.isRunning('mDNSResponder.exe', 'mDNSResponder', 'mDNSResponder');
                ingameBridge.sendFloBonjourCheckResult(event.playerInstance, isBonjourRuning);
            }
            catch (err) {
                logger.error('Unable to execute get bonjour process:' + err);
            }
        });
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
        });
    }

    private async tryAddFirewallRulesForWindows(settings: IFloWorkerInstanceSettings) {
        const isWindows = this.store.state.isWindows;
        if (!isWindows) {
            return;
        }
        debugger
        await this.ensureDisabledRulesAreDeleted();

        const inboundRules = await netshService.getInboundRules();
        const bonjourRules = inboundRules.filter(x => x.name?.toLowerCase().includes('bonjour'));

        if (!bonjourRules || bonjourRules.length == 0) {
            console.log('bonjour empty');
        }

        const floWorkerRules = inboundRules.filter(x => x.name?.toLowerCase().includes('flo-worker'));
        if (!floWorkerRules || floWorkerRules.length == 0) {
            await netshService.addRule('flo-worker.exe', settings.floWorkerExePath);
        }
    }
    
    private async ensureDisabledRulesAreDeleted() {
        debugger
        const inboundRules = await netshService.getInboundRules();

        const bonjourRules = inboundRules.filter(x => x.name?.toLowerCase().includes('bonjour'));
        if (bonjourRules && bonjourRules.length > 0) {
            for (const bonjourRule of bonjourRules) {
                if (!netshService.isRuleEnabled(bonjourRule)) {
                    await netshService.deleteRule(bonjourRule.name);
                }
            }
        }

        const floWorkerRules = inboundRules.filter(x => x.name?.toLowerCase().includes('flo-worker'));
        if (floWorkerRules && floWorkerRules.length > 0) {
            for (const floWorkerRule of floWorkerRules) {
                if (!netshService.isRuleEnabled(floWorkerRule)) {
                    await netshService.deleteRule(floWorkerRule.name);
                }
            }
        }
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