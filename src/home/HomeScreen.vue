<template>
  <div class="home-container">
    <NewsBanner/>

    <LoadingSpinner :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`" />
    
    <button @click="tryStartWc3" class="start-button w3font" :disabled="isDisabled" :content="playButton" :title="explanation">
      {{ playButton }}
    </button>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-facing-decorator";
import LoadingSpinner from "@/home/LoadingSpinner.vue";
import NewsBanner from "@/home/NewsBanner.vue";

const { execSync } = window.require("child_process");
import store from "@/globalState/vuex-store";

@Component({
  components: {LoadingSpinner, NewsBanner}
})
export default class HomeScreen extends Vue {
  private updateStrategy = store.getters.fileService.updateStrategy;
  
  private disablePlayBtn = true;
  public playButton = "";
  @Prop() public code!: string;

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

  get isNewsLoading() {
    return this.$store.direct.state.newsLoading
  }

  get isW3LocationWrong() {
    return this.$store.direct.state.updateHandling.w3PathIsInvalid;
  }

  get isBnetLocationWrong() {
    return this.$store.direct.state.updateHandling.bnetPathIsInvalid;
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
    const runningProcesses = execSync("tasklist /FI \"STATUS eq RUNNING\"").toString();
    const indexOf = runningProcesses.indexOf("Battle.net.exe");
    return indexOf === -1;
  }
}
</script>

<style scoped type="text/css">
.home-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.start-button:disabled {
  opacity: 0.6;
  cursor: unset;
}

.start-button {
  background: url("~@/assets/images/home/Green_Hero_Button_Static.png") no-repeat center;
  background-size: 100% 100%;
  border: none;
  outline: inherit;
  cursor: pointer;
  width: max(30%, 200px);
  height: max( 10%, 55px);
  text-align: center;
  line-height: max( 8%, 55px);
  font-size: 28px;
  position: fixed;
  bottom: 5%;
}

.start-button:active {
  background: url("~@/assets/images/home/Green_Hero_Button_Active.png") no-repeat center;
  background-size: 100% 100%;
}
</style>
