export interface RootState {
    isTest: boolean,
    isWindows: boolean,
    newsUrl: string,
    updateUrl: string,
    news: News[]
}

export interface News {
    date: string,
    message: string,
}
