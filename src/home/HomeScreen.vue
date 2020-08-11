<template>
  <div class="home-container">
    <div class="new-launcher-version" v-if="hasNewLauncherVersion">
      There is a new version of the launcher ({{ onlineLauncherVersion }}), please update on <a href="https://www.w3champions.com/getting-started/" target="_blank">https://www.w3champions.com/getting-started/!</a>
    </div>
    <div class="modt">
      <h3>{{ news[0] ? news[0].date : "" }}</h3>
      <div v-html='news[0] ? news[0].message : ""'></div>
    </div>
    <LoadingSpinner :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`" />
    <button @click="tryStartWc3" :disabled="isLoading" class="start-button">
      Play
    </button>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {WindowsLauncher} from "@/update-handling/WindowsLauncher";
import {MacLauncher} from "@/update-handling/MacLauncher";
import LoadingSpinner from "@/home/LoadingSpinner.vue";
const os = window.require('os');

@Component({
  components: {LoadingSpinner}
})
export default class HomeScreen extends Vue {
  private updateStrategy = HomeScreen.isWindows() ? new WindowsLauncher() : new MacLauncher();

  get news() {
    return this.$store.direct.state.news;
  }

  private static isWindows() {
    return os.platform() === "win32";
  }

  public async tryStartWc3() {
    if (this.isLoading) return;
    await this.updateStrategy.updateIfNeeded();
    this.updateStrategy.startWc3();
  }

  get currentLauncherVersion(): string {
    return this.$store.direct.state.updateHandling.localLauncherVersion
  }

  get hasNewLauncherVersion() {
    return this.onlineLauncherVersion.localeCompare(this.currentLauncherVersion) > 0;
  }

  get onlineLauncherVersion() {
    return this.$store.state.updateHandling.onlineLauncherVersion;
  }

  get isLoading() {
    return this.$store.state.updateHandling.isUpdatingMaps || this.$store.state.updateHandling.isUpdatingWebUI;
  }
}
</script>

<style scoped type="text/css">
.home-container{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.modt {
  text-decoration: none;
  font-size: 14px;
  width: 850px;
  padding: 40px 30px 30px;
  height: 320px;
}

.new-launcher-version {
  position: absolute;
  z-index: 1222222223;
  width: 100%;
  line-height: 50.5vh;
  text-align: center;
  color: aliceblue;
  font-size: 2em;
  background: rgba(0, 0, 0, 0.8);
  text-decoration: none;
}

a {
  color: inherit;
}

.start-button {
  line-height: 1;
  background-color: transparent;
  text-transform: uppercase;
  color: rgb(51, 38, 28);
  background-image: linear-gradient(rgba(255, 255, 0, 0.2) 50%, transparent 50%),
    linear-gradient(rgb(255, 209, 85), rgb(220, 166, 13));
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 0px 2px,
    rgba(236, 174, 6, 0.3) 0px 0px 40px 15px,
    rgba(255, 255, 255, 0.4) 0px 0px 0px 2px inset,
    rgba(255, 125, 19, 0.3) 0px 0px 20px 10px inset;
  text-shadow: rgb(51, 38, 28) 0px 0px;
  height: 76px;
  font-size: 26px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  border-radius: 2px;
  background-repeat: no-repeat;
  outline: 0px;
  text-decoration: none;
  transition: filter 200ms ease 0s;
  padding: 0 95px;
}
</style>
