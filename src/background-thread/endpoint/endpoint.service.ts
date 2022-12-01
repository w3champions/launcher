import { IDENTIFICATION_PUBLIC_KEY_PROD, IDENTIFICATION_PUBLIC_KEY_TEST } from "@/constants";
import { BrowserWindow, ipcMain } from "electron";
import fetch from 'electron-fetch'

export interface IEndpoint {
  id: string;
  updateUrl: string;
  newsUrl: string;
  identificationUrl: string;
  identificationPublicKey: string;
  floControllerHost: string;
  staticBaseUpdateFileUrl?: string;
  staticBaseReleaseUrl?: string;
}

const ENDPOINTS_PROD: IEndpoint[] = [
  {
    id: "Europe",
    updateUrl: "https://update-service.w3champions.com/",
    newsUrl: "https://statistic-service.w3champions.com/",
    identificationUrl: "https://identification-service.w3champions.com/",
    identificationPublicKey: IDENTIFICATION_PUBLIC_KEY_PROD,
    floControllerHost: "service.w3flo.com",
  },
  {
    id: "中国",
    updateUrl: "http://45.194.17.149:8084/",
    newsUrl: "http://45.194.17.149:8083/",
    identificationUrl: "http://45.194.17.149:8082/",
    identificationPublicKey: IDENTIFICATION_PUBLIC_KEY_PROD, //unused?
    floControllerHost: "bd5271.pathx.ucloudgda.com",
    staticBaseUpdateFileUrl: 'https://w3champions.oss-cn-shanghai.aliyuncs.com/update-service-content/',
    staticBaseReleaseUrl: 'https://w3champions.oss-cn-shanghai.aliyuncs.com/release/'
  },
];

const TEST_ENDPOINTS: IEndpoint[] = [
  {
    id: "PTR Europe",
    updateUrl: "https://update-service.test.w3champions.com/",
    newsUrl: "https://statistic-service.test.w3champions.com/",
    identificationUrl: "https://identification-service.test.w3champions.com/",
    identificationPublicKey: IDENTIFICATION_PUBLIC_KEY_TEST,
    floControllerHost: "157.90.1.251",
  }
]

export class EndpointService {
  private window: BrowserWindow | null = null

  constructor() {
    ipcMain.handle('w3c-select-endpoint', async (_evt: unknown, isTest: boolean) => {
      try {
        const endpoint = await this.selectFastestEndpoint(isTest);
        this.window?.webContents.send('w3c-endpoint-selected', endpoint);
      }
      catch(e) {
        console.log(e);
      }
    });
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
        await fetch(`${i.updateUrl}api/client-version`);
        return i;
      })
    );
    return selected;
  }
}

export const endpontService = new EndpointService();
