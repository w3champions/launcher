<template>
  <div class="home-container">
    <div class="modt">
      <h3>{{ news[0] ? news[0].date : "" }}</h3>
      <div v-html='news[0] ? news[0].message : ""'></div>
    </div>
    <LoadingSpinner :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`" />
    <div @click="tryStartWc3" class="start-button w3font" :class="isDisabled ? 'start-button-disabled' : ''" :content="playButton" :title="explanation">
      <div style="opacity: unset" >{{ playButton }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {WindowsLauncher} from "@/update-handling/WindowsLauncher";
import {MacLauncher} from "@/update-handling/MacLauncher";
import LoadingSpinner from "@/home/LoadingSpinner.vue";
const { execSync } = window.require("child_process");
const os = window.require('os');

@Component({
  components: {LoadingSpinner}
})
export default class HomeScreen extends Vue {
  private updateStrategy = HomeScreen.isWindows() ? new WindowsLauncher() : new MacLauncher();
  private disablePlayBtn = true;
  public playButton = "Please open Bnet first";

  private static isWindows() {
    return os.platform() === "win32";
  }

  async mounted() {
    this.turnOnButton();
    await this.$store.direct.dispatch.loadNews();
  }

  private turnOnButton() {
    if (HomeScreen.isWindows() && this.isBnetOff) {
      this.playButton = "Please open Bnet first"
      this.disablePlayBtn = true;
    } else {
      this.playButton = "Play";
      this.disablePlayBtn = false;
    }
  }

  get explanation() {
    if (this.isW3LocationWrong || this.isBnetLocationWrong) {
      return "BattleNet or Warcraft III location wrong, please fix in Settings"
    }

    return ""
  }

  get isDisabled() {
    return (this.isLoading
      || this.disablePlayBtn
      || this.isW3LocationWrong
      || this.isBnetLocationWrong);
  }

  get isW3LocationWrong() {
    return this.$store.direct.state.updateHandling.w3PathIsInvalid;
  }

  get isBnetLocationWrong() {
    return this.$store.direct.state.updateHandling.bnetPathIsInvalid;
  }

  get news() {
    return this.$store.direct.state.news;
  }

  public async tryStartWc3() {
    if (this.isLoading) return;

    await this.updateStrategy.updateIfNeeded();
    this.updateStrategy.startWc3();
  }

  get isLoading() {
    return this.$store.state.updateHandling.isUpdatingMaps || this.$store.state.updateHandling.isUpdatingWebUI;
  }

  get isBnetOff() {
    const runningProcesses = execSync("tasklist /FI \"STATUS eq RUNNING").toString();
    const indexOf = runningProcesses.indexOf("Battle.net.exe");
    return indexOf === -1;
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

.start-button {
  background: url("~@/assets/images/home/Green_Hero_Button_Static.png") no-repeat center;
  background-size: cover;
  height: 88px;
  width: 393px;
  text-align: center;
  line-height: 80px;
  font-size: 28px;
}

.start-button:active {
  background: url("~@/assets/images/home/Green_Hero_Button_Active.png") no-repeat center;
  background-size: cover;
}
</style>
