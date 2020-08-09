<template>
  <div id="app">
<!--    <LoadingScreen />-->
<!--    <SettingsScreen />-->
    <UpdateScreen />
    <HotKeySetupScreen />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UpdateScreen from "./update-handling/UpdateScreen.vue";
import LoadingScreen from "./screens/LoadingScreen.vue";
import MainScreen from "./screens/MainScreen/index.vue";
import SettingsScreen from "./screens/SettingsScreen/index.vue";
import HotKeySetupScreen from "./hot-keys/HotKeySetupScreen.vue";
import {ModifierKey} from "@/hot-keys/hotkeyTypes";
// import {ModifierKey} from "@/hot-keys/hotkeyTypes";
// import {
//   F1, F2, F3,
//   ITEM_BOTTOM_LEFT, ITEM_BOTTOM_RIGHT,
//   ITEM_MIDDLE_LEFT,
//   ITEM_MIDDLE_RIGHT,
//   ITEM_TOP_LEFT,
//   ITEM_TOP_RIGHT, SPACE
// } from "@/hot-keys/keyValuesRobotJs";

@Component({
  components: {
    HotKeySetupScreen,
    UpdateScreen,
    MainScreen,
    SettingsScreen,
    LoadingScreen,
  },
})
export default class App extends Vue {
  async mounted() {
    // const hotKeys = [
    //   {key: ITEM_TOP_LEFT, combo: { modifier: ModifierKey.None, hotKey: "q" }},
    //   {key: ITEM_MIDDLE_LEFT, combo: { modifier: ModifierKey.None, hotKey: "a" }},
    //   {key: ITEM_BOTTOM_LEFT, combo: { modifier: ModifierKey.None, hotKey: "z" }},
    //   {key: ITEM_TOP_RIGHT, combo: { modifier: ModifierKey.None, hotKey: "w" }},
    //   {key: ITEM_MIDDLE_RIGHT, combo: { modifier: ModifierKey.None, hotKey: "s" }},
    //   {key: ITEM_BOTTOM_RIGHT, combo: { modifier: ModifierKey.None, hotKey: "x" }},
    //
    //   {key: F1, combo: { modifier: ModifierKey.None, hotKey: "h" }},
    //   {key: F2, combo: { modifier: ModifierKey.None, hotKey: "j" }},
    //   {key: F3, combo: { modifier: ModifierKey.None, hotKey: "k" }},
    //
    //   {key: SPACE, combo: { modifier: ModifierKey.None, hotKey: "u" }}
    // ];
    //
    // hotKeys.forEach(h => this.$store.direct.dispatch.hotKeys.addHotKey(h));

    this.$store.direct.dispatch.hotKeys.toggle({ hotKey: "f4", modifier: ModifierKey.CommandOrControl });
    this.$store.direct.dispatch.hotKeys.loadHotKeys();
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/styles.scss";
</style>
