import { EventEmitter } from 'events';
import dgram from 'dgram';
import { IFloNodeNetworkInfo, IFloNodeNetworkTestResult } from "@/types/flo-types";
import { FloNodeProxyWrapper } from "./flo-node-proxy-wrapper";
import { ENodeNetworkTesterEvents, INodeConfig, NodeNetworkTester } from "./node-network-tester";

export class FloNodeNetworkInfoWrapper extends EventEmitter {
    private readonly networkTester: NodeNetworkTester;
    private readonly proxyNetworkTesters: FloNodeProxyWrapper[];
  
    constructor(public nodeNetworkInfo: IFloNodeNetworkInfo, nPings: number, socket: dgram.Socket) {
      super();

      const nodeInfo: INodeConfig = {
        nodeId: nodeNetworkInfo.id,
        address: nodeNetworkInfo.address,
        port: nodeNetworkInfo.port,
        isDns: false,
        isProxy: false,
      };
      
      this.networkTester = new NodeNetworkTester(nodeInfo, nPings, socket);
      this.networkTester.on(ENodeNetworkTesterEvents.Progress, (progressPerc) => {
        this.emit(ENodeNetworkTesterEvents.Progress, progressPerc);
      });
  
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
      console.log(`${this.networkTester.nodeInfo.nodeId} -> avg: ${this.networkTester.avgPing}, loss: ${this.networkTester.lossRate}`);
  
      for (const proxyTester of this.proxyNetworkTesters) {
        proxyTester.printResult();
      }
    }
  
    getResult(): IFloNodeNetworkTestResult {
      const result: IFloNodeNetworkTestResult = {
        nodeId: this.networkTester.nodeInfo.nodeId,
        avgPing: this.networkTester.avgPing,
        packetLoss: this.networkTester.lossRate,
        proxyResults: []
      };
  
      for (const proxyNetworkTester of this.proxyNetworkTesters) {
        result.proxyResults.push(proxyNetworkTester.getResult());
      }
  
      return result;
    }
  }