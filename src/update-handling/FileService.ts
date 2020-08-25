import {WindowsLauncher} from "@/update-handling/WindowsLauncher";
import {MacLauncher} from "@/update-handling/MacLauncher";

const os = window.require('os');
const fs = window.require('fs');
const { remote } = window.require("electron");

export class FileService {
    public updateStrategy = this.isWindows() ? new WindowsLauncher() : new MacLauncher();

    public isWindows() {
        return os.platform() === "win32";
    }

    loadIsTeamColorsEnabled(): boolean {
        const settingsFile = this.updateStrategy.getWar3PreferencesFile();
        if (fs.existsSync(settingsFile)){
            const content = fs.readFileSync(settingsFile, 'utf8').toString().split("\n");
            const allyFilterSetting = content.find((l: string) => l.startsWith("allyFilter="));
            return (allyFilterSetting === "allyFilter=2")
        }

        return false;
    }

    saveIsTeamColorsEnabled(value: boolean) {
        const settingsFile = this.updateStrategy.getWar3PreferencesFile();
        if (fs.existsSync(settingsFile)) {
            const content = fs.readFileSync(settingsFile, 'utf8').toString().split("\n");
            const index1 = content.indexOf("allyFilter=0");
            const index2 = content.indexOf("allyFilter=1");
            const index3 = content.indexOf("allyFilter=2");
            content[index1 + index2 + index3 + 2] = `allyFilter=${value ? "2" : "0"}`;
            try {
                const file = fs.createWriteStream(settingsFile, 'utf8');
                content.forEach((v: string) => {
                    file.write(v + '\n');
                });
                file.end();
            } catch (e) {
                console.warn("Turning on Ally Filter failed")
            }

        }
    }
}
