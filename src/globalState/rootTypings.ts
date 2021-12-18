import type { IEndpoint } from "@/background-thread/endpoint/endpoint.service";
import { EPlayerGameStatus, ICurrentGameInfo } from "@/flo-integration/flo-worker-messages";

export interface RootState {
    isTest: boolean,
    selectedEndpoint: IEndpoint | null,
    isWindows: boolean,
    selectedLoginGateway: LoginGW,
    identificationPublicKey: string,
    news: News[],
    newsLoading: boolean,
    w3cToken: W3cToken | null,
    floStatus: FloStatus | null,
}

export interface News {
    date: string,
    message: string,
}

export interface W3cToken {
    jwt: string,
    battleTag: string,
    name: string,
    isAdmin: boolean
}

export enum LoginGW {
    none, eu, cn
}

export interface FloStatus {
    player_id: number,
    name: string,
    game: ICurrentGameInfo | null,
}
