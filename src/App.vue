<template>
  <div id="app" class="app-container">
    <HeadLine />
    <div class="content-modal-wrapper">
      <div class="content-modal">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import HeadLine from "@/home/HeadLine.vue";
import {NUM_LOCK} from "@/hot-keys/keyValuesRobotJs";
const robot = window.require("robotjs");
const os = window.require("os");

@Component({
  components: {HeadLine}
})
export default class App extends Vue {
  async mounted() {
    this.makeSureNumpadIsEnabled()
    this.$store.direct.dispatch.loadIsTestMode();

    this.$store.direct.dispatch.hotKeys.loadToggleKey();
    this.$store.direct.dispatch.hotKeys.loadHotKeys();
    this.$store.direct.dispatch.hotKeys.setToggleKey(this.$store.direct.state.hotKeys.toggleButton);

    this.$store.direct.dispatch.updateHandling.loadAllPaths();
    await this.$store.direct.dispatch.updateHandling.loadOnlineLauncherVersion();
    await this.$store.direct.dispatch.updateHandling.loadOnlineW3CVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentLauncherVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentW3CVersion();
  }

  private makeSureNumpadIsEnabled() {
    if (os.platform() === "darwin") {
      return
    }

    window.document.onkeydown = (e) => {
      const numlockState = e.getModifierState("NumLock");
      if (!numlockState) {
        console.log("Numpad is NOT activated, do hack:" + numlockState);
        robot.keyTap(NUM_LOCK);
      } else {
        console.log("Numpad is activated, remove hack:" + numlockState);
      }

      window.document.onkeydown = null;
      window.document.onclick = null;
    }

    window.document.onclick = () => {
      robot.keyTap("a");
    }

    robot.keyTap("a");
  }
}
</script>

<style lang="scss">
@import url("https://rsms.me/inter/inter.css");

body {
  margin: 0;
  font-family: "Inter" !important;
  color: antiquewhite;
}

.app-container {
  background: url("~@/assets/images/backgrounds/main_bg.png") center no-repeat;
  height: 99.5vh;
  background-size: cover;
  border: 0.25vh solid black;
}

.content-modal-wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-modal {
  background: url("~@/assets/images/backgrounds/frame.png") center no-repeat;
  background-size: cover;
  margin-top: 5vh;
  height: 76vh;
  width: 90%;
}

</style>
