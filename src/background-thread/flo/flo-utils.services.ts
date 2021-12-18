import { ipcMain, app } from 'electron';
import sudo from "sudo-prompt";
import path from 'path'

class FloUtilsService {
  private isDev = process.argv.includes('--dev');
  private isWindows = process.platform === 'win32'
  registerHandlers() {
    ipcMain.handle('flo-add-firewall-rule', async () => {
      if (!this.isWindows) {
        return
      }

      const path = this.getFloWorkerExecutablePath()
      console.log("flo worker: " + path);
      sudo.exec(`netsh firewall add allowedprogram "${path}" "FLO" ENABLE`, {
        name: 'Warcraft 3 Champions',
      }, (err?: Error) => {
          if (err) {
              console.log(err)
          }
      });
    });
  }

  getFloWorkerExecutablePath() {
    const floExecutable = this.isWindows ? 'flo-worker.exe' : 'flo-worker';
    let floWorkerFolderPath: string;
    if (this.isDev) {
        const appPath = app.getAppPath();
        let rootFolder = appPath.replace('\\dist_electron', '');
        rootFolder = rootFolder.replace('/dist_electron', '');
        floWorkerFolderPath =  path.join(rootFolder, `libs`);
    } else {
        floWorkerFolderPath = path.join(`${app.getAppPath()}.unpacked`);
    }
    return path.join(floWorkerFolderPath, floExecutable)
  }
}

export const floUtilsService = new FloUtilsService();