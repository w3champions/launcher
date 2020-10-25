<template>
  <div class="race-table-wrapper">
    <div class="selection-wrapper">
      <div class="selection-header w3font">Units</div>
      <table class="selection-background">
        <tr v-for="line in units" :key="toKey(line)">
          <td class="single-selection-item" v-for="item in line" :key="item.icon" :class="getImgClass(item.icon)">
            <div class="item-selection-hover" @click="() => selectUnit(item)">.</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font">Buildings</div>
      <table class="selection-background">
        <tr v-for="line in buildings" :key="toKey(line)">
          <td class="single-selection-item" v-for="item in line" :key="item.icon" :class="getImgClass(item.icon)">
            <div class="item-selection-hover" @click="() => selectUnit(item)">.</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font">Heroes</div>
      <table class="selection-background selection-background-single-line">
        <tr>
          <td class="single-selection-item" v-for="item in heroes" :key="item.icon" :class="getImgClass(item.icon)">
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
          <td class="single-selection-item" v-for="item in line" :key="item.icon" :class="getImgClass(item.icon)">
            <div class="item-selection-hover" @click="() => openHotkeysOrCreatNewPanel(item)">.</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font" :class="selectedAbility.icon ? 'visible' : 'hidden'">Ability: {{ selectedAbilityName }}</div>
      <table class="selection-background" :class="selectedAbility.icon ? 'visible' : 'hidden'">
        <tr v-for="line in selectedUnitExtendedAbilities" :key="toKey(line)">
          <td class="single-selection-item" v-for="item in line" :key="item.icon" :class="getImgClass(item.icon)">
            <div class="item-selection-hover" @click="() => selectExtendedAbility(item)">.</div>
          </td>
        </tr>
      </table>
      <div class="selection-header w3font" style="visibility: hidden">.</div>
      <table style="visibility: hidden"  class="selection-background selection-background-single-line">
        <tr>
          <td class="single-selection-item" v-for="item in heroes" :key="item.icon" :class="getImgClass(item.icon)">
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
// eslint-disable-next-line no-unused-vars
import {Ability, Unit, W3cIcon} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
// eslint-disable-next-line no-unused-vars
import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";

@Component
export default class RaceSpecificHotkeyTab extends Vue {
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

  public getImgClass(image: string) {
    return `${HotkeyType[this.race]}-${image}`
  }

  public selectAbility(selection: Ability) {
    if (selection.name === "") {
      return;
    }
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
    if (selection.name === "") {
      return;
    }
    this.selectedUnitExtendedAbility = selection;
  }


  public openHotkeysOrCreatNewPanel(selection: Ability) {
    if (selection.abilities.length > 0) {
      this.selectAbility(selection);
    } else {
      this.openHotkeyDialog(selection);
    }
  }

  public selectUnit(selection: Unit) {
    if (selection.name === "") {
      return;
    }
    this.selectedUnit = selection;
    this.selectedAbility = {} as Ability;
    this.selectedUnitAbilities = this.splitInArrayOf4Abilities(this.selectedUnit?.abilities ?? []);
    this.selectedUnitExtendedAbilities = this.splitInArrayOf4Abilities(this.selectedAbility?.abilities ?? []);
  }

  public openHotkeyDialog(selection: Ability) {
    if (selection.name === "") {
      return
    }
    alert(`${selection?.icon} + ${selection?.name} + ${selection?.defaultHotkey}`);
  }

  private splitInArrayOf4Units(elements: Unit[]) {
    const elemsWithId = this.fillUp(elements, 12, Unit.Default);
    return this.splitIn4s(elemsWithId) as Unit[][];
  }

  private splitInArrayOf4Abilities(elements: Ability[]) {
    const elemsWithId = this.fillUp(elements, 12, Ability.Default);
    return this.splitIn4s(elemsWithId) as Ability[][];
  }

  private fillUp(elements: W3cIcon[], max: number, filler: (index: string) => W3cIcon) {
    const envs = []
    elements.forEach(e => envs.push(e));
    for (let i = 0; i < max - elements.length; i++) {
      const f = filler(i.toString());
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
.human-btnarcanevault{
  background: url("~@/assets/images/hotkeys/icons/human/btnarcanevault.jpg") no-repeat center;
  background-size: cover;
}

.human-btnhumanbuild{
  background: url("~@/assets/images/hotkeys/icons/human/btnhumanbuild.jpg") no-repeat center;
  background-size: cover;
}

.human-btnrepair{
  background: url("~@/assets/images/hotkeys/icons/human/btnrepair.jpg") no-repeat center;
  background-size: cover;
}

.human-btncalltoarms{
  background: url("~@/assets/images/hotkeys/icons/human/btncalltoarms.jpg") no-repeat center;
  background-size: cover;
}

.human-btnfootman{
  background: url("~@/assets/images/hotkeys/icons/human/btnfootman.jpg") no-repeat center;
  background-size: cover;
}

.human-btndefend{
  background: url("~@/assets/images/hotkeys/icons/human/btndefend.jpg") no-repeat center;
  background-size: cover;
}

.human-btnpeasant{
  background: url("~@/assets/images/hotkeys/icons/human/btnpeasant.jpg") no-repeat center;
  background-size: cover;
}

.human-btntownhall{
  background: url("~@/assets/images/hotkeys/icons/human/btntownhall.jpg") no-repeat center;
  background-size: cover;
}

.human-btnattack{
  background: url("~@/assets/images/hotkeys/icons/human/btnattack.jpg") no-repeat center;
  background-size: cover;
}

.human-btnmove{
  background: url("~@/assets/images/hotkeys/icons/human/btnmove.jpg") no-repeat center;
  background-size: cover;
}

.human-btnpatrol{
  background: url("~@/assets/images/hotkeys/icons/human/btnpatrol.jpg") no-repeat center;
  background-size: cover;
}

.human-btngathergold{
  background: url("~@/assets/images/hotkeys/icons/human/btngathergold.jpg") no-repeat center;
  background-size: cover;
}

.human-btnstop{
  background: url("~@/assets/images/hotkeys/icons/human/btnstop.jpg") no-repeat center;
  background-size: cover;
}

.human-btnholdposition{
  background: url("~@/assets/images/hotkeys/icons/human/btnholdposition.jpg") no-repeat center;
  background-size: cover;
}

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
