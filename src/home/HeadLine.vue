<template>
  <div class="header-stuff">
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
.header-stuff {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  vertical-align: baseline;
  width: 100%;
  height: 12vh;

  background: url("~@/assets/images/modal/header.png") center no-repeat;
  background-size: cover;
}

</style>
