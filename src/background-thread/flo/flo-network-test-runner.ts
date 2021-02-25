import dgram from 'dgram';
import { IFloNetworkTest, IFloNodeNetworkInfo } from '@/types/flo-types';
import { FloNodeNetworkInfoWrapper } from './flo-node-network-wrapper';

export class FloNetworkTestRunner {
    private readonly floNodeNetworkInfo: IFloNodeNetworkInfo[] = [];
    private readonly floNodeNetworkInfoWrapper: FloNodeNetworkInfoWrapper[] = [];

    private isComplete = false;

    constructor(floNodeNetworkInfo: IFloNodeNetworkInfo[]) {
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