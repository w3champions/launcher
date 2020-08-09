<template>
  <div id="app" class="app-container">
    <HeadLine />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {ModifierKey} from "@/hot-keys/hotkeyTypes";
import HeadLine from "@/home/HeadLine.vue";

@Component({
  components: {HeadLine}
})
export default class App extends Vue {
  async mounted() {
    this.$store.direct.dispatch.hotKeys.toggle({hotKey: "f4", modifier: ModifierKey.CommandOrControl});
    this.$store.direct.dispatch.hotKeys.loadHotKeys();

    this.$store.direct.dispatch.loadIsTestMode();
    this.$store.direct.dispatch.updateHandling.loadAllPaths();
    await this.$store.direct.dispatch.loadNews();
    await this.$store.direct.dispatch.updateHandling.loadOnlineLauncherVersion();
    await this.$store.direct.dispatch.updateHandling.loadOnlineW3CVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentLauncherVersion();
    await this.$store.direct.dispatch.updateHandling.loadCurrentW3CVersion();
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "BlizQuadrata Web";
  src: url("~@/assets/fonts/blq55web.ttf") format("tff");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "BlizQuadrata Web";
  src: url("~@/assets/fonts/blq85web.ttf") format("tff");
  font-weight: 700;
  font-style: normal;
}

.primary {
  color: #ffcf00;
}

body {
  margin: 0;
}

.app-container {
  background: url("~@/assets/images/backgrounds/arthas.png") center no-repeat;
  height: 100vh;
  background-size: cover;
}

</style>
