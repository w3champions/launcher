<template>
  <div class="race-table-wrapper">
    <div class="selection-wrapper">
      <div class="selection-header w3font">Units</div>
      <ItemSelectionContainer :on-click="selectUnit" :selection-items="units"/>
      <div class="selection-header w3font">Buildings</div>
      <ItemSelectionContainer :on-click="selectUnit" :selection-items="buildings"/>
      <div class="selection-header w3font">Heroes</div>
      <ItemSelectionContainer :single-row="true" :on-click="selectUnit" :selection-items="heroes"/>
    </div>
    <div class="selection-wrapper">
      <div class="selection-header w3font" :class="selectedUnit.icon ? 'visible' : 'hidden'">
        Selected: {{ selectedUnitName }}
      </div>
      <ItemSelectionContainer :class="selectedUnit.icon ? 'visible' : 'hidden'" :on-click="openHotkeysOrCreatNewPanel" :selection-items="selectedUnitAbilities"/>
      <div class="selection-header w3font" :class="selectedAbility.icon ? 'visible' : 'hidden'">Ability: {{ selectedAbilityName }}</div>
      <ItemSelectionContainer :class="selectedAbility.icon ? 'visible' : 'hidden'" :on-click="selectExtendedAbility" :selection-items="selectedUnitExtendedAbilities"/>
      <div class="selection-header w3font" style="visibility: hidden">.</div>
      <ItemSelectionContainer style="visibility: hidden" :single-row="true" :on-click="selectUnit" :selection-items="heroes"/>
    </div>
    <div class="hero-wrapper" />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Ability, Unit} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
// eslint-disable-next-line no-unused-vars
import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";
import ItemSelectionContainer from "@/hot-keys/RaceSpecificHotkeys/ItemSelectionContainer.vue";
@Component({
  components: {ItemSelectionContainer}
})
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

.selection-wrapper {
  margin-left: 50px;
}

.visible {
  visibility: visible;
}

.hidden {
  visibility: hidden;
}
</style>
