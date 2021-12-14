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

const TEST_ENDPOINT: IEndpoint = {
  id: "PTR Europe",
  updateUrl: "https://update-service.test.w3champions.com/",
  newsUrl: "https://statistic-service.test.w3champions.com/",
  identificationUrl: "https://identification-service.test.w3champions.com/",
  floControllerHost: "157.90.1.251",
}

export class EndpointService {
  private _selected: IEndpoint | null = null

  get selected() {
    if (!this._selected) {
      throw new Error(`Endpoint not selected.`);
    }
    return this._selected;
  }

  get isSelected() {
    return Boolean(this._selected)
  }

  public async selectFastestEndpoint(
    isTest: boolean
  ): Promise<IEndpoint> {
    if (isTest) {
      this._selected = TEST_ENDPOINT
    } else {
      this._selected = await Promise.any(
        ENDPOINTS_PROD.map(async (i) => {
          await fetch(`${i.updateUrl}api/client-version`);
          return i;
        })
      );
    }
    return this._selected;
  }

  public selectById(id: string) {
    this._selected = ENDPOINTS_PROD.find(e => e.id === id) || null
  }

  public getWebUISrc() {
    const { overrideIngameJsUrl: override_ingame_js_url } = this.selected
    const url = override_ingame_js_url || ''
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
        <script src="${url}/ingame/w3champions.js"></script>
        </body>
    </html>
    `
  }
}
