<template>
  <div>
    <button @click="tryStartWc3">Start w3c!</button>
    <div>w3c: {{lastSavedwc3Path}}</div>
    <div>maps: {{lastSavedMapPath}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const storage = window.require('electron-storage');
const { remote } = window.require('electron')

@Component
export default class W3CLauncher extends Vue {
  private wc3PathKey = "wc3PathKey";
  private wc3MapKey = "wc3MapKey";

  private wc3DefaultPathWindows = "C:\\Program Files (x86)\\Warcraft III";
  private wc3DefaultPatMapPathWindows = "Warcraft III\\Maps";

  public lastSavedwc3Path = ""
  public lastSavedMapPath = ""


  async mounted() {
    if (await storage.isPathExists(this.wc3PathKey)) {
      this.lastSavedwc3Path = await storage.get(this.wc3PathKey);
    }
    if (await storage.isPathExists(this.wc3MapKey)) {
      this.lastSavedMapPath = await storage.get(this.wc3MapKey);
    }
  }

  public tryStartWc3() {
    const success = this.updateIfNeeded();
    if (!success) return;
    this.startWc3();
  }

  private async updateIfNeeded() {
    if (!this.lastSavedwc3Path) {
      const folder = await this.GetFolderFromUser('Warcraft III not found', 'Warcraft III folder not found, please locate it manually');
      if (!folder) return false;
      await storage.set(this.wc3PathKey, folder);
      this.lastSavedwc3Path = folder;
    }

    if (!this.lastSavedMapPath) {
      const folder = await this.GetFolderFromUser('Mapfolder not found', 'The mapfolder of Warcraft III was not found, please locate it manually');
      if (!folder) return false;
      await storage.set(this.wc3PathKey, folder);
      this.lastSavedMapPath = folder;
    }

    return true;
  }

  private async GetFolderFromUser(title: string, message: string) {
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
}
</script>
