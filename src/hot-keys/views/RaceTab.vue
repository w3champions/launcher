<template>
  <div class="race-table-wrapper">
    <div class="selection-wrapper">
      <div class="selection-header w3font">Units</div>
      <table class="selection-background">
        <tr v-for="line in units" :key="line">
          <td class="single-selection-item" v-for="item in line" :key="item.icon">
            <div class="item-selection-hover" @click="() => selectUnit(item)">{{item}}</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font">Buildings</div>
      <table class="selection-background">
        <tr v-for="line in buildings" :key="line">
          <td class="single-selection-item" v-for="item in line" :key="item.icon">
            <div class="item-selection-hover" @click="() => selectUnit(item)">{{item.name}}</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font">Heroes</div>
      <table class="selection-background selection-background-single-line">
        <tr>
          <td class="single-selection-item" v-for="item in heroes" :key="item.icon">
            <div class="item-selection-hover" @click="() => selectUnit(item)">{{item.name}}</div>
          </td>
        </tr>
      </table>
    </div>
    <div class="selection-wrapper">
      <div class="selection-header w3font" :class="selectedUnit ? 'visible' : 'hidden'">
        Selected: {{ selectedUnitName }}
      </div>
      <table class="selection-background" :class="selectedUnit ? 'visible' : 'hidden'">
        <tr v-for="line in selectedUnitAbilities" :key="line">
          <td class="single-selection-item" v-for="item in line" :key="item">
            <div class="item-selection-hover" @click="getSelectionFunction()">{{item}}</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font" :class="selectedAbility ? 'visible' : 'hidden'">{{ selectedAbilityName }}</div>
      <table class="selection-background" :class="selectedAbility ? 'visible' : 'hidden'">
        <tr v-for="line in selectedUnitExtendedAbilities" :key="line">
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
    <div class="hero-wrapper" />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
/* eslint-disable */
import {Ability, HotkeyType, Unit} from "@/hot-keys/hotkeyTypes";

@Component
export default class RaceTab extends Vue {
  @Prop() public race!: HotkeyType;

  public selectedAbility = {} as Ability | null;
  public selectedUnit = {} as Unit;

  get heroes() {
    return this.hotKeys.heroes;
  }

  get buildings() {
    return this.splitInArrayOf4(this.hotKeys.buildings);
  }

  get units() {
    return this.splitInArrayOf4(this.hotKeys.units);
  }

  get selectedUnitName() {
    return this.selectedUnit?.name ?? ""
  }

  get selectedAbilityName() {
    return this.selectedAbility?.name ?? ""
  }

  get selectedUnitAbilities() {
    return this.splitInArrayOf4(this.selectedUnit.abilities);
  }

  get selectedUnitExtendedAbilities() {
    return this.splitInArrayOf4(this.selectedAbility?.abilities ?? []);
  }

  public selectAbility(selection: Ability) {
    this.selectedAbility = selection;
  }

  get hotKeys() {
    return this.$store.direct.state.hotKeys.customHotkeys.filter(h => h.hotkeyType === this.race)[0];
  }

  public getSelectionFunction(selection: Ability) {
    if (selection.constructor.name === 'Ability') {
      return this.selectAbility;
    } else {
      // todo
      return this.selectAbility;
    }
  }

  public selectUnit(selection: Unit) {
    this.selectedUnit = selection;
    this.selectedAbility = {} as Ability;
  }

  private splitInArrayOf4<T>(elements: T[]) {
    const elementsPadded = [...elements, ...new Array<T>(12 - elements.length).fill({} as T)];

    return elementsPadded.reduce((result, value, index, array) => {
      if (index % 4 === 0)
        result.push(array.slice(index, index + 4));
      return result;
    }, [] as T[][]);
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
  background: url("~@/assets/images/hotkeys/itemLogos/nightelf/btnarcher.jpg") no-repeat center;
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
