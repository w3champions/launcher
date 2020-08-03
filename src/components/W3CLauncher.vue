<template>
  <div
    class="background"
    :style="{ 'background-image': 'url(' + backgroundPicture + ')' }"
  >
    <div class="modt">
      <h3>{{ messageContentHeader }}</h3>
      <div v-html="messageContent"></div>
    </div>
    <div :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`">
      Updating W3C...
    </div>
    <div class="paths">
      <div>
        Warcraft III Location: {{w3Path}}
      </div>
      <div>
        Map Location: {{mapPath}}
      </div>
      <div>
        Battle.Net Location: {{battleNet}}
      </div>
      <div>
        W3C Version: {{currentVersion}}
      </div>
      <div>
        Launcher Version: {{appVersion}}
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
import {MacLauncher} from "@/services/MacLauncher";
import {WindowsLauncher} from "@/services/WindowsLauncher";

const { remote } = window.require("electron");

const BASE_NEWS_URL = process.env.IS_TEST
  ? "https://statistic-service-test.w3champions.com/"
  : "https://statistic-service.w3champions.com/";

@Component
export default class W3CLauncher extends Vue {
  public messageContent = "";
  public messageContentHeader = "";
  private updateStrategy = this.isMac() ? new MacLauncher() : new WindowsLauncher();

  get backgroundPicture() {
    return require("../assets/bg.jpg");
  }

  get isLoading(): boolean {
    return this.updateStrategy.isLoading;
  }

  get battleNet(): string {
    return this.updateStrategy.bnetPath;
  }

  get mapPath(): string {
    return this.updateStrategy.mapPath
  }

  get currentVersion(): string {
    return this.updateStrategy.currentVersion;
  }

  get appVersion(): string {
    return remote.app.getVersion();
  }

  get w3Path(): string {
    return this.updateStrategy.w3Path;
  }

  public async tryStartWc3() {
    const success = await this.updateStrategy.updateIfNeeded();
    if (!success) return;
    this.updateStrategy.startWc3();
  }

  mounted() {
    this.loadModt();
  }

  public async repairW3c() {
    await this.updateStrategy.repairWc3();
  }

  private isMac() {
    return process.platform === "darwin";
  }

  private async loadModt() {
    const version = await (
      await fetch(`${BASE_NEWS_URL}api/admin/news`)
    ).json();
    this.messageContent = version[0].message;
    this.messageContentHeader = version[0].date;
  }
}
</script>

<style scoped>
.background {
  width: 960px;
  height: 529px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.modt {
  background-color: rgba(255, 255, 255, 0.8);
  width: 50%;
  text-decoration: none;
  padding: 10px 30px 30px;
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
