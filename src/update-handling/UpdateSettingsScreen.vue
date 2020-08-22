<template>
  <div
    class="launcher-background"
  >
    <LoadingSpinner :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`" />
    <div style="padding-top: 60px">
      <div :class="isW3LocationWrong ? 'path-is-wrong' : 'reset-button-line'">
        <div>Warcraft III Location: {{w3Path}}</div>
        <div class="reset-button" @click="resetW3Path" />
      </div>
      <div class="reset-button-line">
        <div>Battle.Net Location: {{battleNet}}</div>
        <div class="reset-button" @click="resetBnetPath" />
      </div>
      <div class="button-bar">
        <div @click="repairW3c" :disabled="isLoading" class="repair-button">
          Reset W3C
        </div>
        <div @click="redownloadW3c" :disabled="isLoading" class="repair-button">
          Redownload
        </div>
        <div @click="toggleVersion" class="repair-button">
          Switch to {{ !isTest ? "PTR" : "LIVE" }}
        </div>
      </div>
      <div class="version-wrapper">
        <div>
          {{ isTest ? "PTR" : "LIVE" }}
        </div>
        <div>
          Warcraft 3 Champions Version: {{w3cVersion}}
        </div>
        <div>
          Launcher Version: {{ currentLauncherVersion }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {MacLauncher} from "@/update-handling/MacLauncher";
import {WindowsLauncher} from "@/update-handling/WindowsLauncher";
import LoadingSpinner from "@/home/LoadingSpinner.vue";

@Component({
  components: {LoadingSpinner}
})
export default class UpdateSettingsScreen extends Vue {
  private updateStrategy!: any;

  constructor() {
    super();
    this.updateStrategy = this.isWindows() ? new WindowsLauncher() : new MacLauncher();
    this.updateStrategy.updateIfNeeded();
  }

  get isW3LocationWrong() {
    return this.$store.direct.state.updateHandling.w3PathIsInvalid;
  }

  get isMapLocationWrong() {
    return this.$store.direct.state.updateHandling.mapPathIsInvalid;
  }

  public async toggleVersion() {
    this.isTest ? await this.updateStrategy.switchToProd() : await this.updateStrategy.switchToPtr();
  }

  public async resetBnetPath() {
    await this.updateStrategy.hardSetBnetPath();
  }

  public async resetW3Path() {
    await this.updateStrategy.hardSetW3cPath();
  }

  public async redownloadW3c() {
    await this.updateStrategy.redownloadW3c();
  }

  get isTest() {
    return this.$store.direct.state.isTest;
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

  get onlineLauncherVersion() {
    return this.$store.direct.state.updateHandling.onlineLauncherVersion;
  }

  get w3Path(): string {
    return this.$store.direct.state.updateHandling.w3Path?.replace("/_retail_", "").replace("\\_retail_", "");
  }

  get news() {
    return this.$store.direct.state.news;
  }

  public async tryStartWc3() {
    if (this.isLoading) return;
    await this.updateStrategy.updateIfNeeded();
  }

  get hasNewLauncherVersion() {
    return this.onlineLauncherVersion.localeCompare(this.currentLauncherVersion) > 0;
  }

  get isLoading() {
    return this.$store.state.updateHandling.isUpdatingMaps || this.$store.state.updateHandling.isUpdatingWebUI;
  }

  public async repairW3c() {
    if (this.isLoading) return;

    await this.updateStrategy.repairWc3();
  }

  private isWindows() {
    return this.$store.state.isWindows;
  }
}
</script>

<style scoped type="text/css">
.launcher-background {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.button-bar{
  padding-top: 35px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.reset-button-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 650px;
  height: 50px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  padding-left: 32px;
  padding-right: 32px;
  background: url("~@/assets/images/fields/war3_text_hover_4k.png") no-repeat center;
  background-size: cover;
}

.path-is-wrong {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 650px;
  height: 50px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  padding-left: 32px;
  padding-right: 32px;
  background: url("~@/assets/images/fields/war3_text_error_hover_4k.png") no-repeat center;
  background-size: cover;
}

.repair-button {
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.repair-button:hover {
  filter: brightness(1.1);
  background-color: rgb(217, 217, 217);
  cursor: pointer;
}

.reset-button {
  width: 48px;
  height: 48px;
  background: url("~@/assets/images/icons/folder-icon-resting.png") no-repeat center;
  background-size: cover;
}

.reset-button:hover {
  background: url("~@/assets/images/icons/folder-icon-hover.png") no-repeat center;
  background-size: cover;
}

.version-wrapper {
  padding-right: 20px;
  padding-top: 30px;
  text-align: right
}
</style>
