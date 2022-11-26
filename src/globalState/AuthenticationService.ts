import {LoginGW, W3cToken} from "@/globalState/rootTypings";

const Store = window.require("electron-store");
import store from "@/globalState/vuex-store";
import logger from "@/logger";
import jwt from 'jsonwebtoken';

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

    public async authorize(code: string, region: LoginGW): Promise<W3cToken | null> {
        const identificationUrl = store.state.selectedEndpoint?.identificationUrl
        logger.info(`get token from code ${identificationUrl}`)
        const url = `${identificationUrl}api/oauth/token?code=${code}&region=${region}&redirectUri=http://localhost:8080/login`;
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

    public getUserInfo(token: string): W3cToken | null {
        try {
            const verifiedToken = jwt.verify(token, store.state.selectedEndpoint!.identificationPublicKey) as W3cToken;
            logger.info(`verified token, user is: ${verifiedToken.battleTag}`);
            verifiedToken.jwt = token;
            return verifiedToken;
        } catch (error) {
            logger.warn(`failed to validate jwt ${error}`)
            return null;
        }
    }
}
