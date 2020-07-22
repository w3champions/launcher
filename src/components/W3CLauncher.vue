<template>
  <div>
    <button @click="tryStartWc3">Start w3c!</button>
    <button @click="repairW3c">Repait w3 champions!</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const Store = window.require('electron-store');
const store = new Store();
const { remote } = window.require('electron')
const https = window.require('https');
const fs = window.require('fs');
const AdmZip = window.require('adm-zip');

@Component
export default class W3CLauncher extends Vue {
  private wc3PathKey = "wc3PathKey";
  private wc3MapKey = "wc3MapKey";
  private currentVersionKey = "currentVersionKey";

  public async tryStartWc3() {
    const success = await this.updateIfNeeded();
    if (!success) return;
    this.startWc3();
  }

  public async repairW3c() {
    store.set(this.wc3PathKey, "");
    store.set(this.wc3MapKey, "");
    store.set(this.currentVersionKey, "");
    await this.updateIfNeeded();
  }

  private async updateIfNeeded() {
    const newVersion = await this.needsUpdate();
    if (!newVersion) {
      return true;
    }

    // TODO ask for root elevation

    const w3path = await this.getFolderFromUserIfNeverStarted(
            this.wc3PathKey,
            this.getdefaultPathWc3(),
            'Warcraft III not found',
            'Warcraft III folder not found, please locate it manually')

    if (!w3path) return false;

    const w3mapPath = await this.getFolderFromUserIfNeverStarted(
            this.wc3MapKey,
            await this.getdefaultPathMap(),
            'Mapfolder not found',
            'The mapfolder of Warcraft III was not found, please locate it manually')


    if (!w3mapPath) return false;

    await this.downloadAndWriteFile("maps", w3mapPath);
    await this.downloadAndWriteFile("webui", w3path);

    // TODO give root elevation back

    store.set(this.currentVersionKey, newVersion);

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
    const currentVersion = store.get(this.currentVersionKey);
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

    let path = store.get(storageKey);
    if (!path) {
      const path = await this.openDialogForUserFolderSelction(header, message);
      if (!path) return false;
      store.set(storageKey, path);
      return path
    }

    return path;
  }

  private async getdefaultPathMap() {
    if (this.isWindows()) {
      return ""
    }

    return "";
  }

  private getdefaultPathWc3() {
    if (this.isWindows()) {
      if (fs.existsSync("C:\\Program Files (x86)\\Warcraft III\\_retail_")) {
        return "C:\\Program Files (x86)\\Warcraft III\\_retail_"
      }
      return "C:\\Program Files (x86)\\Warcraft III"
    }

    return "";
  }

  private isWindows() {
    return false;
  }
}
</script>
