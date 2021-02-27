import { EventEmitter } from 'events';
import dgram from 'dgram';
import dns from 'dns';

const MAX_UINT16 = 0xffff;

export enum ENodeNetworkTesterEvents {
  Complete = 'Complete',
}

export interface IPingData {
  seq: number;
  ping: number;
}

export interface INodeConfig {
  nodeId: number;
  address: string;
  port: number;
  isDns: boolean;
  isProxy: boolean;
  proxyId?: string;
}

export class NodeNetworkTester extends EventEmitter{
    readonly baseTime: number;
    readonly seq: number;
    readonly pings: IPingData[];
  
    private readonly address: string;
    private readonly port: number;
  
    private resolvedIpAddress?: string;
    private timeoutTimer?: NodeJS.Timeout;
    private timeoutsCount = 0;
  
    public isDone: boolean = false;
  
    get id() : string {
      let address = this.address;

      if (this.nodeInfo.isDns) {
        address = this.resolvedIpAddress as any;
      }

      return `${address}:${this.port}`;
    }
  
    get lossRate(): number {
      return this.timeoutsCount / this.nPings;
    }
  
    get avgPing(): number {
      const sum = this.pings.map(x => x.ping).reduce((a, b) => a + b, 0);
      const avg = (sum / this.pings.length) || 0;
      return avg;
    }

    get hasDoneEnoughPings() {
      return (this.pings.length + this.timeoutsCount) == this.nPings;
    }
  
    constructor(public nodeInfo: INodeConfig,
      private nPings: number, 
      private socket: dgram.Socket) {
      super();

      this.address = nodeInfo.address;
      this.port = nodeInfo.port;
      this.baseTime = Date.now();
      this.pings = [];
  
      this.seq = Math.floor(Math.random() * (MAX_UINT16 - this.nPings));
  
      this.subscribeToSocketEvents();
    }
  
    public async ping() {
      const TIMEOUT = 1.5 * 1000;
  
      const buf = Buffer.alloc(4);

      let ipAddress = this.address;
      if (this.nodeInfo.isDns) {
        ipAddress = await this.resolveIpFromDns(this.address);
        this.resolvedIpAddress = ipAddress;
      }
    
      setImmediate(async () => {
        try {
          for (let i = 0; i < this.nPings; i++) {
            this.timeoutTimer = setTimeout(() => {
              this.timeout();
            }, TIMEOUT);
            await this.sendPing(
              this.socket,
              buf,
              this.port,
              ipAddress,
              this.seq + i,
              Date.now() - this.baseTime
            );
            await this.sleep(1000);
          }
        } catch (e) {
          console.log(e);
          this.errorSendingPing();
        }
      });
    }
  
    private parsePong(buf: Buffer) {
      if (buf.length != 4) {
        throw new Error("invalid buffer length");
      }
      const seq = buf.readUInt16BE(0);
      const timestamp = buf.readUInt16BE(2);
      return {
        seq,
        timestamp,
      };
    }
  
    private async sendPing(
      socket: dgram.Socket,
      buf: Buffer,
      port: number,
      addr: string,
      seq: number,
      timestamp: number
    ) {
      if (seq > MAX_UINT16) {
        throw new Error(`seq value overflow: ${seq}`);
      }
      else if (timestamp > MAX_UINT16) {
        throw new Error(`timestamp value overflow: ${timestamp}`);
      }
      buf.writeUInt16BE(seq, 0);
      buf.writeUInt16BE(timestamp, 2);
      return new Promise((resolve, reject) => {
        socket.send(buf.slice(0, 4), port, addr, (err: any) => {
          if (err) {
            return reject(err);
          }
          resolve(null);
        });
      });
    }
  
    private subscribeToSocketEvents() {
      this.socket.on("message", (message, remote) => {
        const addressKey = `${remote.address}:${remote.port}`;
  
        if (this.id != addressKey || this.isDone) {
          return;
        }
  
        try {
          const { seq, timestamp } = this.parsePong(message);
          const ping = Date.now() - this.baseTime - timestamp;
          this.pingReceived(seq, ping);
        } catch (e) {
          console.log(`Error parsing pong.`);
        }
      });
    }
  
    private pingReceived(seq: number, ping: number) {
      if (this.isDone) {
        return;
      }
  
      if (this.timeoutTimer) {
        clearTimeout(this.timeoutTimer);
      }
  
      this.pings.push({ seq, ping });
      console.log(`${this.id} -> ${ping}`);
  
      if (this.hasDoneEnoughPings) {
        this.complete();
      }
    }
  
    private errorSendingPing() {
      if (this.timeoutTimer) {
        clearTimeout(this.timeoutTimer);
      }

      this.complete();
    }

    private complete(){
      this.isDone = true;
      this.emit(ENodeNetworkTesterEvents.Complete);
    }
  
    private timeout() {
      console.log(`${this.id} -> Timeout`);
      this.timeoutsCount++;
      if (this.hasDoneEnoughPings) {
        this.complete();
      }
    }
  
    private sleep(t: number) {
      return new Promise((resolve) => setTimeout(resolve, t));
    }

    private resolveIpFromDns(dnsAddress: string) {
      const promise = new Promise<string>((res, rej) => {
        dns.lookup(dnsAddress, (err, ipAddress, family) => {
          res(ipAddress);
        });
      });

      return promise;
    }
  }