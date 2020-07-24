<template>
  <div class="background">
    <button @click="tryStartWc3" :disabled="isLoading" class="start-button">Start Warcraft 3 Champions!</button>
    <button @click="repairW3c" :disabled="isLoading" class="repair-button">Repair Warcraft 3 Champions</button>
    <div :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`">Updating W3C...</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const BASE_URL = process.env.IS_TEST ? 'https://update-service.test.w3champions.com/' : 'https://update-service.prod.test.w3champions.com/'
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
  public isLoading = false;

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
    this.isLoading = true;
    const newVersion = await this.needsUpdate();
    if (!newVersion) {
      this.isLoading = false;
      return true;
    }

    // TODO ask for root elevation

    let w3path = await this.getFolderFromUserIfNeverStarted(
            this.wc3PathKey,
            this.getDefaultPathWc3(),
            'Warcraft III not found',
            'Warcraft III folder not found, please locate it manually')
    if (fs.existsSync(`${w3path}/_retail_`)) {
      w3path = `${w3path}/_retail_`
    }

    if (!w3path) return false;

    const w3mapPath = await this.getFolderFromUserIfNeverStarted(
            this.wc3MapKey,
            await this.getDefaultPathMap(),
            'Mapfolder not found',
            'The mapfolder of Warcraft III was not found, please locate it manually')


    if (!w3mapPath) return false;

    await this.downloadAndWriteFile("maps", w3mapPath);
    await this.downloadAndWriteFile("webui", w3path);

    // TODO give root elevation back

    store.set(this.currentVersionKey, newVersion);

    this.isLoading = false;

    return true;
  }

  private async downloadAndWriteFile(fileName: string, to: string) {
    const tempFile = `temp_${fileName}.zip`;
    const file = fs.createWriteStream(tempFile);
    https.get(`${BASE_URL}api/${fileName}`, function(response: any) {
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
    const version = await (await fetch(`${BASE_URL}api/client-version`)).json();
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
          defaultLocation: string,
          header: string,
          message: string) {
    if (fs.existsSync(defaultLocation)) return defaultLocation;

    let path = store.get(storageKey);
    if (!path) {
      const path = await this.openDialogForUserFolderSelction(header, message);
      if (!path) return false;
      store.set(storageKey, path);
      return path
    }

    return path;
  }

  private async getDefaultPathMap() {
    const documentPath = remote.app.getPath('documents')
    return fs.existsSync(`${documentPath}\\Warcraft III\\_retail_\\Maps`)
            ? `${documentPath}\\Warcraft III\\_retail_\\Maps`
            :`${documentPath}\\Warcraft III\\Maps`
  }

  private getDefaultPathWc3() {
    if (this.isWindows()) {
      if (fs.existsSync("C:\\Program Files (x86)\\Warcraft III\\_retail_")) {
        return "C:\\Program Files (x86)\\Warcraft III\\_retail_"
      }
      return "C:\\Program Files (x86)\\Warcraft III"
    }

    return "";
  }

  private isWindows() {
    return (process.platform === "win32")
  }
}
</script>

<style scoped>
  .background {
    /*background: url('assets/bg.jpg');*/
    width: 960px;
    height: 529px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .start-button {
    cursor: pointer;
    line-height: 1;
    background-color: transparent;
    text-transform: uppercase;
    color: rgb(51, 38, 28);
    background-image: linear-gradient(rgba(255, 255, 0, 0.2) 50%, transparent 50%), linear-gradient(rgb(255, 209, 85), rgb(220, 166, 13));
    box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 0px 2px, rgba(236, 174, 6, 0.3) 0px 0px 40px 15px, rgba(255, 255, 255, 0.4) 0px 0px 0px 2px inset, rgba(255, 125, 19, 0.3) 0px 0px 20px 10px inset;
    text-shadow: rgb(51, 38, 28) 0px 0px;
    height: 76px;
    margin-bottom: 26px;
    font-size: 20px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    border-radius: 2px;
    background-repeat: no-repeat;
    outline: 0px;
    text-decoration: none;
    transition: filter 200ms ease 0s;
    padding: 0 45px;
  }

  .repair-button {
    cursor: pointer;
    line-height: 1;
    background-color: transparent;
    text-transform: uppercase;
    color: rgb(45, 45, 45);
    background-image: linear-gradient(rgba(88, 88, 88, 0.2) 50%, transparent 50%), linear-gradient(rgb(165, 165, 165), rgb(111, 111, 111));
    box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 0px 2px, rgba(226, 223, 221, 0.3) 0px 0px 40px 15px, rgba(255, 255, 255, 0.4) 0px 0px 0px 2px inset, rgba(241, 201, 171, 0.3) 0px 0px 20px 10px inset;
    text-shadow: rgb(51, 38, 28) 0px 0px;
    height: 36px;
    margin-top: -76px;
    margin-bottom: 12px;
    font-size: 14px;
    border-width: 0px;
    border-radius: 2px;
    background-repeat: no-repeat;
    outline: 0px;
    text-decoration: none;
    transition: filter 200ms ease 0s;
    padding: 0 25px;
  }
</style>
