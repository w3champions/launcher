export interface RootState {
    isTest: boolean,
    isWindows: boolean,
    newsUrl: string,
    updateUrl: string,
    selectedLoginGateway: LoginGW,
    identificationUrl: string,
    identificationPublicKey: string,
    news: News[],
    w3cToken: W3cToken | null
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
