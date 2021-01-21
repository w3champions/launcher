import {W3cToken} from "@/globalState/rootTypings";

import store from "@/globalState/vuex-store";
import logger from "@/logger";

export class AuthenticationService {
    public async authorize(code: string): Promise<W3cToken | null> {
        logger.info(`get token from code ${store.state.identificationUrl}`)
        const url = `${store.state.identificationUrl}api/oauth/token?code=${code}&redirectUri=http://localhost:8080/login`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            return response.status !== 200 ? null : await response.json();
        }
        catch (e) {
            logger.error(e);
            return null;
        }
    }

    public async getProfile(bearer: string): Promise<W3cToken | null> {
        logger.info(`get profile from token ${store.state.identificationUrl}`)
        const url = `${store.state.identificationUrl}api/oauth/battleTag?bearer=${bearer}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            return response.status !== 200 ? null : await response.json();
        }
        catch (e) {
            logger.error(e);
            return null;
        }
    }
}
