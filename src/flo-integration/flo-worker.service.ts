import { environment } from '@/environment';
import store from "@/globalState/vuex-store";
import { IngameBridge } from '@/hot-keys/ItemHotkeys/IngameBridge';

const { remote } = window.require("electron");
const { spawn } = window.require("child_process");
const path = require('path');

export class FloWorkerService {
    private store = store;

    constructor(ingameBridge: IngameBridge) {
        this.startWorker();
    }

    private startWorker() {
        const floExecutable = (this.store.state.isWindows || environment.isDev) ? 'flo-worker.exe' : 'flo-worker';

        let floWorkerPath: string;
        if (environment.isDev) {
            floWorkerPath = path.join(`libs`, floExecutable);
        } else {
            floWorkerPath = path.join(`${remote.app.getAppPath()}.unpacked`, floExecutable);
        }
        const floWorkerProcess = spawn(floWorkerPath);

        floWorkerProcess.stdout.on('data', (data: any) => {
            console.log(`stdout: ${data}`);
        });

        floWorkerProcess.stderr.on('data', (data: any) => {
            console.error(`stderr: ${data}`);
        });

        floWorkerProcess.on('close', (code: any) => {
            console.log(`child process exited with code ${code}`);
        });
    }
}