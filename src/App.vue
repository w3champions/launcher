<template>
  <div id="app">
    <SettingsScreen />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import W3CLauncher from "./components/W3CLauncher.vue";
import MainScreen from "./screens/MainScreen/index.vue";
import SettingsScreen from "./screens/SettingsScreen/index.vue";

@Component({
  components: {
    W3CLauncher,
    MainScreen,
    SettingsScreen,
  },
})
export default class App extends Vue {}
</script>
