import store from "@/globalState/vuex-store";
import { ELauncherMessageType, IIngameBridgeEvent, ingameBridge } from '@/ingame-bridge';
import logger from '@/logger';
import { FloWorkerInstance, IFloAuthData } from './flo-worker.instance';

export class FloWorkerService {
    private store = store;
    private floWorker?: FloWorkerInstance;

    public initialize() {
        this.floWorker = new FloWorkerInstance(this.store.state.isWindows);
        const flowWoker2 = new FloWorkerInstance(this.store.state.isWindows);

        ingameBridge.on(ELauncherMessageType.FLO_AUTH, (event: IIngameBridgeEvent) => {
            logger.info('Flo auth handle');
            const data = event.data as IFloAuthData;

            if (!this.floWorker?.isConnected()) {
                this.floWorker?.connect(event.gameSocket, data.token);
            }
            else {
                flowWoker2.connect(event.gameSocket, data.token);
            }
        });

        ingameBridge.on(ELauncherMessageType.DISCONNECTED, () => {
        });
    }
}

export const floWorkerService = new FloWorkerService();