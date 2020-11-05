<template>
  <div>
    <div class="hotkey-enter-modal" :style="`visibility: ${modal ? 'visible' : 'hidden'}`">
      <div style="font-size: 30px">{{ editAbility.name }}:</div>
      <br/>
      <div class="hotkey-input">
        {{ hotkeyPressed }}
      </div>
      <div>
        <div class="modal-button" @click="addHotkey">Add</div>
        <div class="modal-button" @click="cancelHotkeyModal">Cancel</div>
        <div class="modal-button" @click="setDefaultHotkey">Reset to Default ({{ editAbility.defaultHotkey }})</div>
      </div>
    </div>
    <div class="race-table-wrapper">
      <div class="selection-wrapper">
        <div class="selection-header w3font">Units</div>
        <ItemSelectionContainer :on-click="selectUnit" :selection-items="units"/>
        <div class="selection-header w3font">{{ isNeutralUnitTab ? 'Heroes' : 'Buildings' }}</div>
        <ItemSelectionContainer :on-click="selectUnit" :selection-items="buildings"/>
        <div class="selection-header w3font">{{ isNeutralUnitTab ? 'Buildings' : 'Heroes' }}</div>
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
      <ButtonWarcraft style="position: absolute; bottom: 88px; right: 100px" :on-click="saveHotkeys" text="Save" />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {Ability, Building, Hero, Unit, W3cIcon} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
// eslint-disable-next-line no-unused-vars
import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";
import ItemSelectionContainer from "@/hot-keys/RaceSpecificHotkeys/ItemSelectionContainer.vue";
import ButtonWarcraft from "@/home/ButtonWarcraft.vue";

@Component({
  components: {ButtonWarcraft, ItemSelectionContainer}
})
export default class RaceSpecificHotkeyTab extends Vue {
  @Prop() public race!: HotkeyType;

  public modal = false;

  public hotkeyPressed = "";
  public editAbility = {} as Ability | null;
  public selectedAbility = {} as Ability | null;
  public selectedUnitExtendedAbility = {} as Ability | null;
  public selectedUnit = {} as Unit;
  public selectedUnitExtendedAbilities = [] as Ability[][];
  public selectedUnitAbilities = [] as Ability[][];

  @Watch("race")
  public onRaceChange() {
    this.closeModalAndResetVariables()
  }

  get isNeutralUnitTab() {
    return this.race === HotkeyType.neutral;
  }

  get heroes() {
    const compareValue = this.isNeutralUnitTab ? Building.name : Hero.name;
    return this.fillUp(this.hotKeys.units.filter(u => u.type === compareValue), 4, Unit.Default);
  }

  get buildings() {
    const compareValue = this.isNeutralUnitTab ? Hero.name : Building.name;
    return this.splitInArrayOf4Units(this.hotKeys.units.filter(u => u.type === compareValue) ?? []);
  }

  get units() {
    return this.splitInArrayOf4Units(this.hotKeys.units.filter(u => u.type === Unit.name) ?? []);
  }

  get selectedUnitName() {
    return this.selectedUnit?.name ?? ""
  }

  get selectedAbilityName() {
    return this.selectedAbility?.name ?? ""
  }

  public async saveHotkeys() {
    await this.$store.direct.dispatch.hotKeys.saveRaceHotkeyToFile();
  }

  public selectAbility(selection: Ability) {
    if (selection.name === "") {
      return;
    }
    this.selectedAbility = selection;
    this.selectedUnitExtendedAbilities = this.splitInArrayOf4Abilities(this.selectedAbility.abilities);
  }

  get hotKeys() {
    return this.$store.direct.state.hotKeys.raceHotkeyData.filter(h => h.hotkeyType === this.race)[0];
  }

  public cancelHotkeyModal() {
    this.closeModalAndResetVariables();
  }

  public async addHotkey() {
    if (!this.editAbility) return;

    await this.$store.direct.dispatch.hotKeys.setRaceHotkey(
        {
          hotKey: this.hotkeyPressed,
          hotkeyCommand: this.editAbility.hotkeyIdentifier,
          isResearchAbility: this.editAbility.isResearchAbility,
          additionalHotkeyIdentifiers: this.editAbility.additionalHotkeyIdentifiers
        });
    this.closeModalAndResetVariables();
  }

  public async setDefaultHotkey() {
    if (!this.editAbility) return;

    await this.$store.direct.dispatch.hotKeys.setRaceHotkey(
        {
          hotKey: this.editAbility.defaultHotkey,
          hotkeyCommand: this.editAbility.hotkeyIdentifier,
          isResearchAbility: this.editAbility.isResearchAbility,
          additionalHotkeyIdentifiers: this.editAbility.additionalHotkeyIdentifiers
        });
    this.closeModalAndResetVariables();
  }

  private closeModalAndResetVariables() {
    this.modal = false;
    this.editAbility = {} as Ability;
    this.hotkeyPressed = "";
  }

  public toKey(units: Unit[]) {
    return units.map(u => u.icon).join("_");
  }

  public selectExtendedAbility(selection: Ability) {
    if (selection.name === "") {
      return;
    }
    this.selectedUnitExtendedAbility = selection;
    this.openHotkeyDialog(selection);
  }

  public openHotkeysOrCreatNewPanel(selection: Ability) {
    if (selection.abilities.length > 0) {
      this.selectAbility(selection);
      this.openHotkeyDialog(selection);
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

    this.editAbility = selection;
    this.hotkeyPressed = selection.currentHotkey;
    this.modal = true;

    window.document.onkeydown = this.convertKeyPress;
  }

  private convertKeyPress(e: KeyboardEvent) {
    if (e.code === "Escape") {
      this.hotkeyPressed = "ESC"
      return;
    }
    if (!e.code.startsWith("Key")) return;

    if (e.key.length != 1) return;

    this.hotkeyPressed = e.key.toUpperCase();
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

.hotkey-enter-modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0, 0.8);
}

.hotkey-input {
  font-size: 30px;
  line-height: 30px;
  margin-bottom: 25px;
  text-align: center;
}

.modal-button {
  margin-left: 15px;
  margin-right: 15px;
  display: inline;
  cursor: pointer;
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
