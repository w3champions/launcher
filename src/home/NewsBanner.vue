<template>
  <div>
    <div class="news-buttons-box"         @wheel="onSelectorScroll">
      <div 

      v-for="(newsItem, index) in news" class="news-selector" :key="newsItem.date" @click="() => selectNews(index)" :class="isSelected(index) ? 'news-selector-selected' : ''"/>
      </div>
    <div class="w3font news-header">{{ selectedNewsDate }}</div>
    <div class="news-banner">
        <div class="news-message-box">
          <br />
          <div class="news-content" v-if="isNewsHtml" v-html="selectedNewsMessage"></div>
          <vue-markdown v-else :source="selectedNewsMessage" />
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

  .news-banner{
    background: url("~@/assets/images/home/W3Champion_Text_Frame.png") no-repeat center;
    background-size: cover;
    font-size: 14px;
    width: 865px;
    height: 440px;
    display: flex;
    justify-content: center;
  }
      
  .news-header {
    font-size: 21px;
    padding-bottom: 10px;
    text-align:center;
  }

  .news-selector-selected {
    background-color: rgba(98, 110, 197, 0.656)     !important;
    border-radius: 50%;
  }

.news-selector {
  margin-right: 8px;
  cursor: pointer;
  margin-left: 8px;
  height: 24px;
  width: 24px;
  /* background-color: #697; */
  border-color: rgba(78, 106, 176, 0.508);
  border-style: solid;
  border-radius: 50%;
  position:relative;
  bottom:18px;
}
.news-selector:hover {
  border-color: rgba(69, 98, 173, 0.508);
}
  .news-buttons-box{
  display: flex;
  justify-content: center;
}

.news-message-box{
  position:relative;
  top:30px;
  left:10px;
  width: 820px;
  height: 380px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.news-content {
  font-size: 18px;
}
</style>