<template>
  <div class="path-field">
    <TextField
      :id="id"
      :label="label"
      v-bind:value="value"
      @input="updatePath"
    />
    <div class="path-field-button">
      <IconButton @click="findFolder" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import TextField from "@/components/TextField.vue";
import IconButton from "@/components/IconButton.vue";
const { remote } = window.require("electron");

@Component({
  components: {
    TextField,
    IconButton,
  },
})
export default class PathField extends Vue {
  @Prop(String) readonly id: string | undefined;
  @Prop(String) readonly label!: string;
  @Prop(String) readonly value: string | undefined;

  updatePath(value: string) {
    this.$emit("input", value);
  }

  click() {
    this.$emit("click");
  }

  private async findFolder() {
    const result = await this.openDialogForUserFolderSelction(
      this.label,
      "Please locate " + this.label + " Path"
    );
    if (result !== null) {
      this.updatePath(result);
    }
  }

  private async openDialogForUserFolderSelction(
    title: string,
    message: string
  ) {
    const folderResult = await remote.dialog.showMessageBox(null, {
      title: title,
      message: message,
      buttons: ["Locate Folder", "Cancel"],
    });
    if (folderResult.response === 1) {
      return null;
    }
    const openDialogReturnValue = await remote.dialog.showOpenDialog({
      properties: ["openDirectory", "multiSelections"],
    });
    return openDialogReturnValue.filePaths[0];
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/styles.scss";

.path-field {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  .path-field-button {
    margin-bottom: 12px;
  }
}
</style>
