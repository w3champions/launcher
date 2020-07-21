<template>
  <div>
    <button @click="tryStartWc3">Start w3c!</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const storage = window.require('electron-storage');
const { remote } = window.require('electron')
const https = window.require('https');
const fs = window.require('fs');
const AdmZip = window.require('adm-zip');

@Component
export default class W3CLauncher extends Vue {
  private wc3PathKey = "wc3PathKey";
  private wc3MapKey = "wc3MapKey";
  private currentVersionKey = "currentVersionKey";

  private defaultPathWc3Windows = "C:\\Program Files (x86)\\Warcraft III";
  private defaultPathMapsWindows = "Warcraft III\\Maps";

  public tryStartWc3() {
    const success = this.updateIfNeeded();
    if (!success) return;
    this.startWc3();
  }

  private async updateIfNeeded() {
    const newVersion = await this.needsUpdate();
    if (!newVersion) {
      return true;
    }

    const w3path = await this.getFolderFromUserIfNeverStarted(
            this.wc3PathKey,
            this.defaultPathWc3Windows,
            'Warcraft III not found',
            'Warcraft III folder not found, please locate it manually')

    if (!w3path) return false;

    const w3mapPath = await this.getFolderFromUserIfNeverStarted(
            this.wc3MapKey,
            this.defaultPathMapsWindows,
            'Mapfolder not found',
            'The mapfolder of Warcraft III was not found, please locate it manually')


    if (!w3mapPath) return false;

    await this.downloadAndWriteFile("maps", w3mapPath);
    await this.downloadAndWriteFile("webui", w3path);

    await storage.set(this.currentVersionKey, newVersion);

    return true;
  }

  private async downloadAndWriteFile(fileName: string, to: string) {
    const tempFile = `temp_${fileName}.zip`;
    const file = fs.createWriteStream(tempFile);
    https.get(`https://update-service.test.w3champions.com/api/${fileName}`, function(response: any) {
      response.pipe(file).on('finish', async function() {
        file.close();
        const zip = new AdmZip(tempFile);
        zip.extractAllTo(to, true);
        fs.unlinkSync(tempFile)
      });
    });
  }

  private async needsUpdate() {
    const currentVersion = await storage.isPathExists(this.currentVersionKey)
            ? await storage.get(this.currentVersionKey)
            : "";
    const version = await (await fetch("https://update-service.test.w3champions.com/api/client-version")).json();
    if (version.version === currentVersion) {
      return null;
    }

    return version.version;
  }

  private async openDialogForUserFolderSelction(title: string, message: string) {
    const folderResult = await remote.dialog.showMessageBox(null, {
      title: title,
      message: message,
      buttons: ['Locate Folder', 'Cancel Update']
    })
    if (folderResult.response === 1) {
      return ""
    }
    const openDialogReturnValue = await remote.dialog.showOpenDialog({properties: ['openDirectory', 'multiSelections']});
    return openDialogReturnValue.filePaths[0];
  }

  private startWc3() {
    //tbd
  }

  private async getFolderFromUserIfNeverStarted(
          storageKey: string,
          defaultMapLocation: string,
          header: string,
          message: string) {
    if (fs.existsSync(defaultMapLocation)) return defaultMapLocation;

    let path = await storage.isPathExists(storageKey)
            ? await storage.get(storageKey)
            : "";
    if (!path) {
      const path = await this.openDialogForUserFolderSelction(header, message);
      if (!path) return false;
      await storage.set(storageKey, path);
      return path
    }

    return path;
  }
}
</script>
