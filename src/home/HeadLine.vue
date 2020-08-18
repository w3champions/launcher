<template>
  <div class="headline-container">
    <HeadItem target="/" text="Home"/>
    <HeadItem target="/HotKeys" text="Hot Keys"/>
    <SettingsButton/>
    <div v-if="isWindows" class="close-button" @click="closeApp">X</div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import HeadItem from "@/home/HeadItem.vue";
import SettingsButton from "@/home/SettingsButton.vue";
const { remote } = window.require("electron")

@Component({
  components: {SettingsButton, HeadItem}
})
export default class HeadLine extends Vue {
  get isWindows() {
    return this.$store.state.isWindows;
  }

  public closeApp() {
    remote.app.quit();
  }
}
</script>

<style scoped type="text/css">
.close-button {
  -webkit-app-region: no-drag;
  position: absolute;
  padding: 10px 15px 10px 10px;
  top: 0;
  right: 0;
}

.headline-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 12vh;

  -webkit-user-select: none;
  -webkit-app-region: drag;

  background: url("~@/assets/images/backgrounds/header.png") center no-repeat;
  background-size: cover;
}

</style>
