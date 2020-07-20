<template>
  <div>
    <button @click="startWc3">Start w3c!</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const storage = require('electron-storage');
const { remote } = require('electron')

@Component
export default class W3CLauncher extends Vue {
  private wc3PathKey = "wc3PathKey";
  private wc3MapKey = "wc3MapKey";

  private wc3Path = "C:\\Program Files (x86)\\Warcraft III";
  private wc3MapPath = "C:\\Users\\simon\\Documents\\Warcraft III\\Maps";

  public startWc3() {
    this.updateIfNeeded();
  }

  private async updateIfNeeded() {
    if (!this.lastSavedwc3Path) {
      const folder = await this.GetFolderFromUser('Warcraft III not found', 'Warcraft III folder not found, please locate it manually');
      storage.set(this.wc3PathKey, folder);
    }

    if (!this.lastSavedMapPath) {
      const folder = await this.GetFolderFromUser('Mapfolder not found', 'The mapfolder of Warcraft III was not found, please locate it manually');
      storage.set(this.wc3PathKey, folder);
    }

    storage.set()
  }

  private async GetFolderFromUser(title: string, message: string) {
    const folderResult = await remote.dialog.showMessageBox(null, {
      title: title,
      message: message,
      buttons: ['Locate Folder', 'Cancel Installation']
    })
    if (folderResult.response === 1) {
      window.close()
    }
    const openDialogReturnValue = await remote.dialog.showOpenDialog({properties: ['openDirectory', 'multiSelections']});
    return openDialogReturnValue.filePaths[0];
  }

  get lastSavedwc3Path() {
    return storage.get(this.wc3PathKey);
  }

  get lastSavedMapPath() {
    return storage.get(this.wc3MapKey);
  }
}
</script>
