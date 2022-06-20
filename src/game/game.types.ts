import { ILauncherGameMessage } from './ingame-bridge';

export enum EGateway {
    PTR = 9,
    America = 10,
    Europe = 20,
    Asia = 30
}

export interface ICurrentPlayer {
    battleTag: string;
    toonName: string;
    gateway: EGateway;
    gatewayPing: number;
    country?: string;
}

export interface IPlayerInstance extends WebSocket {
    player: ICurrentPlayer;
    sendMessage: (message: ILauncherGameMessage) => void;
    isDisconnected(): boolean;
}

export interface IDownloadMapData {
    mapFile: string;
    basePath: string;
}

export interface IDownloadMapProgressData {
    mapFile: string;
    progressPercent: number;
}
