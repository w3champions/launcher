const Store = window.require("electron-store");

export class AuthenticationService {
    private store = new Store();

    private w3cAuthenticationCode = "w3cAuthenticationCode";

    public saveAuthToken(token: string) {
        this.store.set(this.w3cAuthenticationCode, token);
    }

    public loadAuthToken() {
        return this.store.get(this.w3cAuthenticationCode) ?? '';
    }
}
