import {LauncherStrategy} from "@/update-handling/LauncherStrategy";
import logger from "@/logger";

const { exec } = window.require("child_process");
const { remote } = window.require("electron");
const fs = window.require("fs");

export class MacLauncher extends LauncherStrategy {
    getWar3PreferencesFile(): string {
        const documentPath = remote.app.getPath("appData");
        return `${documentPath}\\Warcraft III\\War3Preferences.txt`;
    }

    getWar3HotkeyFile(): string {
        const documentPath = remote.app.getPath("appData");
        return `${documentPath}\\Blizzard\\Warcraft III\\CustomKeyBindings\\CustomKeys.txt`;
    }

    turnOnLocalFiles(): void {
        exec("defaults write \"com.blizzard.Warcraft III\" \"Allow Local Files\" -int 1", function(err: Error) {
            if (err) {
                logger.error(err);
            }
        });
    }

    getDefaultPathWc3(): string {
        return "/Applications/Warcraft III";
    }

    getDefaultPathMap(): string {
        const libPath = remote.app.getPath("appData");
        try {
            if (fs.existsSync(`${libPath}/Blizzard/Warcraft III`)
                && !fs.existsSync(`${libPath}/Blizzard/Warcraft III/Maps`)) {
                fs.mkdirSync(`${libPath}/Blizzard/Warcraft III/Maps`);
            }
        } catch (e) {
            logger.error(e)
        }

        return `${libPath}/Blizzard/Warcraft III/Maps`
    }

    getDefaultBnetPath(): string {
        return "/Applications/Battle.net.app";
    }

    startWc3Process(bnetPath: string): void {
        exec(`${bnetPath}/${this.getDefaultBnetPathExecutable()} --exec="launch W3"`);
    }

    getCopyCommand(from: string, to: string) {
        return `cp -R '${from}/' '${to}' && chmod -R +rwX '${to}'`
    }

    getDefaultBnetPathExecutable(): string {
        return "Contents/MacOS/Battle.net";
    }

    getDefaultWc3Executable(): string {
        return "Warcraft III Launcher.app";
    }

    getBattleNetAgentPath(): string {
        return '/Users/Shared/Battle.net/Agent';
    }

    getBnetPathFromAgentLogs(): string {
        const bnetPath = this.getPathFromAgentLogs(/"([^'"]*\/[^'"]*Battle.net.app)"/);

        if (bnetPath) {
            return bnetPath.replace('/Battle.net.app', '');
        }

        return '';
    }

    getWc3PathFromAgentLogs(): string {
        const wc3Retail = this.getPathFromAgentLogs(/"([^'"]*\/[^"']*_retail_[^"']*Warcraft III.app)"/);

        if (wc3Retail) {
            return wc3Retail.replace('/_retail_/x86_64/Warcraft III.app', '');
        }

        const wc3NoRetail = this.getPathFromAgentLogs(/"([^'"]*\/[^"']*Warcraft III.app)"/);

        if (wc3NoRetail) {
            return wc3NoRetail.replace('/Warcraft III.app', '');
        }

        return '';
    }
}
