import {W3cToken} from "@/globalState/rootTypings";

const Store = window.require("electron-store");
import store from "@/globalState/vuex-store";
import logger from "@/logger";

export class AuthenticationService {
    private store = new Store();

    private w3cAuthenticationCode = "W3ChampionsJWT";

    public saveAuthToken(token: W3cToken) {
        this.store.set(this.w3cAuthenticationCode, token);
    }

    public deleteAuthToken() {
        this.store.delete(this.w3cAuthenticationCode);
    }

    public loadAuthToken(): W3cToken | null {
        return this.store.get(this.w3cAuthenticationCode) ?? null;
    }

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
        const url = `${store.state.identificationUrl}api/oauth/user-info?jwt=${bearer}`;
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
