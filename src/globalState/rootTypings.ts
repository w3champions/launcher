export interface RootState {
    isTest: boolean,
    isWindows: boolean,
    newsUrl: string,
    updateUrl: string,
    selectedLoginGateway: string,
    identificationUrl: string,
    news: News[],
    w3cToken: W3cToken | null
}

export interface News {
    date: string,
    message: string,
}

export type W3cToken = {
    jwt: string;
    battleTag: string;
    name: string;
    isAdmin: boolean;
};
