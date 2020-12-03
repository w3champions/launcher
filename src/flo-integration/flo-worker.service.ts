import store from "@/globalState/vuex-store";
import { ELauncherMessageType, IIngameBridgeEvent, ingameBridge } from '@/game/ingame-bridge';
import { FloWorkerInstance, IFloAuthData } from './flo-worker.instance';
import { IPlayerInstance } from '@/game/game.types';

export class FloWorkerService {
    private store = store;
    private primaryWorker?: FloWorkerInstance;
    private secondaryWorker?: FloWorkerInstance;
    private workers: FloWorkerInstance[] = [];

    public initialize() {
        let pathToWc3 = this.store.getters.updateService.loadW3Path();
        if (pathToWc3 && pathToWc3.toLowerCase().includes('_retail_')) {
            pathToWc3 = pathToWc3.replace('/_retail_', '');
            pathToWc3 = pathToWc3.replace('\\_retail_', '');
        }
        
        // Start one worker by default
        this.primaryWorker = new FloWorkerInstance(this.store.state.isWindows, pathToWc3);
        this.primaryWorker.startWorker();

        // Create second worker used to connect second Warcraft 3 to the launcher
        this.secondaryWorker = new FloWorkerInstance(this.store.state.isWindows, pathToWc3);

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
}

export const floWorkerService = new FloWorkerService();