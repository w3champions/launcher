import {LauncherStrategy} from "@/update-handling/LauncherStrategy";
const { exec } = window.require("child_process");
const { remote } = window.require("electron");
const fs = window.require("fs");

export class MacLauncher extends LauncherStrategy {
    turnOnLocalFiles(): void {
        exec("defaults write \"com.blizzard.Warcraft III\" \"Allow Local Files\" -int 1", function(err: Error) {
            if (err) {
                console.error(err);
            }
        });
    }

    getDefaultPathWc3(): string {
        return "Applications/Warcraft III";
    }

    getDefaultPathMap(): string {
        const libPath = remote.app.getPath("appData");
        try {
            if (fs.existsSync(`${libPath}/Blizzard/Warcraft III`)
                && !fs.existsSync(`${libPath}/Blizzard/Warcraft III/Maps`)) {
                fs.mkdirSync(`${libPath}/Blizzard/Warcraft III/Maps`);
            }
        } catch (e) {
            console.error(e)
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
        return `cp -R '${from}/' '${to}'`
    }

    getDefaultBnetPathExecutable(): string {
        return "Contents/MacOS/Battle.net";
    }
}
