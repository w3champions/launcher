<template>
  <div class="headline-container">
    <HeadItem target="/" text="Home"/>
    <HeadItem target="/HotKeys" text="Hot Keys"/>
    <SettingsButton/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import HeadItem from "@/home/HeadItem.vue";
import SettingsButton from "@/home/SettingsButton.vue";

@Component({
  components: {SettingsButton, HeadItem}
})
export default class HeadLine extends Vue {
}
</script>

<style scoped type="text/css">
.headline-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 12vh;

  -webkit-user-select: none;
  -webkit-app-region: drag;

  background: url("~@/assets/images/modal/header.png") center no-repeat;
  background-size: cover;
}

</style>
