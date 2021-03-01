import dgram from 'dgram';
import { IFloNodeProxy, IFloNodeProxyNetworkTestResult } from "@/types/flo-types";
import { ENodeNetworkTesterEvents, INodeConfig, NodeNetworkTester } from "./node-network-tester";

export class FloNodeProxyWrapper {
    private readonly networkTester: NodeNetworkTester;
  
    constructor(public nodeNetworkInfo: IFloNodeProxy, nPings: number, socket: dgram.Socket) {
      const nodeInfo: INodeConfig = {
        nodeId: nodeNetworkInfo.nodeId,
        address: nodeNetworkInfo.address,
        port: nodeNetworkInfo.port,
        isDns: nodeNetworkInfo.isDns,
        isProxy: true,
        proxyId: nodeNetworkInfo.id
      };
  
      this.networkTester = new NodeNetworkTester(nodeInfo, nPings, socket);
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
      console.log(`   ${this.networkTester.nodeInfo.proxyId} -> avg: ${this.networkTester.avgPing}, loss: ${this.networkTester.lossRate}`);
    }
  
    getResult(): IFloNodeProxyNetworkTestResult {
      const result: IFloNodeProxyNetworkTestResult = {
        proxyId: this.networkTester.nodeInfo.proxyId as any,
        avgPing: this.networkTester.avgPing,
        packetLoss: this.networkTester.lossRate
      };
  
      return result;
    }
  }