<template>
  <div class="race-table-wrapper">
    <div class="selection-wrapper">
      <div class="selection-header w3font">Units</div>
      <table class="selection-background">
        <tr v-for="line in units" :key="toKey(line)">
          <td class="single-selection-item" v-for="item in line" :key="item.icon">
            <div class="item-selection-hover" @click="() => selectUnit(item)">.</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font">Buildings</div>
      <table class="selection-background">
        <tr v-for="line in buildings" :key="toKey(line)">
          <td class="single-selection-item" v-for="item in line" :key="item.icon">
            <div class="item-selection-hover" @click="() => selectUnit(item)">.</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font">Heroes</div>
      <table class="selection-background selection-background-single-line">
        <tr>
          <td class="single-selection-item" v-for="item in heroes" :key="item.icon">
            <div class="item-selection-hover" @click="() => selectUnit(item)">.</div>
          </td>
        </tr>
      </table>
    </div>
    <div class="selection-wrapper">
      <div class="selection-header w3font" :class="selectedUnit.icon ? 'visible' : 'hidden'">
        Selected: {{ selectedUnitName }}
      </div>
      <table class="selection-background" :class="selectedUnit.icon ? 'visible' : 'hidden'">
        <tr v-for="line in selectedUnitAbilities" :key="toKey(line)">
          <td class="single-selection-item" v-for="item in line" :key="item.icon">
            <div class="item-selection-hover" @click="() => openHotkeysOrCreatNewPanel(item)">.</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font" :class="selectedAbility.icon ? 'visible' : 'hidden'">Ability: {{ selectedAbilityName }}</div>
      <table class="selection-background" :class="selectedAbility.icon ? 'visible' : 'hidden'">
        <tr v-for="line in selectedUnitExtendedAbilities" :key="toKey(line)">
          <td class="single-selection-item" v-for="item in line" :key="item.icon">
            <div class="item-selection-hover" @click="() => selectExtendedAbility(item)">.</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font" style="visibility: hidden">.</div>
      <table style="visibility: hidden"  class="selection-background selection-background-single-line">
        <tr>
          <td class="single-selection-item" v-for="item in heroes" :key="item.icon">
            <div class="item-selection-hover">.</div>
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
import {Ability, HotkeyType, Unit, W3cIcon} from "@/hot-keys/hotkeyTypes";

@Component
export default class RaceTab extends Vue {
  @Prop() public race!: HotkeyType;

  public selectedAbility = {} as Ability | null;
  public selectedUnitExtendedAbility = {} as Ability | null;
  public selectedUnit = {} as Unit;
  public selectedUnitExtendedAbilities = [] as Ability[][];
  public selectedUnitAbilities = [] as Ability[][];

  get heroes() {
    return this.fillUp(this.hotKeys.heroes, 4, Unit.Default);
  }

  get buildings() {
    return this.splitInArrayOf4Units(this.hotKeys.buildings ?? []);
  }

  get units() {
    return this.splitInArrayOf4Units(this.hotKeys.units ?? []);
  }

  get selectedUnitName() {
    return this.selectedUnit?.name ?? ""
  }

  get selectedAbilityName() {
    return this.selectedAbility?.name ?? ""
  }

  public selectAbility(selection: Ability) {
    this.selectedAbility = selection;
    this.selectedUnitExtendedAbilities = this.splitInArrayOf4Abilities(this.selectedAbility.abilities);
  }

  get hotKeys() {
    return this.$store.direct.state.hotKeys.customHotkeys.filter(h => h.hotkeyType === this.race)[0];
  }

  public toKey(units: Unit[]) {
    return units.map(u => u.icon).join("_");
  }

  public selectExtendedAbility(selection: Ability) {
    this.selectedUnitExtendedAbility = selection;
    alert(this.selectedUnitExtendedAbility.icon + " " + this.selectedUnitExtendedAbility.name)
  }


  public openHotkeysOrCreatNewPanel(selection: Ability) {
    if (selection.abilities.length > 0) {
      this.selectAbility(selection);
    } else {
      this.openHotkeyDialog(selection);
    }
  }

  public selectUnit(selection: Unit) {
    this.selectedUnit = selection;
    this.selectedAbility = {} as Ability;
    this.selectedUnitAbilities = this.splitInArrayOf4Abilities(this.selectedUnit?.abilities ?? []);
    this.selectedUnitExtendedAbilities = this.splitInArrayOf4Abilities(this.selectedAbility?.abilities ?? []);
  }

  public openHotkeyDialog(ability: Ability) {
    alert(`${ability?.icon} + ${ability?.name}`);
  }

  private splitInArrayOf4Units(elements: Unit[]) {
    const elemsWithId = this.fillUp(elements, 12, Unit.Default);
    return this.splitIn4s(elemsWithId) as Unit[][];
  }

  private splitInArrayOf4Abilities(elements: Ability[]) {
    const elemsWithId = this.fillUp(elements, 12, Ability.Default);
    return this.splitIn4s(elemsWithId) as Ability[][];
  }

  private fillUp(elements: W3cIcon[], max: number, filler: () => W3cIcon) {
    const envs = []
    elements.forEach(e => envs.push(e));
    for (let i = 0; i < max - elements.length; i++) {
      const f = filler();
      f.icon = `${elements.length + i}`;
      envs.push(f)
    }
    return envs;
  }

  private splitIn4s<T>(elementsPadded: T[]) {
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
