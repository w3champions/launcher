<template>
  <div id="app" class="app-container">
    <HeadLine />
    <div v-if="!isLoggedIn" >
      <LoadingSpinner v-if="regionChoosen" text="Logging in..."/>
      <LoadingSpinner v-else text="Choose the region of your battle net account (this does not affect where you are actually playing)"/>
      <div class="gw-selection-wrapper" v-if="!regionChoosen">
        <div style="display: flex; flex-direction: row; cursor: pointer" @click="() => loginAt(loginGWs.eu)">
          <div class="gw-selection gw-select-eu"/>
          <div style="font-size: 40px; line-height: 60px; padding-left: 10px; padding-right: 10px"> / </div>
          <div class="gw-selection gw-select-us"/>
        </div>
        <div class="gw-selection gw-select-cn" @click="() => loginAt(loginGWs.cn)"/>
      </div>
    </div>
    <div class="content-modal-wrapper">
      <div class="static-bg" />
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
import LoadingSpinner from "@/home/LoadingSpinner.vue";
import store from "@/globalState/vuex-store";
import {OAUTH_ENABLED} from "@/constants";
import {LoginGW} from "@/globalState/rootTypings";

const keyboard = window.require("send-keys-native/build/Release/send-keys-native")
const { remote } = window.require("electron");
const { ipcRenderer } = window.require('electron')

@Component({
  components: {LoadingSpinner, HeadLine}
})
export default class App extends Vue {
  private updateStrategy = store.getters.fileService.updateStrategy;

  async created() {
    ipcRenderer.on('blizzard-code-received', (wht: any, args: string) => {
      store.dispatch.authorizeWithCode(args);
    })

    ipcRenderer.on('blizzard-window-closed-without-auth', () => {
      store.dispatch.setLoginGateway(LoginGW.none);
    })

    this.$store.direct.dispatch.loadIsTestMode();
    this.$store.direct.dispatch.loadOsMode();
    this.$store.direct.dispatch.loadAuthToken();

    this.makeSureNumpadIsEnabled()

    await this.$store.direct.dispatch.loadNews();

    logger.info(remote.app.getPath('userData'))
    this.$store.direct.dispatch.hotKeys.loadHotkeyFabSettings();
    this.$store.direct.dispatch.hotKeys.loadToggleKey();
    this.$store.direct.dispatch.hotKeys.loadHotKeys();
    this.$store.direct.dispatch.hotKeys.setToggleKey(this.$store.direct.state.hotKeys.toggleButton);
    this.$store.direct.dispatch.hotKeys.loadManualMode();
    this.$store.direct.dispatch.hotKeys.loadIsClassicIcons();

    this.$store.direct.dispatch.updateHandling.loadAllPaths();
    await this.$store.direct.dispatch.updateHandling.loadOnlineW3CVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentLauncherVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentW3CVersion();
    await this.$store.direct.dispatch.colorPicker.loadIsTeamColorsEnabled();
    await this.$store.direct.dispatch.colorPicker.loadColors();

    await this.updateStrategy.updateIfNeeded();
  }

  get regionChoosen() {
    return this.$store.direct.state.selectedLoginGateway !== LoginGW.none;
  }

  get loginGWs() {
    return LoginGW;
  }

  get isLoggedIn() {
    if (!OAUTH_ENABLED) return true;
    return this.$store.direct.state.w3cToken
  }

  public async loginAt(gateway: LoginGW) {
    this.$store.direct.dispatch.setLoginGateway(gateway);
    await this.$store.direct.dispatch.resetAuthentication();
  }

  public closeApp() {
    ipcRenderer.send('close-window');
  }

  private static isWindows() {
    const os = window.require('os');
    return os.platform() === "win32";
  }

  private makeSureNumpadIsEnabled() {
    if (!App.isWindows) {
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

.gw-selection {
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.gw-select-tw {
  background: url("~@/assets/images/countryFlags/tw.svg") center no-repeat;
  background-size: cover;
}

.gw-select-kr {
  background: url("~@/assets/images/countryFlags/kr.svg") center no-repeat;
  background-size: cover;
}

.gw-select-eu {
  background: url("~@/assets/images/countryFlags/eu.svg") center no-repeat;
  background-size: cover;
}

.gw-select-us {
  background: url("~@/assets/images/countryFlags/us.svg") center no-repeat;
  background-size: cover;
}

.gw-select-cn {
  background: url("~@/assets/images/countryFlags/cn.svg") center no-repeat;
  background-size: cover;
}

.gw-selection-wrapper {
  position: absolute;
  z-index: 400;
  display: flex;
  width: 50%;
  top: 550px;
  justify-content: space-around;
  padding-left: 25%;
  padding-right: 25%;
}
</style>
