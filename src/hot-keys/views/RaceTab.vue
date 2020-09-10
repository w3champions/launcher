<template>
  <div>
    {{race}}
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class RaceTab extends Vue {

  @Prop() public race!: string;

}
</script>

<style scoped type="text/css">
</style>
