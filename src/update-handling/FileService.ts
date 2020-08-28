import {WindowsLauncher} from "@/update-handling/WindowsLauncher";
import {MacLauncher} from "@/update-handling/MacLauncher";
import logger from "@/logger";

const os = window.require('os');
const fs = window.require('fs');
const sudo = window.require("sudo-prompt");
const { remote } = window.require("electron");
const ncp = window.require('ncp').ncp;
const Store = window.require("electron-store");

declare const __static: string;

export class FileService {
    public updateStrategy = this.isWindows() ? new WindowsLauncher() : new MacLauncher();
    private keyValueStore = new Store();

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

    public sudoCopyFromTo(from: string, to: string){
        const copyCommand = this.updateStrategy.getCopyCommand(from, to);

        sudo.exec(copyCommand, {
            name: 'Warcraft 3 Champions',
        }, (err: Error) => {
            if (err) {
                logger.error(err)
            }
        });
    }

    public loadColor(oldColor: string) {
        return this.keyValueStore.get(oldColor);
    }

    public saveColor(oldColor: string, newColor: string) {
        return this.keyValueStore.set(oldColor, newColor);
    }

    public switchColor(oldColor: string, newColor: string, textureLocation: string) {
        this.copyFile(`${__static}/replaceabletextures/teamcolor/teamcolor${newColor}.blp`, `${textureLocation}/replaceabletextures/teamcolor/teamcolor${oldColor}.blp`);
        this.copyFile(`${__static}/replaceabletextures/teamglow/teamglow${newColor}.blp`, `${textureLocation}/replaceabletextures/teamglow/teamglow${oldColor}.blp`);

        logger.info(`copy ${newColor} to ${oldColor}`);
    }

    public resetTeamColorFiles(textureLocation: string) {
        this.copyFile(`${__static}/replaceabletextures`,`${textureLocation}/replaceabletextures`);
        logger.info('reset textures!');
    }

    private copyFile(from: string, to:string) {
        try {
            logger.info(`Copy from: ${from} to: ${to}`);
            ncp(from, to, (err: Error) => {
                if (err) {
                    logger.error(err);
                }
            });
        } catch (e) {
            logger.info("Copy with sudo now")
            this.sudoCopyFromTo(from, to);
        }
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
                this.writeArrayToFile(settingsFile, content);
            } catch (e) {
                const tempSettingsFile = `${remote.app.getPath("appData")}/w3champions/War3Preferences.txt`;
                this.writeArrayToFile(tempSettingsFile, content);
                this.sudoCopyFromTo(tempSettingsFile, settingsFile);
            }

        }
    }

    private writeArrayToFile(path: string, content: []) {
        const file = fs.createWriteStream(path, 'utf8');
        content.forEach((v: string) => {
            file.write(v + '\n');
        });
        file.end();
    }
}
