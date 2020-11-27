const { remote } = window.require("electron");

class Environment {
    get isDev() {
        return remote.process.argv.includes('--dev');
    }
}

export const environment = new Environment();