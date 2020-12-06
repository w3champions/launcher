export interface RootState {
    isTest: boolean,
    isWindows: boolean,
    newsUrl: string,
    updateUrl: string,
    news: News[],
    blizzardKey: string,
    w3cToken: string
}

export interface News {
    date: string,
    message: string,
}
