<template>
  <div id="app" class="app-container">
    <HeadLine />
    <div class="content-modal-wrapper">
      <div class="static-bg">
      </div>
<!--      <video loop muted autoplay poster="assets/images/home/Static_Background.png" class="fullscreen-bg__video">-->
<!--        <source src="assets/images/home/Animated_Background-webm.webm" type="video/webm">-->
<!--      </video>-->
      <div class="content-modal">
        <router-view />
      </div>
    </div>
    <div id='close-button' class="close-button" @click="closeApp" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import HeadLine from "@/home/HeadLine.vue";
import logger from "@/logger";
const keyboard = window.require("send-keys-native/build/Release/send-keys-native")
const { remote } = window.require("electron")

@Component({
  components: {HeadLine}
})
export default class App extends Vue {
  async mounted() {
    this.$store.direct.dispatch.loadIsTestMode();
    this.$store.direct.dispatch.loadOsMode();
    this.makeSureNumpadIsEnabled()

    await this.$store.direct.dispatch.loadNews();

    logger.info(remote.app.getPath('userData'))
    this.$store.direct.dispatch.hotKeys.loadToggleKey();
    this.$store.direct.dispatch.hotKeys.loadHotKeys();
    this.$store.direct.dispatch.hotKeys.loadRaceHotkeys();
    if (this.$store.direct.state.hotKeys.raceHotkeys.length === 0) {
      logger.info('No hotkeys set yet, importing from file to not overwrite anything')
      await this.$store.direct.dispatch.hotKeys.importHotkeysFromFile();
      await this.$store.direct.dispatch.hotKeys.saveRaceHotkeyToFile();
    }

    this.$store.direct.dispatch.hotKeys.setToggleKey(this.$store.direct.state.hotKeys.toggleButton);
    this.$store.direct.dispatch.hotKeys.loadManualMode();

    this.$store.direct.dispatch.updateHandling.loadAllPaths();
    await this.$store.direct.dispatch.updateHandling.loadOnlineW3CVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentLauncherVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentW3CVersion();
    await this.$store.direct.dispatch.colorPicker.loadIsTeamColorsEnabled();
    await this.$store.direct.dispatch.colorPicker.loadColors();
  }

  public closeApp() {
    remote.app.quit();
  }

  get isWindows() {
    return this.$store.state.isWindows;
  }

  private makeSureNumpadIsEnabled() {
    if (!this.isWindows) {
      return
    }

    window.document.onkeydown = (e) => {
      const numlockState = e.getModifierState("NumLock");
      if (!numlockState) {
        logger.info("Numpad is NOT activated, do hack");
        keyboard.pressNumLock();
      } else {
        logger.info("Numpad is activated, remove hack");
      }

      window.document.onkeydown = null;
      window.document.onclick = null;
    }

    window.document.onclick = (e: MouseEvent) => {
      logger.info("ui clicked, press space for hack")

      console.log(e);
      // @ts-ignore
      if (e.target?.id === "close-button") {
        console.log("click")
        window.document.onkeydown = null;
        window.document.onclick = null;
      }
      else {
        keyboard.pressSpace();
      }
    }
  }
}
</script>

<style lang="scss">

@font-face {
  font-family: "Friz Quadrata Regular OS";
  src: url(assets/friz-quadrata-std-bold-587034a220f9f.otf);
}

body {
  margin: 0;
  font-family: "Inter";
  color: antiquewhite;
  user-select: none;
}

.loading-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;

  background: rgba(0,0,0, 0.9);
}

a {
  color: inherit;
}

.w3font {
  font-family: "Friz Quadrata Regular OS";
  color: #ffd528;
  text-transform: uppercase;
  text-shadow:  3px 3px 1px #000000;
}

.app-container {
  background: url("~@/assets/images/home/Maon_Border.png") center no-repeat;
  height: 100vh;
  background-size: cover;
}

.fullscreen-bg__video {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  z-index: -100;
  transform: translateX(-50%) translateY(-50%);
  width: 1200px;
  height: 655px;
}

.static-bg {
  position: absolute;
  background: url("~@/assets/images/home/Static_Background.png") center no-repeat;
  background-size: cover;
  z-index: -100;
  top: 140px;
  width: 1210px;
  height: 655px;
}

.content-modal-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-modal {
  margin-top: 15vh;
  height: 700px;
  width: 100%;
}

.close-button {
  -webkit-app-region: no-drag;
  position: absolute;
  z-index: 1;
  background: url("~@/assets/images/home/Exit_Button.png") center no-repeat;
  background-size: cover;
  height: 60px;
  width: 61px;
  cursor: pointer;
  top: 65px;
  right: 55px;
}

</style>
