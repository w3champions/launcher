import { EventEmitter } from 'events';
import dgram from 'dgram';
const MAX_UINT16 = 0xffff;

export interface IPingConfig {
  address: string;
  port: number;
}

export interface IPingData {
  seq: number;
  ping: number;
}

class ServerPingInfo {
  readonly baseTime: number;
  readonly seq: number;
  readonly endSeq: number;
  readonly pings: IPingData[];

  private pingTries = 0;
  private timeoutTimer?: NodeJS.Timeout;

  public isDone: boolean = false;

  get id() : string {
    return `${this.address}:${this.port}`;
  }

  get lossRate(): number {
    return (this.nPings - this.pings.length) / this.nPings;
  }

  get avgPing(): number {
    const sum = this.pings.map(x => x.ping).reduce((a, b) => a + b, 0);
    const avg = (sum / this.pings.length) || 0;
    return avg;
  }

  constructor(
    private address: string,
    private port: number, 
    private nPings: number, 
    private socket: dgram.Socket, 
    private callback: (value: void) => void) {

    this.baseTime = Date.now();
    this.pings = [];

    this.seq = Math.floor(Math.random() * (MAX_UINT16 - this.nPings));
    this.endSeq = this.seq + this.nPings - 1;

    this.subscribeToSocketEvents();
  }

  public async ping() {
    const TIMEOUT = 1.5 * 1000;

    const buf = Buffer.alloc(4);
  
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
            this.address,
            this.seq + i,
            Date.now() - this.baseTime
          );
          await this.sleep(1000);
        }
      } catch (e) {
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
    if (seq > MAX_UINT16 || timestamp > MAX_UINT16) {
      throw new Error("value overflow");
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

    this.pingTries++;

    this.pings.push({ seq, ping });
    console.log(`${this.id} -> ${ping}`);

    if (this.endSeq == seq) {
      this.isDone = true;
    }

    if (this.isDone) {
      this.callback();
    }
  }

  private errorSendingPing() {
    this.isDone = true;
    this.callback();
  }

  private timeout() {
    console.log(`${this.id} -> Timeout`);
    this.pingTries++;

    if (this.pingTries == this.nPings) {
      this.isDone = true;
      this.callback();
    }
  }

  private sleep(t: number) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }
}

export class PingsRun extends EventEmitter {
    private readonly pingConfigs: IPingConfig[] = [];
    private readonly serverPingInfos = new Map<string, ServerPingInfo>();

    constructor(pingConfigs: IPingConfig[]) {
      super();
      this.pingConfigs = pingConfigs;
    }

    public async run(numberOfPings: number) {
      const socket = dgram.createSocket("udp4");

      socket.on("error", (err) => {
       console.log(err);
      });

      const promises: Promise<void>[] = [];
      for (const pingRequest of this.pingConfigs) {
        const promise = new Promise<void>(res => {
          const serverPingInfo = new ServerPingInfo(
            pingRequest.address,
            pingRequest.port,
            numberOfPings,
            socket,
            res
          );
          this.serverPingInfos.set(serverPingInfo.id, serverPingInfo);
          serverPingInfo.ping();
        });

        promises.push(promise);
      }

      await Promise.allSettled(promises);
      console.log('closing ping socket');
      socket.close();
    }

    public printResults() {
      for (const serverPingInfo of this.serverPingInfos.values()) {
        console.log(`${serverPingInfo.id} -> avg: ${serverPingInfo.avgPing}, loss: ${serverPingInfo.lossRate}`);
      }
    }
}