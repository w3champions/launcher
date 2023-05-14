<template>
  <div class="news-container">
    <div class="news-buttons-box" @wheel="onSelectorScroll">
      <div 
       v-for="(newsItem, index) in news" class="news-selector" :key="newsItem.date" @click="() => selectNews(index)" :class="isSelected(index) ? 'news-selector-selected' : ''"/>
    </div>
    <div class="news-bg">
      <div class="w3font news-header">{{ selectedNewsDate }}</div>
      <div class="news-banner">
          <div class="news-message-box">
            <div class="news-content" v-if="isNewsHtml" v-html="selectedNewsMessage"></div>
            <vue-markdown v-else :source="selectedNewsMessage" />
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import VueMarkdown from "vue-markdown";
import store from "@/globalState/vuex-store";

@Component({
  components: {VueMarkdown}
})

export default class NewsBanner extends Vue {
  public selectedNews = 0;
  private newsSlice = 6; // how many news to display

  get selectedNewsDate(){
    return this.news[this.selectedNews] ? this.news[this.selectedNews].date : ''
  }
  get selectedNewsMessage(){
    return this.news[this.selectedNews] ? this.news[this.selectedNews].message : ''
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

  public isSelected(index: number) {
    return index == this.selectedNews;
  }
  public selectNews(index: number) {
    this.selectedNews = index;
  }
  public onSelectorScroll(e: WheelEvent){
    e.deltaY > 0 ? this.selectedNews += 1 : this.selectedNews -= 1
    if(this.selectedNews < 0)
      this.selectedNews = this.newsSlice - 1
    if(this.selectedNews > this.newsSlice - 1)
      this.selectedNews = 0
  }
  get news() {
    return store.state.news.slice(0,this.newsSlice);
  }
}
</script>

<style scoped type="text/css">

.news-container {
  position: relative;
  font-size: 2vh;
  width: 75vw;
  height: 100%;
  align-content: center;
}

.news-bg {
  background: url("~@/assets/images/home/W3Champion_Text_Frame.png") no-repeat center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 50px);
}

.news-banner {
  display: flex;
  margin-top: 0.7vh;
  width: 93.4%;
  height: 87.4%;
  justify-content: center;
}
    
.news-header {
  font-size: 3vh;
  margin-top: 2vh;
  text-align: center;
  width: 70%;
}

.news-selector-selected {
  background-color: rgba(98, 110, 197, 0.656)     !important;
  border-radius: 50%;
}

.news-selector {
  margin-right: 8px;
  cursor: pointer;
  margin-left: 8px;
  height: 25px;
  width: 25px;
  margin-top: 4px;
  /* background-color: #697; */
  border-color: rgba(78, 106, 176, 0.508);
  border-style: solid;
  border-radius: 50%;
  position:relative;
}
.news-selector:hover {
  border-color: rgba(69, 98, 173, 0.508);
}
.news-buttons-box {
  height: 40px;
  display: flex;
  justify-content: center;
  margin-top: 1vh;
  margin-bottom: 0.5vh;
}

.news-message-box {
  position: relative;
  width: 100%;
}

.news-content {
  height: 99%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

.news-content::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border: 4px solid transparent;
    background-clip: content-box;
}
</style>
