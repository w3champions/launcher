import {WindowsLauncher} from "@/update-handling/WindowsLauncher";
import {MacLauncher} from "@/update-handling/MacLauncher";
import logger from "@/logger";
import { Grid, RaceHotKey } from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import { AppStore } from "@/globalState/vuex-store";
import { LauncherStrategy } from "./LauncherStrategy";

const os = window.require("os");
const fse = window.require("fs-extra");
const sudo = window.require("sudo-prompt");
const { remote } = window.require("electron");
const Store = window.require("electron-store");

declare const __static: string;

export class FileService {
    public updateStrategy = {} as LauncherStrategy;
    private keyValueStore = new Store();

    public initialize(store: AppStore) {
        this.updateStrategy = this.isWindows() ? new WindowsLauncher(store) : new MacLauncher(store);
    }

    public isWindows() {
        return os.platform() === "win32";
    }

    public downloadMap(fileName: string, mapsPath: string,  onProgress?: (percentage: number) => void) {
        return this.updateStrategy.downloadMap(fileName, mapsPath, onProgress);
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

    async enableGridHotkeys(){
        const settingsFile = this.updateStrategy.getWar3PreferencesFile();
        if (fse.existsSync(settingsFile)) {
            const content = fse.readFileSync(settingsFile, 'utf8').toString().split("\n");
            const index1 = content.indexOf("customkeys=0");
            const index2 = content.indexOf("customkeys=1");
            const index3 = content.indexOf("customkeys=2");
            content[index1 + index2 + index3 + 2] = `customkeys=2`;
            await this.writeArrayToFileForce(settingsFile, content, "War3Preferences.txt");
        }
    }

    createBackupOfHotkeyFile() {
        const hotkeyFile = this.updateStrategy.getWar3HotkeyFile();
        const backupLocation = hotkeyFile.replace(".txt", "_BackupFromW3Champions.txt");

        if (!fse.existsSync(backupLocation)) {
            this.copyFile(hotkeyFile, backupLocation);
            logger.info(`Create Backup file on ${backupLocation}`)
        }
    }

    async importHotkeys() {
        const hotkeyFile = this.updateStrategy.getWar3HotkeyFile();
        if (fse.existsSync(hotkeyFile)) {
            const hotkeys = [] as RaceHotKey[]
            const content = fse.readFileSync(hotkeyFile, 'utf8').toString().split("\n");
            let currentHotkey = {} as RaceHotKey;
            content.forEach((l: string) => {
                const lowerCaseLine = l.toLowerCase()?.trim();
                if (lowerCaseLine.startsWith("[")) {
                    if ((currentHotkey.hotKey || currentHotkey.researchHotkey) && currentHotkey.hotkeyCommand) {
                        hotkeys.push(currentHotkey)
                    }

                    currentHotkey = {} as RaceHotKey;
                    const newCommand = lowerCaseLine.split("[")[1].split("]")[0];
                    if (newCommand) {
                        currentHotkey.hotkeyCommand = newCommand.toLowerCase();
                    }
                }

                if (lowerCaseLine.startsWith("hotkey=")) {
                    currentHotkey.hotKey = this.extractRightString(lowerCaseLine);
                }

                if (lowerCaseLine.startsWith("unhotkey=")) {
                    currentHotkey.unHotkey = this.extractRightString(lowerCaseLine);
                }

                if (lowerCaseLine.startsWith("researchhotkey=")) {
                    currentHotkey.researchHotkey = this.extractRightString(lowerCaseLine);
                }

                if (lowerCaseLine.startsWith("buttonpos=")) {
                    const positions = lowerCaseLine.split("=")[1].split(",");
                    if (positions.length === 2) {
                        currentHotkey.grid = new Grid(parseInt(positions[0]), parseInt(positions[1]))
                    }
                }

                if (lowerCaseLine.startsWith("researchbuttonpos=")) {
                    const positions = lowerCaseLine.split("=")[1].split(",");
                    if (positions.length === 2) {
                        currentHotkey.researchGrid = new Grid(parseInt(positions[0]), parseInt(positions[1]))
                    }
                }
            })

            if ((currentHotkey.hotKey || currentHotkey.researchHotkey) && currentHotkey.hotkeyCommand) {
                hotkeys.push(currentHotkey)
            }

            logger.info(`retrieved ${hotkeys.length} hotkeys from file`)
            return hotkeys
        }

        return [];
    }

    private extractRightString(l: string) {
        const hotkeyText = l.split("=")[1];
        if (hotkeyText === "27" || hotkeyText === "512") {
            return "27";
        } else {
            const newHotkey = hotkeyText[0];
            if (newHotkey) {
                return newHotkey.toUpperCase();
            }
        }

        return '';
    }

    async saveHotkeysToHotkeyFile(hotkeys: RaceHotKey[]) {
        const fileContent = [] as string[];
        hotkeys.forEach(h => {
            if (h.hotkeyName) {
                fileContent.push("// " + h.hotkeyName);
            }

            fileContent.push("[" + h.hotkeyCommand + "]");
            if (h.hotKey) {
                const hotKey = h.isStagedUpgrade ? `${h.hotKey},${h.hotKey},${h.hotKey}` : h.hotKey;
                fileContent.push("Hotkey=" + hotKey);
            }

            if (h.isUnhotkey && h.unHotkey) {
                fileContent.push("Unhotkey=" + h.unHotkey);
            }

            if (h.researchHotkey) {
                fileContent.push("Researchhotkey=" + h.researchHotkey);
            }

            if (h.researchGrid) {
                fileContent.push(`Researchbuttonpos=${h.researchGrid.x},${h.researchGrid.y}`);
            }

            if (h.grid) {
                fileContent.push(`Buttonpos=${h.grid.x},${h.grid.y}`);
                fileContent.push(`UnButtonpos=${h.grid.x},${h.grid.y}`);
            }

            h.additionalHotkeyIdentifiers?.forEach(additionalKey => {
                fileContent.push("[" + additionalKey + "]");
                fileContent.push("Hotkey=" + h.hotKey);
                if (h.unHotkey) {
                    fileContent.push("Unhotkey=" + h.unHotkey);
                }

                if (h.grid) {
                    fileContent.push(`Buttonpos=${h.grid.x},${h.grid.y}`);
                    fileContent.push(`UnButtonpos=${h.grid.x},${h.grid.y}`);
                }

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
        this.copyFile(`${__static}/wc3-assets/replaceabletextures/teamcolor/teamcolor${newColor}.blp`, `${textureLocation}/replaceabletextures/teamcolor/teamcolor${oldColor}.blp`);
        this.copyFile(`${__static}/wc3-assets/replaceabletextures/teamglow/teamglow${newColor}.blp`, `${textureLocation}/replaceabletextures/teamglow/teamglow${oldColor}.blp`);

        logger.info(`copy ${newColor} to ${oldColor}`);
    }

    public resetTeamColorFiles(textureLocation: string) {
        this.copyFile(`${__static}/wc3-assets/replaceabletextures`,`${textureLocation}/replaceabletextures`);
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
        logger.info("write to settings file: " + settingsFile)
        if (fse.existsSync(settingsFile)) {
            const content = fse.readFileSync(settingsFile, 'utf8').toString().split("\n");
            const index1 = content.indexOf("allyFilter=0");
            const index2 = content.indexOf("allyFilter=1");
            const index3 = content.indexOf("allyFilter=2");
            content[index1 + index2 + index3 + 2] = `allyFilter=${value ? "2" : "0"}`;
            await this.writeArrayToFileForce(settingsFile, content, "War3Preferences.txt");
            logger.info("set w3 team color preferences to " + value)
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
