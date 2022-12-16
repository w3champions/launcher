import { IFloNodeProxy } from "@/types/flo-types";

export interface IFloWorkerStartupData {
    port: number;
    version: string;
}

export interface IFloPing {
    min: number;
    max: number;
    avg: number;
    current: number;
    loss_rate: number;
}

export interface IFloNode {
    id: string;
    name: string;
    location: string;
    country_id: string;
    ping: IFloPing;
}

export interface IFloNodeOverride {
    node_id: number;
    address: string;
}

export interface IFloAuthData {
    token: string;
    nodeOverrides: IFloNodeProxy[];
}

export interface IFloWorkerInstanceSettings {
    floWorkerFolderPath: string;
    floWorkerExePath: string;
    wc3FolderPath: string;
    floControllerHostUrl: string;
    ptr: boolean;
}

export interface IFloWatchGameData {
    floGameId: number;
}