<template>
  <div class="race-table-wrapper">
    <div class="selection-wrapper">
      <div class="selection-header w3font">Units</div>
      <table class="selection-background">
        <tr v-for="line in lines" :key="line">
          <td class="single-selection-item" v-for="item in line" :key="item">
            <div class="item-selection-hover" @click="() => selectUnit(item)">{{item}}</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font">Buildings</div>
      <table class="selection-background">
        <tr v-for="line in lines" :key="line">
          <td class="single-selection-item" v-for="item in line" :key="item">
            <div class="item-selection-hover" @click="() => selectBuilding(item)">{{item}}</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font">Heroes</div>
      <table class="selection-background selection-background-single-line">
        <tr>
          <td class="single-selection-item" v-for="item in heroes" :key="item">
            <div class="item-selection-hover" @click="() => selectHero(item)">{{item}}</div>
          </td>
        </tr>
      </table>
    </div>
    <div class="selection-wrapper">
      <div class="selection-header w3font" :class="selectedUnitName ? 'visible' : 'hidden'">Selected:
        {{ selectedUnitName }}</div>
      <table class="selection-background" :class="selectedUnitName ? 'visible' : 'hidden'">
        <tr v-for="line in lines" :key="line">
          <td class="single-selection-item" v-for="item in line" :key="item">
            <div class="item-selection-hover" @click="() => selectAbility(item)">{{item}}</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font" :class="selectedAbilityName ? 'visible' : 'hidden'">{{ selectedAbilityName }}</div>
      <table class="selection-background" :class="selectedAbilityName ? 'visible' : 'hidden'">
        <tr v-for="line in lines" :key="line">
          <td class="single-selection-item" v-for="item in line" :key="item">
            <div class="item-selection-hover" @click="() => selectAbility(item)">{{item}}</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font" style="visibility: hidden">{{ selectedAbilityName }}</div>
      <table style="visibility: hidden"  class="selection-background selection-background-single-line">
        <tr>
          <td class="single-selection-item" v-for="item in heroes" :key="item">
            <div class="item-selection-hover">{{item}}</div>
          </td>
        </tr>
      </table>
    </div>
    <div class="hero-wrapper">

    </div>


  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
/* eslint-disable */
import {HotkeyTabs} from "@/hot-keys/hotkeyTypes";

@Component
export default class RaceTab extends Vue {

  @Prop() public race!: HotkeyTabs;

  public lines = [[1,2,3,15], [4,5,6,25], [7,8,9,35]];
  public selectedUnitName = 0;
  public selectedAbilityName = 0;

  get heroes() {
    return [1,2,3,5];
  }

  public selectAbility(index: number) {
    console.log(index);
    this.selectedAbilityName = index;
  }

  public selectHero(index: number) {
    console.log(index);
    this.selectedUnitName = index;
    this.selectedAbilityName = 0;
  }

  public selectUnit(index: number) {
    console.log(index);
    this.selectedUnitName = index;
    this.selectedAbilityName = 0;
  }

  public selectBuilding(index: number) {
    console.log(index);
    this.selectedUnitName = index;
    this.selectedAbilityName = 0;
  }
}
</script>

<style scoped type="text/css">
.race-table-wrapper {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.selection-header {
  font-size: 18px;
  margin-top: 8px;
}

.visible {
  visibility: visible;
}

.hidden {
  visibility: hidden;
}

.single-selection-item {
  background: url("~@/assets/images/hotkeys/itemLogos/btnarcher.jpg") no-repeat center;
  background-size: cover;
  height: 64px;
  width: 64px;
  padding: 0 !important;
}

.item-selection-hover:hover{
  background: url("~@/assets/images/hotkeys/Hotkeys_Button_Highlight.png") no-repeat center;
  background-size: cover;
  line-height: 64px;
  height: 64px;
  width: 64px;
}

.selection-wrapper {
  margin-left: 50px;
}

.selection-background {
  padding: 5px;
  background: url("~@/assets/images/hotkeys/Hotkeys_Full_Frame.png") no-repeat center;
  background-size: cover;
}

.selection-background-single-line {
  background: url("~@/assets/images/hotkeys/Hotkeys_Heroes_Frame.png") no-repeat center;
  background-size: cover;
}
</style>
