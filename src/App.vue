<template>
  <div id="app" class="app-container">
    <HeadLine />
    <div class="content-modal-wrapper">
      <div class="content-modal">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import HeadLine from "@/home/HeadLine.vue";
const keyboard = window.require("send-keys-native/build/Release/send-keys-native")

@Component({
  components: {HeadLine}
})
export default class App extends Vue {
  async mounted() {
    const { autoUpdater } = window.require("electron-updater");
    autoUpdater.checkForUpdatesAndNotify();

    this.$store.direct.dispatch.loadIsTestMode();
    this.$store.direct.dispatch.loadOsMode();
    this.makeSureNumpadIsEnabled()

    this.$store.direct.dispatch.hotKeys.loadToggleKey();
    this.$store.direct.dispatch.hotKeys.loadHotKeys();
    this.$store.direct.dispatch.hotKeys.setToggleKey(this.$store.direct.state.hotKeys.toggleButton);
    this.$store.direct.dispatch.hotKeys.loadManualMode();

    this.$store.direct.dispatch.updateHandling.loadAllPaths();
    await this.$store.direct.dispatch.updateHandling.loadOnlineW3CVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentLauncherVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentW3CVersion();
  }

  get updateUrl() {
    const isOs = this.isWindows ? "win" : "mac"
    return `${this.$store.direct.state.updateUrl}api/launcher/${isOs}`
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
        console.log("Numpad is NOT activated, do hack:" + numlockState);
        keyboard.pressNumLock();
      } else {
        console.log("Numpad is activated, remove hack:" + numlockState);
      }

      window.document.onkeydown = null;
      window.document.onclick = null;
    }

    window.document.onclick = () => {
      keyboard.pressNumLock();
      keyboard.pressSpace();
    }
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

.download-button {
  background-color: transparent;
  margin-top: 50px;
  text-transform: uppercase;
  color: rgb(51, 38, 28);
  background-image: linear-gradient(rgba(255, 255, 0, 0.2) 50%, transparent 50%),
  linear-gradient(rgb(255, 209, 85), rgb(220, 166, 13));
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 0px 2px,
  rgba(236, 174, 6, 0.3) 0px 0px 40px 15px,
  rgba(255, 255, 255, 0.4) 0px 0px 0px 2px inset,
  rgba(255, 125, 19, 0.3) 0px 0px 20px 10px inset;
  text-shadow: rgb(51, 38, 28) 0px 0px;
  height: 56px;
  font-size: 26px;
  border-width: 0;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  border-radius: 2px;
  background-repeat: no-repeat;
  outline: 0;
  text-decoration: none;
  transition: filter 200ms ease 0s;
  padding: 24px 95px 0;

}

</style>
