<template>
  <div id="app">
    <LoadingScreen />
    <SettingsScreen />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import W3CLauncher from "./components/W3CLauncher.vue";
import LoadingScreen from "./screens/LoadingScreen.vue";
import MainScreen from "./screens/MainScreen/index.vue";
import SettingsScreen from "./screens/SettingsScreen/index.vue";

@Component({
  components: {
    W3CLauncher,
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
