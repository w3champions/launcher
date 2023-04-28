<template>
  <div class="headline-wrapper">
    <div class="headline-container">
      <HeadItem target="/" text="W3Champions" />
      <HeadItem target="/HotKeys/0" text="Hotkeys"/>
      <HeadItem target="/Status" text="Status"/>
      <HeadItem target="/Settings" text="Settings"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import HeadItem from "@/home/HeadItem.vue";

@Component({
  components: {HeadItem}
})
export default class HeadLine extends Vue {
  get isWindows() {
    return this.$store.state.isWindows;
  }
}
</script>

<style scoped type="text/css">
.headline-container {
  position: absolute;
  vertical-align: middle;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  width: 100vw;
  height: 13vh;
}

.headline-wrapper {
  margin-left:1%;
  width: 100%;
  height: 15%;
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
</style>
