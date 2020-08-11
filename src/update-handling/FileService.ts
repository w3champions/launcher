import {WindowsLauncher} from "@/update-handling/WindowsLauncher";
import {MacLauncher} from "@/update-handling/MacLauncher";

const os = window.require('os');

export class FileService {
    public updateStrategy = this.isWindows() ? new WindowsLauncher() : new MacLauncher();

    private isWindows() {
        return os.platform() === "win32";
    }
}
