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
  private readonly callback: (value: void) => void

  readonly address: string;
  readonly port: number;
  readonly nPings: number;
  readonly baseTime: number;
  readonly seq: number;
  readonly endSeq: number;
  readonly pings: IPingData[];

  public isDone: boolean = false;

  get id() : string {
    return `${this.address}:${this.port}`;
  }

  get lossRate(): number {
    return (this.nPings - this.pings.length) / this.nPings;
  }

  constructor(address: string, port: number, nPings: number, callback: (value: void) => void) {
    this.address = address;
    this.port = port;
    this.baseTime = Date.now();
    this.nPings = nPings;
    this.callback = callback;
    this.pings = [];

    this.seq = Math.floor(Math.random() * (MAX_UINT16 - this.nPings));
    this.endSeq = this.seq + this.nPings - 1;
  }

  public pingReceived(seq: number, ping: number) {
    if (this.isDone) {
      return;
    }

    this.pings.push({ seq, ping });
    console.log(`${this.id} -> ${ping}`);

    if (this.endSeq == seq) {
      this.isDone = true;
    }

    if (this.isDone) {
      this.callback();
    }
  }

  public errorSendingPing() {
    this.isDone = true;
    this.callback();
  }

  public timeout() {
    console.log(`${this.id} -> Timeout`);

    this.isDone = true;
    this.callback();
  }
}

export class PingsRun extends EventEmitter {
    private readonly pingConfigs: IPingConfig[] = [];
    private readonly serverPingInfos: ServerPingInfo[] = [];

    constructor(pingConfigs: IPingConfig[]) {
      super();
      this.pingConfigs = pingConfigs;
    }

    public async run(numberOfPings: number) {
      const socket = dgram.createSocket("udp4");

      socket.on("error", (err) => {
       console.log(err);
      });
      const serverPingsMap = new Map<string, ServerPingInfo>();

      socket.on("message", (message, remote) => {
        const addressKey = `${remote.address}:${remote.port}`;
        const serverPingInfo = serverPingsMap.get(addressKey);

        if (!serverPingInfo || serverPingInfo.isDone) {
          return;
        }
  
        try {
          const { seq, timestamp } = this.parsePong(message);
          const ping = Date.now() - serverPingInfo.baseTime - timestamp;
          serverPingInfo.pingReceived(seq, ping);
        } catch (e) {
          console.log(`Error parsing pong.`);
        }
      });
      
      const promises: Promise<void>[] = [];
      for (const pingRequest of this.pingConfigs) {
        const promise = new Promise<void>(res => {
          const serverPingInfo = new ServerPingInfo(
            pingRequest.address,
            pingRequest.port,
            numberOfPings,
            res
          );
          serverPingsMap.set(serverPingInfo.id, serverPingInfo);
          this.ping(serverPingInfo, socket);
        });

        promises.push(promise);
      }

      await Promise.allSettled(promises);
      console.log('closing ping socket');
      socket.close();
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
      
      private sleep(t: number) {
        return new Promise((resolve) => setTimeout(resolve, t));
      }
      
      private async ping(serverPingInfo: ServerPingInfo, socket: dgram.Socket) {
        const TIMEOUT = 10 * 1000;

        const buf = Buffer.alloc(4);
        let timer: NodeJS.Timeout
      
        setImmediate(async () => {
          try {
            for (let i = 0; i < serverPingInfo.nPings; i++) {
              // console.log(`ping ${i}`);
              await this.sendPing(
                socket,
                buf,
                serverPingInfo.port,
                serverPingInfo.address,
                serverPingInfo.seq + i,
                Date.now() - serverPingInfo.baseTime
              );
              await this.sleep(1000);
            }
          } catch (e) {
            serverPingInfo.errorSendingPing();
          }
        });
    
        timer = setTimeout(() => {
          if (!serverPingInfo.isDone) {
            serverPingInfo.timeout();
          }
        }, TIMEOUT);
      }
}