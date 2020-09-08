<template>
  <div class="headline-container">
    <HeadItem target="/" text="W3Champions" />
    <HeadItem target="/HotKeys" text="Hotkeys"/>
    <HeadItem target="/Settings" text="Settings"/>
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
  top: 60px;
  left: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  -webkit-user-select: none;
  -webkit-app-region: drag;

  width: 671px;
  height: 71px;

  background: url("~@/assets/images/home/Header_Buttons_Frame.png") center no-repeat;
  background-size: cover;
}

</style>
