<template>
  <div class="home-container">
  
    <div class="modt">
      <div class="modt-inner">
        <div class="news-button-container" >
          <div v-for="(newsItem, index) in news" class="news-selector" :key="newsItem.date" @click="() => selectNews(index)" :class="() => isSelected(index) ? 'selected-item' : ''"/>
        </div>
        <div class="w3font news-header">{{ news[selectedNews] ? news[selectedNews].date : "" }}</div>
        <br />
        <div v-if="isNewsHtml" v-html="news[selectedNews].message"></div>
        <vue-markdown v-else :source="news[selectedNews] ? news[selectedNews].message : ''" />
      </div>      
    </div>

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
    return this.$store.direct.state.news.slice(0,6);
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
}
</script>

<style scoped type="text/css">
.home-container{
  display: flex;
  height:100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.news-button-container{
  display: flex;
  justify-content: center;
  margin-bottom:1px;
}

.modt {
  background: url("~@/assets/images/home/W3Champion_Text_Frame.png") no-repeat center;
  background-size: cover;
  margin-top: 1%;
  margin-bottom: 1%;
  padding: 4%;
  font-size: 14px;
  width: 865px;
  height: 390px;

}

.modt-inner {
  height: 422px;
  top: -32px;
  position: relative;
  padding: 30px 20px 0px 0px;
  margin: 0%;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.inner-location-wrapper {
  height: 180px;
  width: 605px;

}

.location-wrapper {
  background: url("~@/assets/images/settings/Settings_Directory_Text_Frame.png") no-repeat center;
  background-size: cover;
  padding: 28px 30px 30px 30px;
  height: 150px;
  width: 605px;
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
  width: 30%;
  text-align: center;
  line-height: 100%;
  font-size: 28px;
  padding:2%;
  position:fixed;
  bottom:3.5%;
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
  background-color: #697;
  border-radius: 50%;
  position:relative;
  bottom:18px;

}

.selected-item {
  background-color: #afd528;
}
</style>
