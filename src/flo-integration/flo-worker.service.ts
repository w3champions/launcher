import { environment } from '@/environment';

const { remote } = window.require("electron");
const { spawn } = window.require("child_process");
const path = require('path');

class FloWorkerService {
    public initialize(isWindows: boolean) {
        debugger
        const floExecutable = (isWindows || environment.isDev) ? 'flo-worker.exe' : 'flo-worker'

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

export const floWorkserService = new FloWorkerService();