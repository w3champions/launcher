<template>
  <div class="picker-container">
    <div class="color-picker"></div>
    <div class="color-picker-text">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class ColorPicker extends Vue {
  @Prop() public text!: string;
  @Prop() public color!: string;
}
</script>

<style scoped type="text/css">

.color-picker {
  cursor: pointer;
  width: 26px;
  height: 26px;
  background-size: cover;
  background: url("~@/assets/images/colorSelect/color-01.png") no-repeat center;
}

.picker-container {
  height: 26px;
  display: flex;
  flex-direction: row;
}

.color-picker-text {
  height: 26px;
  line-height: 26px;
  padding-left: 10px;
  text-align: center;
}
</style>
