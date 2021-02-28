import { EventEmitter } from 'events';
import dgram from 'dgram';
import { IFloNetworkTest, IFloNodeNetworkInfo } from '@/types/flo-types';
import { FloNodeNetworkInfoWrapper } from './flo-node-network-wrapper';
import { ENodeNetworkTesterEvents } from './node-network-tester';
import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';

class FloNetworkTestService extends EventEmitter {
    private readonly floNodeNetworkInfoWrapper: FloNodeNetworkInfoWrapper[] = [];

    private window?: BrowserWindow;

    constructor() {
      super();

      ipcMain.on('flo-network-test', async (ev: IpcMainEvent, floNodeNetworkInfo: IFloNodeNetworkInfo[]) => {
        try {
          const testResult = await this.run(floNodeNetworkInfo, 50);
          this.window?.webContents.send('flo-network-test-result', testResult);
        }
        catch(e) {
          console.log(e);
        }
      });
    }

    public setWindow(window: BrowserWindow) {
      this.window = window;
    }

    public async run(floNodeNetworkInfo: IFloNodeNetworkInfo[], numberOfPings: number) {
      const socket = dgram.createSocket("udp4");

      socket.on("error", (err) => {
       console.log(err);
      });

      const promises: Promise<void>[] = [];
      for (const nodeNetworkInfo of floNodeNetworkInfo) {
        const floNodeNetworkInfoWrapper = new FloNodeNetworkInfoWrapper(nodeNetworkInfo, numberOfPings, socket);
        this.floNodeNetworkInfoWrapper.push(floNodeNetworkInfoWrapper);
        promises.push(... floNodeNetworkInfoWrapper.testNodeNetwork());
      }

      const firstNetworkWrapper = this.floNodeNetworkInfoWrapper[0];
      if (firstNetworkWrapper) {
        firstNetworkWrapper.on(ENodeNetworkTesterEvents.Progress, (progressPerc: number) => {
          this.window?.webContents.send('flo-network-test-progress', progressPerc);
        });
      }

      this.window?.webContents.send('flo-network-test-start');

      await Promise.allSettled(promises);
      socket.close();

      const result: IFloNetworkTest = {
        duration: numberOfPings,
        isComplete: true,
        nodesPingTests: this.floNodeNetworkInfoWrapper.map(x => x.getResult())
      };

      return result;
    }

    public printResults() {
      for (const nodeNetworkWrapper of this.floNodeNetworkInfoWrapper) {
        nodeNetworkWrapper.printResults();
      }
    }
}

export const floNetworkTestService = new FloNetworkTestService();