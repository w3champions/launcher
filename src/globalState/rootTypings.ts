export interface RootState {
    isTest: boolean,
    isWindows: boolean,
    newsUrl: string,
    updateUrl: string,
    identificationUrl: string,
    news: News[],
    w3cToken: W3cToken | null
}

export interface News {
    date: string,
    message: string,
}

export type W3cToken = {
    token: string;
    battleTag: string;
    name: string;
    isAdmin: boolean;
};
