import { EventEmitter } from 'events';
import dgram from 'dgram';
import { IFloNodeNetworkInfo, IFloNodeProxy } from '@/types/flo-types';
import { NodeNetworkTester, ENodeNetworkTesterEvents } from './node-network-tester';

export interface IPingData {
  seq: number;
  ping: number;
}

class FloNodeNetworkInfoWrapper {
  private readonly networkTester: NodeNetworkTester;
  private readonly proxyNetworkTesters: FloNodeProxyWrapper[];

  constructor(public nodeNetworkInfo: IFloNodeNetworkInfo, nPings: number, socket: dgram.Socket) {
    this.networkTester = new NodeNetworkTester(nodeNetworkInfo, nPings, socket);

    this.proxyNetworkTesters = nodeNetworkInfo.proxies.map(x => {
      return new FloNodeProxyWrapper(x , nPings, socket);
    });
  }

  testNodeNetwork() {
    const promises: Promise<void>[] = [];
    const nodePromise = new Promise<void>(res => {
      this.networkTester.on(ENodeNetworkTesterEvents.Complete, () => {
        res();
      });

      this.networkTester.ping();
    });

    promises.push(nodePromise);

    for (const proxyTester of this.proxyNetworkTesters) {
      promises.push(proxyTester.testProxyNetwork());
    }

    return promises;
  }

  printResults() {
    console.log(`${this.networkTester.id} -> avg: ${this.networkTester.avgPing}, loss: ${this.networkTester.lossRate}`);

    for (const proxyTester of this.proxyNetworkTesters) {
      proxyTester.printResult();
    }
  }
}

class FloNodeProxyWrapper {
  private readonly networkTester: NodeNetworkTester;

  constructor(public nodeNetworkInfo: IFloNodeProxy, nPings: number, socket: dgram.Socket) {
    this.networkTester = new NodeNetworkTester(nodeNetworkInfo, nPings, socket);
  }

  testProxyNetwork() {
    const promise = new Promise<void>(res => {
      this.networkTester.on(ENodeNetworkTesterEvents.Complete, () => {
        res();
      });

      this.networkTester.ping();
    });
    return promise;
  }

  printResult() {
    console.log(`${this.networkTester.id} -> avg: ${this.networkTester.avgPing}, loss: ${this.networkTester.lossRate}`);
  }
}

export class FloNetworkTest {
    private readonly floNodeNetworkInfo: IFloNodeNetworkInfo[] = [];
    private readonly floNodeNetworkInfoWrapper: FloNodeNetworkInfoWrapper[] = [];

    constructor(floNodeNetworkInfo: IFloNodeNetworkInfo[]) {
      this.floNodeNetworkInfo = floNodeNetworkInfo;
    }

    public async run(numberOfPings: number) {
      debugger
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
      console.log('closing ping socket');
      socket.close();
    }

    public printResults() {
      for (const nodeNetworkWrapper of this.floNodeNetworkInfoWrapper) {
        nodeNetworkWrapper.printResults();
      }
    }
}