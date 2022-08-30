import logger from "@/logger";

interface FloStatsResponse<T> {
    data: T;
    errors: {
        message: string;
    }[]
}

interface CreateObserverTokenResponse {
    createObserverToken: {
        token: string
    }
}

export class FloStatsService {
    private _floStatsUrl = 'https://stats.w3flo.com';

    public async getWatchGameToken(gameId: number) {
        const payload = {
            query:`mutation {\n  createObserverToken(gameId: ${gameId}) {\n    token\n  }\n}\n`
        };

        let token: string = '';
        try {
            const response = await fetch(this._floStatsUrl, {method: 'POST', mode: 'no-cors', body: JSON.stringify(payload)});
            const responseJson = await response.json() as FloStatsResponse<CreateObserverTokenResponse>;

            if (responseJson.errors?.length > 0) {
                throw new Error(responseJson.errors.join(', '));
            }

            token = responseJson?.data?.createObserverToken?.token;
        }
        catch(e: any){
            logger.error(`Unable to fetch watch game token: ${e.message}`);
            logger.error(e);
        }
        return token;
    }
}

export const floStatsService = new FloStatsService();