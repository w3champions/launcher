<template>
  <div
    class="launcher-background"
  >
    <div class="new-launcher-version" v-if="hasNewLauncherVersion">
      There is a new version of the launcher ({{ onlineLauncherVersion }}), please update on <a href="https://www.w3champions.com/getting-started/" target="_blank">https://www.w3champions.com/getting-started/!</a>
    </div>
    <div class="modt">
      <h3>{{ messages[0] ? messages[0].date : "" }}</h3>
      <div v-html='messages[0] ? messages[0].message : ""'></div>
    </div>
    <div class="isLoading" :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`">
      Updating W3C...
    </div>
    <div class="paths">
      <div class="reset-button-line">
        <div>Warcraft III Location: {{w3Path}}</div>
        <button class="reset-button" @click="resetW3Path">Set Manually</button>
      </div>
      <div class="reset-button-line">
        <div>Map Location: {{mapPath}}</div>
        <button class="reset-button" @click="resetMapPath">Set Manually</button>
      </div>
      <div class="reset-button-line">
        <div>Battle.Net Location: {{battleNet}}</div>
        <button class="reset-button" @click="resetBnetPath">Set Manually</button>
      </div>
      <div>
        Warcraft 3 Champions Version: {{w3cVersion}}
      </div>
      <div>
        Launcher Version: {{ currentLauncherVersion }}
      </div>
      <div>
        <button @click="switchToPtr">Switch to PTR</button>
        <button @click="switchToProd">Switch to PROD</button>
      </div>
    </div>
    <button @click="tryStartWc3" :disabled="isLoading" class="start-button">
      Start Warcraft 3 Champions!
    </button>
    <button @click="repairW3c" :disabled="isLoading" class="repair-button">
      Repair Warcraft 3 Champions
    </button>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {MacLauncher} from "@/update-handling/MacLauncher";
import {WindowsLauncher} from "@/update-handling/WindowsLauncher";
import Button from "@/components/Button.vue";

const os = window.require('os');
@Component({
  components: {Button}
})
export default class W3CLauncher extends Vue {
  private updateStrategy!: any;

  constructor() {
    super();
    this.updateStrategy = this.isWindows() ? new WindowsLauncher() : new MacLauncher();
  }

  public async switchToPtr() {
    await this.updateStrategy.switchToPtr();
  }

  public async switchToProd() {
    await this.updateStrategy.switchToProd();
  }

  public async resetBnetPath() {
    await this.updateStrategy.hardSetBnetPath();
  }

  public async resetMapPath() {
    await this.updateStrategy.hardSetMapPath();
  }

  public async resetW3Path() {
    await this.updateStrategy.hardSetW3cPath();
  }

  get battleNet(): string {
    return this.$store.direct.state.updateHandling.bnetPath;
  }

  get mapPath(): string {
    return this.$store.direct.state.updateHandling.mapsPath;
  }

  get w3cVersion(): string {
    return this.$store.direct.state.updateHandling.localW3cVersion;
  }

  get currentLauncherVersion(): string {
    return this.$store.direct.state.updateHandling.localLauncherVersion
  }

  get w3Path(): string {
    return this.$store.direct.state.updateHandling.w3Path;
  }

  get messages() {
    return this.$store.direct.state.updateHandling.news;
  }

  public async tryStartWc3() {
    if (this.isLoading) return;
    await this.updateStrategy.updateIfNeeded();
  }

  get hasNewLauncherVersion() {
    return this.onlineLauncherVersion.localeCompare(this.currentLauncherVersion) > 0;
  }

  async mounted() {
    this.$store.direct.dispatch.updateHandling.loadNews();
    this.$store.direct.dispatch.updateHandling.loadAllPaths();
    await this.$store.direct.dispatch.updateHandling.loadOnlineLauncherVersion();
    await this.$store.direct.dispatch.updateHandling.loadOnlineW3CVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentLauncherVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentW3CVersion();
  }

  get onlineLauncherVersion() {
    return this.$store.state.updateHandling.onlineLauncherVersion;
  }

  get isLoading() {
    return this.$store.state.updateHandling.isUpdatingMaps || this.$store.state.updateHandling.isUpdatingWebUI;
  }

  public async repairW3c() {
    if (this.isLoading) return;

    await this.updateStrategy.repairWc3();
  }

  private isWindows() {
    return os.platform() === "win32";
  }
}
</script>

<style scoped>
.launcher-background {
  width: 100%;
  height: 96vh;
  background: url("~@/assets/bg.jpg") center no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.reset-button-line {
  display: flex;
  justify-content: space-between;
}

.reset-button {
  margin-left: 20px;
}

.isLoading {
  background-color: rgba(255, 255, 255, 0.8);
  width: 50%;
}

.modt {
  background-color: rgba(255, 255, 255, 0.8);
  width: 50%;
  text-decoration: none;
  padding: 10px 30px 30px;
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

.paths {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 10px;
}

.start-button {
  cursor: pointer;
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
  background-image: linear-gradient(rgba(88, 88, 88, 0.2) 50%, transparent 50%),
    linear-gradient(rgb(165, 165, 165), rgb(111, 111, 111));
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 0px 2px,
    rgba(226, 223, 221, 0.3) 0px 0px 40px 15px,
    rgba(255, 255, 255, 0.4) 0px 0px 0px 2px inset,
    rgba(241, 201, 171, 0.3) 0px 0px 20px 10px inset;
  text-shadow: rgb(51, 38, 28) 0px 0px;
  height: 36px;
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
