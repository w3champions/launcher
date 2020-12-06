import {W3cToken} from "@/globalState/rootTypings";
import {IDENTIFICATION_URL_PROD} from "@/constants";

const Store = window.require("electron-store");

export class AuthenticationService {
    private store = new Store();

    private w3cAuthenticationCode = "w3cAuthenticationCode";

    public saveAuthToken(token: W3cToken) {
        this.store.set(this.w3cAuthenticationCode, token);
    }

    public loadAuthToken() {
        return this.store.get(this.w3cAuthenticationCode) ?? '';
    }

    public async authorize(code: string): Promise<W3cToken> {
        const url = `${IDENTIFICATION_URL_PROD}api/oauth/token?code=${code}&redirectUri=http://localhost:8080/login`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        return await response.json();
    }

    public async getProfile(bearer: string): Promise<W3cToken | null> {
        const url = `${IDENTIFICATION_URL_PROD}api/oauth/battleTag?bearer=${bearer}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        return response.status === 204 ? null : await response.json();
    }
}
