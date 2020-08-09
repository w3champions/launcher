<template>
  <div id="app" class="app-container">
    <button @click="goToHome">Home</button>
    <button @click="goToSettings">Settings</button>
    <button @click="goToHotkeys">Hotkeys</button>
    <div>
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {ModifierKey} from "@/hot-keys/hotkeyTypes";

@Component({})
export default class App extends Vue {
  async mounted() {
    this.$store.direct.dispatch.hotKeys.toggle({ hotKey: "f4", modifier: ModifierKey.CommandOrControl });
    this.$store.direct.dispatch.hotKeys.loadHotKeys();

    this.$store.direct.dispatch.loadIsTestMode();
    this.$store.direct.dispatch.updateHandling.loadAllPaths();
    await this.$store.direct.dispatch.loadNews();
    await this.$store.direct.dispatch.updateHandling.loadOnlineLauncherVersion();
    await this.$store.direct.dispatch.updateHandling.loadOnlineW3CVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentLauncherVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentW3CVersion();
  }

  public goToHotkeys() {
    this.$router.push({
      path: "/HotKeys"
    })
  }

  public goToSettings() {
    this.$router.push({
      path: "/Settings"
    })
  }

  public goToHome() {
    this.$router.push({
      path: "/"
    })
  }
}
</script>

<style lang="scss">
@import "~@/assets/sass/styles.scss";

.app-container {
  background: url("~@/assets/images/backgrounds/arthas.png") center no-repeat;
  height: 100vh;
  background-size: cover;
}

</style>
