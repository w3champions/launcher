<template>
  <div class="home-container">
    <div class="modt">
      <div class="w3font news-header">{{ news[selectedNews] ? news[selectedNews].date : "" }}</div>
      <br />
      <div v-if="isNewsHtml" v-html="news[selectedNews].message"></div>
      <vue-markdown v-else :source="news[selectedNews] ? news[selectedNews].message : ''" />
    </div>
    <div style="bottom: 188px; display: flex; justify-content: center; position: absolute;">
      <div v-for="(newsItem, index) in news" class="news-selector" :key="newsItem.date" @click="() => selectNews(index)" :class="() => isSelected(index) ? 'selected-item' : ''"/>
    </div>
    {{currentGame}}
    <LoadingSpinner :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`" />
    <button @click="tryStartWc3" class="start-button w3font" :disabled="isDisabled" :content="playButton" :title="explanation">
      {{ playButton }}
    </button>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import LoadingSpinner from "@/home/LoadingSpinner.vue";
const { execSync } = window.require("child_process");
import VueMarkdown from "vue-markdown";
import store from "@/globalState/vuex-store";

@Component({
  components: {LoadingSpinner, VueMarkdown}
})
export default class HomeScreen extends Vue {
  private updateStrategy = store.getters.fileService.updateStrategy;
  
  private disablePlayBtn = true;
  public playButton = "";
  public selectedNews = 0;
  @Prop() public code!: string;

  public selectNews(index: number) {
    this.selectedNews = index;
  }

  async mounted() {
    this.turnOnButton();
  }

  private turnOnButton() {
    if (this.$store.direct.state.isWindows && this.isBnetOff) {
      this.playButton = "Please open Bnet"
      this.disablePlayBtn = true;
    } else {
      this.playButton = "Play";
      this.disablePlayBtn = false;
    }
  }

  get isNewsHtml() {
    let isHtml = false;
    const newsItem = this.news[this.selectedNews];

    if (newsItem) {
      // Check that it starts with '<' and ends with '>'
      isHtml = newsItem.message.trim().charAt(0) === '<'
        && newsItem.message.trim().charAt(newsItem.message.length - 1) === '>';
    }

    return isHtml;
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

  private static isWindows() {
    const os = window.require('os');
    return os.platform() === "win32";
  }

  get isLoading() {
    return this.$store.state.updateHandling.isUpdatingMaps || this.$store.state.updateHandling.isUpdatingWebUI;
  }

  get isBnetOff() {
    const runningProcesses = execSync("tasklist /FI \"STATUS eq RUNNING").toString();
    const indexOf = runningProcesses.indexOf("Battle.net.exe");
    return indexOf === -1;
  }

  get currentGame() {
    return JSON.stringify(this.$store.direct.state.currentGame)
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
