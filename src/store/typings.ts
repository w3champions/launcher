export interface RootState {
    isTest: boolean,
    news: News[]
}

export interface News {
    date: string,
    message: string,
}

