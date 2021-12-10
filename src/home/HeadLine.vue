<template>
  <div class="headline-wrapper">
    <div class="headline-container">
      <HeadItem target="/" text="W3Champions" />
      <HeadItem target="/HotKeys/0" text="Hotkeys"/>
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
  top: 5%;
  left: 24%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding:0%;
  width: 680px;
  height: 9%;

  background: url("~@/assets/images/home/Header_Buttons_Frame.png") center no-repeat;
  background-size: cover;
}

.headline-wrapper {
  position: inline;
  width: 100%;
  height: 15%;
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
</style>
