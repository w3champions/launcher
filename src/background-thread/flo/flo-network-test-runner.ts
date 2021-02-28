import { EventEmitter } from 'events';
import dgram from 'dgram';
import { IFloNetworkTest, IFloNodeNetworkInfo } from '@/types/flo-types';
import { FloNodeNetworkInfoWrapper } from './flo-node-network-wrapper';
import { ENodeNetworkTesterEvents } from './node-network-tester';

export class FloNetworkTestRunner extends EventEmitter {
    private readonly floNodeNetworkInfo: IFloNodeNetworkInfo[] = [];
    private readonly floNodeNetworkInfoWrapper: FloNodeNetworkInfoWrapper[] = [];

    private isComplete = false;

    constructor(floNodeNetworkInfo: IFloNodeNetworkInfo[]) {
      super();
      this.floNodeNetworkInfo = floNodeNetworkInfo;
    }

    public async run(numberOfPings: number) {
      this.isComplete = false;
      const socket = dgram.createSocket("udp4");

      socket.on("error", (err) => {
       console.log(err);
      });

      const promises: Promise<void>[] = [];
      for (const nodeNetworkInfo of this.floNodeNetworkInfo) {
        const floNodeNetworkInfoWrapper = new FloNodeNetworkInfoWrapper(nodeNetworkInfo, numberOfPings, socket);
        this.floNodeNetworkInfoWrapper.push(floNodeNetworkInfoWrapper);
        promises.push(... floNodeNetworkInfoWrapper.testNodeNetwork());
      }

      const firstNetworkWrapper = this.floNodeNetworkInfoWrapper[0];
      if (firstNetworkWrapper) {
        firstNetworkWrapper.on(ENodeNetworkTesterEvents.Progress, (progressPerc: number) => {
          this.emit(ENodeNetworkTesterEvents.Progress, progressPerc);
        });
      }

      await Promise.allSettled(promises);
      this.isComplete = true;
      socket.close();

      const result: IFloNetworkTest = {
        duration: numberOfPings,
        isComplete: this.isComplete,
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