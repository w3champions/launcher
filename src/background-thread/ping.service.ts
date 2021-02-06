import dgram from 'dgram';
const MAX_UINT16 = 0xffff;

class PingService {
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
      
      public async ping(port: number, addr: string, n: number) {
        const TIMEOUT = 10 * 1000;
        const socket = dgram.createSocket("udp4");
        const baseTime = Date.now();
        const seq = Math.floor(Math.random() * (MAX_UINT16 - n));
        const endSeq = seq + n - 1;
        const buf = Buffer.alloc(4);
        let timer: NodeJS.Timeout
      
        const promise = new Promise((resolve, reject) => {
          let done = false;
          const resultMap = new Map<number, number>();
      
          setImmediate(async () => {
            try {
              for (let i = 0; i < n; i++) {
                console.log(`ping ${i}`);
                await this.sendPing(
                  socket,
                  buf,
                  port,
                  addr,
                  seq + i,
                  Date.now() - baseTime
                );
                await this.sleep(1000);
              }
            } catch (e) {
              done = true;
              reject(e)
            }
          });
      
          socket.on("message", (message: any, remote: any) => {
            debugger
            if (done) {
              return;
            }
      
            try {
              const { seq, timestamp } = this.parsePong(message);
              const ping = Date.now() - baseTime - timestamp;
              console.log("pong:", seq, ping);
              resultMap.set(seq, ping);
              if (seq === endSeq) {
                done = true;
                const pings = Array.from(resultMap.values());
                resolve({
                  pings,
                  lossRate: (n - pings.length) / n,
                });
              }
            } catch (e) {
              done = true;
              reject(e);
            }
          });
      
          socket.on("error", (err: any) => {
            if (done) {
              return;
            }
            done = true;
            reject(err);
          });
      
          timer = setTimeout(() => {
            if (done) {
              return;
            }
      
            console.log('timeout')
            done = true;
            const pings = Array.from(resultMap.values());
            resolve({
              pings,
              lossRate: (n - pings.length) / n,
            });
          }, TIMEOUT);
        });
      
        return promise.finally(() => {
          socket.close()
          clearTimeout(timer)
        });
      }
}

export const pingService = new PingService();