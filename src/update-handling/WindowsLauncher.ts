import {LauncherStrategy} from "@/update-handling/LauncherStrategy";
import logger from "@/logger";

const { exec, spawn } = window.require("child_process");
const fs = window.require("fs");
const { remote } = window.require("electron");

export class WindowsLauncher extends LauncherStrategy {
    getWar3PreferencesFile(): string {
        const documentPath = remote.app.getPath("documents");
        return `${documentPath}\\Warcraft III\\War3Preferences.txt`;
    }

    turnOnLocalFiles(): void {
        exec("reg add \"HKEY_CURRENT_USER\\Software\\Blizzard Entertainment\\Warcraft III\" /v \"Allow Local Files\" /t REG_DWORD /d 1 /f", function(err: Error) {
            if (err) {
                logger.error(err);
            }
        });
    }

    getDefaultPathWc3(): string {
        if (fs.existsSync("C:\\Program Files (x86)\\Warcraft III\\_retail_")) {
            return "C:\\Program Files (x86)\\Warcraft III\\_retail_";
        }
        return "C:\\Program Files (x86)\\Warcraft III";
    }

    getDefaultPathMap(): string {
        const documentPath = remote.app.getPath("documents");
        try {
            if (fs.existsSync(`${documentPath}\\Warcraft III\\_retail_`)
                && !fs.existsSync(`${documentPath}\\Warcraft III\\_retail_\\Maps`)) {
                fs.mkdirSync(`${documentPath}\\Warcraft III\\_retail_\\Maps`);
            } else if (fs.existsSync(`${documentPath}\\Warcraft III`)
                && !fs.existsSync(`${documentPath}\\Warcraft III\\Maps`)) {
                fs.mkdirSync(`${documentPath}\\Warcraft III\\Maps`);
            }
        } catch (e) {
            logger.error(e)
        }

        return fs.existsSync(`${documentPath}\\Warcraft III\\_retail_\\Maps`)
            ? `${documentPath}\\Warcraft III\\_retail_\\Maps`
            : `${documentPath}\\Warcraft III\\Maps`;
    }

    getDefaultBnetPath(): string {
        return "C:\\Program Files (x86)\\Battle.net";
    }

    startWc3Process(bnetPath: string): void {
        const bnetPathWithExe = `${bnetPath}\\${this.getDefaultBnetPathExecutable()}`;
        const ls = spawn(bnetPathWithExe, ['--exec="launch W3"'], {
            detached: true,
            windowsVerbatimArguments: true,
            stdio: 'ignore',
        });
        ls.unref();
    }

    getCopyCommand(from: string, to: string) {
        return `Xcopy "${from}" "${to}" /E /I`
    }

    getDefaultBnetPathExecutable(): string {
        return "Battle.net.exe";
    }
}
