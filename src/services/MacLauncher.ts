import {LauncherStrategy} from "@/services/LauncherStrategy";
const { exec } = window.require("child_process");

export class MacLauncher extends LauncherStrategy {
    turnOnLocalFiles(): void {
        exec("defaults write \"com.blizzard.Warcraft III\" \"Allow Local Files\" -int 1", function(err: Error) {
            if (err) {
                throw err;
            }
        });
    }

    getDefaultPathWc3(): string {
        return "";
    }

    getDefaultPathMap(): string {
        return ""
    }

    getDefaultBnetPath(): string {
        return "";
    }

    getBnetExecutable(): string {
        return "Battle.app";
    }
}
