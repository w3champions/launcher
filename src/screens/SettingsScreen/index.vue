<template>
  <div
    class="background"
    :style="{ 'background-image': 'url(' + backgroundPicture + ')' }"
  >
    <Modal
      :width="640"
      :buttonDisabled="isButtonDisabled"
      buttonLabel="Save"
      :onButtonClick="updateStore"
    >
      <div class="content">
        <PathField
          id="battlenet"
          label="Battle.net Installation"
          v-model="battleNetPath"
        />
        <PathField
          id="warcraft3"
          label="Warcraft 3 Installation"
          v-model="warcraft3Path"
        />
        <PathField
          id="warcraft3documents"
          label="Warcraft 3 Documents"
          v-model="warcraft3DocumentsPath"
        />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
const Store = window.require("electron-store");
const store = new Store();
import { Component, Vue } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";
import PathField from "@/components/PathField.vue";

@Component
@Component({
  components: {
    Modal,
    PathField,
  },
})
export default class SettingsScreen extends Vue {
  private battleNetPath = store.get("battleNetPath");
  private warcraft3Path = store.get("warcraft3Path");
  private warcraft3DocumentsPath = store.get("warcraft3DocumentsPath");
  get backgroundPicture() {
    return require("@/assets/images/backgrounds/arthas.png");
  }

  get isButtonDisabled() {
    return (
      this.battleNetPath === "" ||
      this.warcraft3Path === "" ||
      this.warcraft3DocumentsPath === ""
    );
  }

  updateStore() {
    console.log("Update Store");
    store.set("battleNetPath", this.battleNetPath);
    store.set("warcraft3Path", this.warcraft3Path);
    store.set("warcraft3DocumentsPath", this.warcraft3DocumentsPath);
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/styles.scss";

.background {
  width: 1575px;
  height: 885px;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 40px;
  padding-top: 45px;
}
</style>
