import { EventEmitter } from 'events';
import dgram from 'dgram';
import { IFloNetworkTest, IFloNetworkTestRequest, IFloNodeNetworkInfo } from '@/types/flo-types';
import { FloNodeNetworkInfoWrapper } from './flo-node-network-wrapper';
import { ENodeNetworkTesterEvents } from './node-network-tester';
import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';

class FloNetworkTestService extends EventEmitter {
    private window?: BrowserWindow;

    constructor() {
      super();

      ipcMain.on('flo-network-test', async (ev: IpcMainEvent, networkTestRequest: IFloNetworkTestRequest) => {
        try {
          const testResult = await this.run(networkTestRequest);
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

    public async run(networkTestRequest: IFloNetworkTestRequest) {
      const socket = dgram.createSocket("udp4");

      socket.on("error", (err) => {
       console.log(err);
      });

      const floNodeNetworkInfoWrappers: FloNodeNetworkInfoWrapper[] = [];
      const promises: Promise<void>[] = [];
      for (const nodeNetworkInfo of networkTestRequest.nodes) {
        const floNodeNetworkInfoWrapper = new FloNodeNetworkInfoWrapper(nodeNetworkInfo, networkTestRequest.duration, socket);
        floNodeNetworkInfoWrappers.push(floNodeNetworkInfoWrapper);
        promises.push(... floNodeNetworkInfoWrapper.testNodeNetwork());
      }

      const firstNetworkWrapper = floNodeNetworkInfoWrappers[0];
      if (firstNetworkWrapper) {
        firstNetworkWrapper.on(ENodeNetworkTesterEvents.Progress, (progressPerc: number) => {
          this.window?.webContents.send('flo-network-test-progress', progressPerc.toFixed(0));
        });
      }

      this.window?.webContents.send('flo-network-test-start');

      await Promise.allSettled(promises);
      socket.close();

      const result: IFloNetworkTest = {
        duration: networkTestRequest.duration,
        nodesPingTests: floNodeNetworkInfoWrappers.map(x => x.getResult())
      };

      return result;
    }
}

export const floNetworkTestService = new FloNetworkTestService();