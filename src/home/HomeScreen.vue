<template>
  <div class="home-container">
    <div class="modt">
      <div class="w3font news-header">{{ news[selectedNews] ? news[selectedNews].date : "" }}</div>
      <br />
      <vue-markdown :source="news[selectedNews] ? news[selectedNews].message : ''" />
    </div>
    <div style="bottom: 188px; display: flex; justify-content: center; position: absolute;">
      <div v-for="(newsItem, index) in news" class="news-selector" :key="newsItem.date" @click="() => selectNews(index)" :class="() => isSelected(index) ? 'selected-item' : ''"/>
    </div>
    <LoadingSpinner :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`" />
    <button @click="tryStartWc3" class="start-button w3font" :disabled="isDisabled" :content="playButton" :title="explanation">
      {{ playButton }}
    </button>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {WindowsLauncher} from "@/update-handling/WindowsLauncher";
import {MacLauncher} from "@/update-handling/MacLauncher";
import LoadingSpinner from "@/home/LoadingSpinner.vue";
const { execSync } = window.require("child_process");
const os = window.require('os');
import VueMarkdown from "vue-markdown";

@Component({
  components: {LoadingSpinner, VueMarkdown}
})
export default class HomeScreen extends Vue {
  private updateStrategy = HomeScreen.isWindows() ? new WindowsLauncher() : new MacLauncher();
  private disablePlayBtn = true;
  public playButton = "";
  public selectedNews = 0;
  @Prop() public code!: string;

  private static isWindows() {
    return os.platform() === "win32";
  }

  public selectNews(index: number) {
    this.selectedNews = index;
  }

  async mounted() {
    this.turnOnButton();
    await this.updateStrategy.updateIfNeeded();
  }

  private turnOnButton() {
    if (HomeScreen.isWindows() && this.isBnetOff) {
      this.playButton = "Please open Bnet"
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

  public isSelected(index: number) {
    return index === this.selectedNews;
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
  background: url("~@/assets/images/home/W3Champion_Text_Frame.png") no-repeat center;
  background-size: cover;
  margin-top: 60px;
  margin-bottom: 15px;
  padding: 50px;
  font-size: 14px;
  width: 865px;
  height: 390px;
}

.start-button:disabled {
  opacity: 0.6;
  cursor:unset;
}

.start-button {
  background: url("~@/assets/images/home/Green_Hero_Button_Static.png") no-repeat center;
  background-size: cover;
  border: none;
  outline: inherit;
  cursor: pointer;
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

.news-header {
  font-size: 20px;
}

.news-selector {
  margin-right: 8px;
  cursor: pointer;
  margin-left: 8px;
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.selected-item {
  background-color: #ffd528 !important;
}
</style>
