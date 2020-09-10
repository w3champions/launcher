<template>
  <div>
    {{race}}
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
/* eslint-disable */
import {HotkeyTabs} from "@/hot-keys/hotkeyTypes";

@Component
export default class RaceTab extends Vue {

  @Prop() public race!: HotkeyTabs;

}
</script>

<style scoped type="text/css">
</style>
