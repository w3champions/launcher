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
import {ModifierKey} from "@/hot-keys/hotkeyTypes";
import HeadLine from "@/home/HeadLine.vue";

@Component({
  components: {HeadLine}
})
export default class App extends Vue {
  async mounted() {
    this.$store.direct.dispatch.hotKeys.setToggleKey({hotKey: "f4", modifier: ModifierKey.CommandOrControl});
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
@import url("https://rsms.me/inter/inter.css");

body {
  margin: 0;
  font-family: "Inter" !important;
  color: antiquewhite;
}

.app-container {
  background: url("~@/assets/images/backgrounds/arthas.png") center no-repeat;
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
  background: url("~@/assets/images/modal/frame.png") center no-repeat;
  background-size: cover;
  margin-top: 5vh;
  height: 76vh;
  width: 90%;
}

</style>
