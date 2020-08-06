<template>
  <div id="app">
<!--    <LoadingScreen />-->
<!--    <SettingsScreen />-->
    <UpdateScreen />
    <HotKeySetupScreen />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UpdateScreen from "./update-handling/UpdateScreen.vue";
import LoadingScreen from "./screens/LoadingScreen.vue";
import MainScreen from "./screens/MainScreen/index.vue";
import SettingsScreen from "./screens/SettingsScreen/index.vue";
import HotKeySetupScreen from "./hot-keys/HotKeySetupScreen.vue";

@Component({
  components: {
    HotKeySetupScreen,
    UpdateScreen,
    MainScreen,
    SettingsScreen,
    LoadingScreen,
  },
})
export default class App extends Vue {}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/styles.scss";
</style>
