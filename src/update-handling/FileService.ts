import {WindowsLauncher} from "@/update-handling/WindowsLauncher";
import {MacLauncher} from "@/update-handling/MacLauncher";
import logger from "@/logger";
import {RaceHotKey} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";

const os = window.require("os");
const fse = window.require("fs-extra");
const sudo = window.require("sudo-prompt");
const { remote } = window.require("electron");
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
        if (fse.existsSync(settingsFile)){
            const content = fse.readFileSync(settingsFile, 'utf8').toString().split("\n");
            const allyFilterSetting = content.find((l: string) => l.startsWith("allyFilter="));
            return (allyFilterSetting === "allyFilter=2")
        }

        return false;
    }

    async enableCustomHotkeys() {
        const settingsFile = this.updateStrategy.getWar3PreferencesFile();
        if (fse.existsSync(settingsFile)) {
            const content = fse.readFileSync(settingsFile, 'utf8').toString().split("\n");
            const index1 = content.indexOf("customkeys=0");
            const index2 = content.indexOf("customkeys=1");
            const index3 = content.indexOf("customkeys=2");
            content[index1 + index2 + index3 + 2] = `customkeys=1`;
            await this.writeArrayToFileForce(settingsFile, content, "War3Preferences.txt");
        }
    }

    async saveHotkeysToHotkeyFile(hotkeys: RaceHotKey[]) {
        const fileContent = [] as string[];
        hotkeys.forEach(h => {
            fileContent.push("[" + h.hotkeyCommand + "]");
            fileContent.push("Hotkey=" + h.hotKey);
            fileContent.push("Unhotkey=" + h.hotKey);

            if (h.isResearchAbility) {
                fileContent.push("Researchhotkey=" + h.hotKey);
            }

            h.additionalHotkeyIdentifiers?.forEach(additionalKey => {
                fileContent.push('\n');
                fileContent.push("[" + additionalKey + "]");
                fileContent.push("Hotkey=" + h.hotKey);
            })

            fileContent.push('\n');
        })

        await this.writeArrayToFileForce(this.updateStrategy.getWar3HotkeyFile(), fileContent, "CustomKeys.txt")

        logger.info("write hotkey file: " + this.updateStrategy.getWar3HotkeyFile());
        logger.info("keys: " + hotkeys.length);
    }

    public sudoCopyFromTo(from: string, to: string){
        const copyCommand = this.updateStrategy.getCopyCommand(from, to);

        logger.info("copy with: " + copyCommand);
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
            fse.copySync(from, to);
        } catch (e) {
            logger.info("Copy with sudo now")
            this.sudoCopyFromTo(from, to);
        }
    }

    async saveIsTeamColorsEnabled(value: boolean) {
        const settingsFile = this.updateStrategy.getWar3PreferencesFile();
        if (fse.existsSync(settingsFile)) {
            const content = fse.readFileSync(settingsFile, 'utf8').toString().split("\n");
            const index1 = content.indexOf("allyFilter=0");
            const index2 = content.indexOf("allyFilter=1");
            const index3 = content.indexOf("allyFilter=2");
            content[index1 + index2 + index3 + 2] = `allyFilter=${value ? "2" : "0"}`;
            await this.writeArrayToFileForce(settingsFile, content, "War3Preferences.txt");
        }
    }

    private async writeArrayToFileForce(path: string, content: string[], tempFileName: string) {
        try {
            await this.writeArrayToFile(path, content);
        } catch (e) {
            const tempSettingsFile = `${remote.app.getPath("appData")}/w3champions/${tempFileName}`;
            await this.writeArrayToFile(tempSettingsFile, content);
            this.sudoCopyFromTo(tempSettingsFile, path);
        }
    }

    private writeArrayToFile(path: string, content: string[]) {
        const file = fse.createWriteStream(path, 'utf8');
        content.forEach(async (v: string) => {
            await file.write(v + '\n');
        });
        file.end();
    }
}
