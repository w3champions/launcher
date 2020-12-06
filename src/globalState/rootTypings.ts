export interface RootState {
    isTest: boolean,
    isWindows: boolean,
    newsUrl: string,
    updateUrl: string,
    identificationUrl: string,
    news: News[],
    blizzardKey: string,
    w3cToken: string,
    blizzardVerifiedBtag: string,
    isAdmin: boolean,
}

export interface News {
    date: string,
    message: string,
}

export type W3cToken = {
    token: string;
    battleTag: string;
    isAdmin: boolean;
};
