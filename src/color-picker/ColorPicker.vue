<template>
  <div class="picker-container">
    <div class="color-picker-border">
      <div class="color-picker" :class="`color-${color}`" @click="toggleModal"></div>
    </div>
    <div class="color-picker-text">{{ text }}</div>
    <div class="color-picker-modal" :style="{visibility: modalOpen ? 'visible' : 'hidden'}">
      <div class="color-selector-row" v-for="outer in colorGrid" :key="outer.toString()">
        <div @click="() => switchColor(color)" class="color-selector" v-for="color in outer" :key="color" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class ColorPicker extends Vue {
  @Prop() public text!: string;
  @Prop() public color!: string;
  // eslint-disable-next-line no-unused-vars
  @Prop() public onSwitchColor!: (newColor: string) => void;
  modalOpen = false;

  public switchColor(color: string) {
    this.modalOpen = false;
    this.onSwitchColor(color);
    document.onclick = null;
  }

  public colorGrid = [
    [ "00", "01", "02", "03", "04", "05"],
    [ "06", "07", "08", "09", "10", "11"],
    [ "12", "13", "14", "15", "16", "17"],
    [ "18", "19", "20", "21", "22", "23"],
  ]

  public toggleModal() {
    this.modalOpen = !this.modalOpen;

    if (this.modalOpen) {
      document.onclick = (e: any) => {
        console.log(e.target.className);
        if (e.target.className !== "color-picker-modal"
            && !e.target.className.startsWith("color-selector")
            && e.target.className !== "color-selector-row"
            && !e.target.className.startsWith("color-picker")) {
          document.onclick = null;
          this.modalOpen = false;
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

.color-picker {
  cursor: pointer;
  width: 26px;
  height: 26px;
}

.color-selector{
  margin: 5px;
  height: 34px;
  width: 50px;
}

.picker-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.color-picker-text {
  padding-left: 5px;
  text-align: center;
}

.color-picker-modal {
  padding: 15px;
  position: absolute;
  z-index: 100;
  background: url('~@/assets/images/colorSelect/PopupMenu.png') center no-repeat;
  background-size: cover;
  width: 281px;
  height: 181px;
}

.color-selector-row {
  display: flex;
  flex-direction: row;
}

@function zerofill($i) { @return #{str-slice("00",0,2 - str-length(#{$i}))}#{$i}; }

@for $i from 0 through 23 {
  $i: zerofill($i);
  .color-#{$i} {
    background: url('~@/assets/images/colorSelect/color-#{$i}.png') center no-repeat;
    background-size: cover;
  }
}

.color-picker-border {
  background: url("~@/assets/images/settings/Settings_Color_Frame.png") center no-repeat;
  background-size: cover;
  width: 52px;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
