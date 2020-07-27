<template>
  <div
    class="background"
    :style="{ 'background-image': 'url(' + backgroundPicture + ')' }"
  >
    <Modal :width="640" :buttonDisabled="buttonDisabled" buttonLabel="Launch">
      <div class="content">
        <div class="path-field">
          <TextField
            id="battlenet"
            label="Battle.net Installation"
            :value="battleNetPath"
            @change="updateDisabledButton"
          />
          <div class="path-field-button">
            <IconButton />
          </div>
        </div>
        <div class="path-field">
          <TextField
            id="warcraft3"
            label="Warcraft 3 Installation"
            :value="warcraft3Path"
            @change="updateDisabledButton"
          />
          <div class="path-field-button">
            <IconButton />
          </div>
        </div>
        <div class="path-field">
          <TextField
            id="warcraft3documents"
            label="Warcraft 3 Documents"
            :value="warcraft3DocumentsPath"
            @change="updateDisabledButton"
          />
          <div class="path-field-button">
            <IconButton />
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";
import TextField from "@/components/TextField.vue";
import IconButton from "@/components/IconButton.vue";

@Component
@Component({
  components: {
    Modal,
    TextField,
    IconButton,
  },
})
export default class SettingsScreen extends Vue {
  get backgroundPicture() {
    return require("@/assets/images/backgrounds/arthas.png");
  }

  private battleNetPath = "";
  private warcraft3Path = "";
  private warcraft3DocumentsPath = "";

  private buttonDisabled =
    this.battleNetPath == "" ||
    this.warcraft3Path == "" ||
    this.warcraft3DocumentsPath == "";

  updateDisabledButton() {
    console.log("change");
    this.buttonDisabled =
      this.battleNetPath == "" ||
      this.warcraft3Path == "" ||
      this.warcraft3DocumentsPath == "";
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
