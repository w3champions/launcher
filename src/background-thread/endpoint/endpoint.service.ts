import { BrowserWindow, ipcMain } from "electron";
import fs from 'fs'

export interface IEndpoint {
  id: string;
  updateUrl: string;
  newsUrl: string;
  identificationUrl: string;
  floControllerHost: string;
  overrideUpdateFileDownloadUrl?: string;
  overrideIngameJsUrl?: string,
}

const ENDPOINTS_PROD: IEndpoint[] = [
  {
    id: "Europe",
    updateUrl: "https://update-service.w3champions.com/",
    newsUrl: "https://statistic-service.w3champions.com/",
    identificationUrl: "https://identification-service.w3champions.com/",
    floControllerHost: "service.w3flo.com",
  },
  {
    id: "中国",
    updateUrl: "http://123.57.23.5:25053/",
    newsUrl: "http://123.57.23.5:25052/",
    identificationUrl: "http://123.57.23.5:25051/",
    floControllerHost: "ea2d46.pathx.ucloudgda.com",
    overrideUpdateFileDownloadUrl: "https://w3champions.oss-cn-shanghai.aliyuncs.com/update-service-content/",
    overrideIngameJsUrl: "https://w3champions.oss-cn-shanghai.aliyuncs.com/ingame/w3champions.js"
  },
];

const TEST_ENDPOINTS: IEndpoint[] = [
  {
    id: "PTR Europe",
    updateUrl: "https://update-service.test.w3champions.com/",
    newsUrl: "https://statistic-service.test.w3champions.com/",
    identificationUrl: "https://identification-service.test.w3champions.com/",
    floControllerHost: "157.90.1.251",
  }
]

export class EndpointService {
  private window: BrowserWindow | null = null

  constructor() {
    ipcMain.handle('w3c-select-endpoint', async (evt: unknown, isTest: boolean) => {
      try {
        const endpoint = await this.selectFastestEndpoint(isTest);
        this.window?.webContents.send('w3c-endpoint-selected', endpoint);
      }
      catch(e) {
        console.log(e);
      }
    });

    ipcMain.handle('w3c-write-webui', (evt: unknown, path, url) => {
      try {
        fs.writeFileSync(path, this.getWebUISrc(url))
      } catch(e) {
        console.log(e);
      }
    })
  }

  public setWindow(window: BrowserWindow) {
    this.window = window;
  }

  async selectFastestEndpoint(
    isTest: boolean
  ): Promise<IEndpoint> {
    let selected
    const endpoints = isTest ? TEST_ENDPOINTS : ENDPOINTS_PROD;
    selected = await Promise.any(
      endpoints.map(async (i) => {
        // await fetch(`${i.updateUrl}api/client-version`);
        return i;
      })
    );
    return selected;
  }

  private getWebUISrc(url: string) {
    return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Warcraft 3 UI</title>
            <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, minimal-ui" />
            <script>
                window.__DEBUG = new Boolean('').valueOf();
            </script>
        </head>
        <body>
            <div id="root"></div>
            <div id="portal"></div>
        
        <script>
          var logCalls = [];
          var w3cClientVersion = 1;
          console.origLog = console.log;
          console.log = (...args) => {
            logCalls.push(...args);
            console.origLog("log");
            console.origLog(...args);
          }
    
        </script>
            <script src="GlueManager.js"></script>
        <script src="${url}"></script>
        </body>
    </html>
    `
  }
}

export const endpontService = new EndpointService();
