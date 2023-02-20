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
    updateUrl: "https://update-service.w3c.gg/",
    newsUrl: "https://statistic-service.w3c.gg/",
    identificationUrl: "https://identification-service.w3c.gg/",
    identificationPublicKey: IDENTIFICATION_PUBLIC_KEY_PROD,
    floControllerHost: "flo-controller.w3c.gg",
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
        this.window?.webContents.send('reload-flo-workers');
      }
      catch(e) {
        console.log(e);
      }
    });

    
    ipcMain.handle('reload-flo-workers', async () => {
        this.window?.webContents.send('reload-flo-workers');
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

export const endpointService = new EndpointService();
