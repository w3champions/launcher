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
  @Prop() public onSwitchColor!: (newColor: string) => {};
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

<style scoped type="text/css">

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

/*from time to time i just hate this webpack fuck, if you read this, please make it nicer? =D*/
.color-00 {
  background: url('~@/assets/images/colorSelect/color-00.png') center no-repeat;
  background-size: cover;
}

.color-01 {
  background: url('~@/assets/images/colorSelect/color-01.png') center no-repeat;
  background-size: cover;
}

.color-02{
  background: url('~@/assets/images/colorSelect/color-02.png') center no-repeat;
  background-size: cover;
}

.color-03{
  background: url('~@/assets/images/colorSelect/color-03.png') center no-repeat;
  background-size: cover;
}


.color-04{
  background: url('~@/assets/images/colorSelect/color-04.png') center no-repeat;
  background-size: cover;
}

.color-05{
  background: url('~@/assets/images/colorSelect/color-05.png') center no-repeat;
  background-size: cover;
}

.color-06{
  background: url('~@/assets/images/colorSelect/color-06.png') center no-repeat;
  background-size: cover;
}

.color-07{
  background: url('~@/assets/images/colorSelect/color-07.png') center no-repeat;
  background-size: cover;
}

.color-08{
  background: url('~@/assets/images/colorSelect/color-08.png') center no-repeat;
  background-size: cover;
}

.color-09{
  background: url('~@/assets/images/colorSelect/color-09.png') center no-repeat;
  background-size: cover;
}

.color-10{
  background: url('~@/assets/images/colorSelect/color-10.png') center no-repeat;
  background-size: cover;
}

.color-11{
  background: url('~@/assets/images/colorSelect/color-11.png') center no-repeat;
  background-size: cover;
}

.color-12{
  background: url('~@/assets/images/colorSelect/color-12.png') center no-repeat;
  background-size: cover;
}

.color-13{
  background: url('~@/assets/images/colorSelect/color-13.png') center no-repeat;
  background-size: cover;
}

.color-14{
  background: url('~@/assets/images/colorSelect/color-14.png') center no-repeat;
  background-size: cover;
}

.color-15{
  background: url('~@/assets/images/colorSelect/color-15.png') center no-repeat;
  background-size: cover;
}

.color-16{
  background: url('~@/assets/images/colorSelect/color-16.png') center no-repeat;
  background-size: cover;
}

.color-17{
  background: url('~@/assets/images/colorSelect/color-17.png') center no-repeat;
  background-size: cover;
}

.color-18{
  background: url('~@/assets/images/colorSelect/color-18.png') center no-repeat;
  background-size: cover;
}

.color-19{
  background: url('~@/assets/images/colorSelect/color-19.png') center no-repeat;
  background-size: cover;
}

.color-20{
  background: url('~@/assets/images/colorSelect/color-20.png') center no-repeat;
  background-size: cover;
}

.color-21{
  background: url('~@/assets/images/colorSelect/color-21.png') center no-repeat;
  background-size: cover;
}

.color-22{
  background: url('~@/assets/images/colorSelect/color-22.png') center no-repeat;
  background-size: cover;
}

.color-23{
  background: url('~@/assets/images/colorSelect/color-23.png') center no-repeat;
  background-size: cover;
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
