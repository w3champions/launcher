import { EPlayerGameStatus, ICurrentGameInfo } from "@/flo-integration/flo-worker-messages";

export interface RootState {
    isTest: boolean,
    isChinaProxyEnabled: boolean,
    isWindows: boolean,
    newsUrl: string,
    updateUrl: string,
    selectedLoginGateway: LoginGW,
    identificationUrl: string,
    identificationPublicKey: string,
    news: News[],
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