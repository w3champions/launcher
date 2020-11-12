<template>
  <div>
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
      <ButtonWarcraft style="position: absolute; bottom: 158px; right: 100px" :on-click="importHotkeys" text="Import" />
      <ButtonWarcraft style="position: absolute; bottom: 88px; right: 100px" :on-click="saveHotkeys" text="Save" />
    </div>
    <div style="position:absolute; left: 905px; top: 172px; font-size: 18px;"  class="w3font">
      {{ editAbility.name }}
    </div>
    <div style="position:absolute; right: 80px; top: 193px" :class="editAbility.icon ? 'visible' : 'hidden'" class="current-selection-container">
      <div style="display: flex; flex-direction: row">
        <div style="height: 64px; width: 64px; margin: 10px; display: flex" class="w3font" :class="editAbility.icon">
          <div style="padding-top: 45px; position: absolute; right: 222px">
             {{ parseHotkey(editAbility.currentHotkey) }}
          </div>
        </div>
        <div style="margin-top: 15px">
          <div class="w3font">Press desired key</div>
          <div style="cursor: pointer; color: aliceblue; margin-top: 18px; font-size: 14px" class="w3font" @click="resetKey">Reset default: {{parseHotkey(editAbility.defaultHotkey)}}</div>
        </div>
      </div>
      <div style="margin-top: 25px" class="w3font"><div style="display:inline; ">hotkey location</div><div @click="resetGrid" style=" float: right; margin-right: 20px; cursor: pointer; color: aliceblue; display:inline; font-size: 14px">(Reset)</div></div>
      <ItemSelectionContainer style="margin-top: 10px" :on-click="selectGridForAbility" :selection-items="selectionGrid"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {Ability, Building, Grid, Hero, Unit, W3cIcon} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
// eslint-disable-next-line no-unused-vars
import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";
import ItemSelectionContainer from "@/hot-keys/RaceSpecificHotkeys/ItemSelectionContainer.vue";
import ButtonWarcraft from "@/home/ButtonWarcraft.vue";

@Component({
  components: {ButtonWarcraft, ItemSelectionContainer}
})
export default class RaceSpecificHotkeyTab extends Vue {
  @Prop() public race!: HotkeyType;

  public hotkeyPressed = "";
  public editAbility = {} as Ability | null;
  public selectedGrid = {} as Grid | null;
  public selectedAbility = {} as Ability | null;
  public selectedUnitExtendedAbility = {} as Ability | null;
  public selectedUnit = {} as Unit;
  public selectedUnitExtendedAbilities = [] as Ability[][];
  public selectedUnitAbilities = [] as Ability[][];
  public selectionGrid = [
    [new Grid(0, 0), new Grid(1, 0), new Grid(2, 0), new Grid(3, 0)],
    [new Grid(0, 1), new Grid(1, 1), new Grid(2, 1), new Grid(3, 1)],
    [new Grid(0, 2), new Grid(1, 2), new Grid(2, 2), new Grid(3, 2)],
  ];

  @Watch("race")
  public onRaceChanged() {
    this.selectedGrid = null;
    this.selectedUnit = {} as Unit;
    this.selectedUnitAbilities = [];
    this.selectedUnitExtendedAbilities = [];
    this.editAbility = {} as Ability;
    this.hotkeyPressed = "";
    this.selectGridForAbility(null);
  }

  public parseHotkey(item: string) {
    return item ? item?.replace("512", "ESC") : '';
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

  public async selectGridForAbility(selection: Grid | null) {
    this.selectedGrid = selection;
    this.selectionGrid.forEach(g => g.forEach(g2 => {
      if (g2.x === this.selectedGrid?.x && g2.y === this.selectedGrid?.y) {
        g2.Select()
      } else {
        g2.UnSelect()
      }
    }));

    this.selectionGrid = [...this.selectionGrid]
    await this.saveHotkey()
  }

  public async saveHotkeys() {
    await this.$store.direct.dispatch.hotKeys.saveRaceHotkeyToFile();
  }

  public async importHotkeys() {
    await this.$store.direct.dispatch.hotKeys.importHotkeysFromFile();
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

  public async saveHotkey() {
    if (!this.editAbility) return;

    await this.$store.direct.dispatch.hotKeys.setRaceHotkey(
        {
          hotKey: this.hotkeyPressed,
          hotkeyCommand: this.editAbility.hotkeyIdentifier,
          isResearchAbility: this.editAbility.isResearchAbility,
          grid: this.selectedGrid,
          additionalHotkeyIdentifiers: this.editAbility.additionalHotkeyIdentifiers
        });
  }

  public resetKey() {
    if (!this.editAbility) return;

    this.$store.direct.dispatch.hotKeys.setRaceHotkey(
        {
          hotKey: this.editAbility.defaultHotkey,
          hotkeyCommand: this.editAbility.hotkeyIdentifier,
          isResearchAbility: this.editAbility.isResearchAbility,
          grid: this.selectedGrid,
          additionalHotkeyIdentifiers: this.editAbility.additionalHotkeyIdentifiers
        });
  }

  public resetGrid() {
    if (!this.editAbility) return;

    this.$store.direct.dispatch.hotKeys.setRaceHotkey(
        {
          hotKey: this.editAbility.currentHotkey,
          hotkeyCommand: this.editAbility.hotkeyIdentifier,
          isResearchAbility: this.editAbility.isResearchAbility,
          grid: null,
          additionalHotkeyIdentifiers: this.editAbility.additionalHotkeyIdentifiers
        });

    this.selectedGrid = null
    this.selectGridForAbility(null);
  }

  public toKey(units: Unit[]) {
    return units.map(u => u.icon).join("_");
  }

  public selectExtendedAbility(selection: Ability) {
    if (selection.name === "") {
      return;
    }
    this.selectedUnitExtendedAbility = selection;
    this.setupHotkeyDialog(selection);
  }

  public openHotkeysOrCreatNewPanel(selection: Ability) {
    if (selection.abilities.length > 0) {
      this.selectAbility(selection);
      this.setupHotkeyDialog(selection);
    } else {
      this.setupHotkeyDialog(selection);
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

  public setupHotkeyDialog(selection: Ability) {
    if (selection.name === "") {
      return
    }

    this.editAbility = selection;
    this.hotkeyPressed = selection.currentHotkey;
    this.selectGridForAbility(selection.currentGrid);

    window.document.onkeydown = this.convertKeyPress;
  }

  private async convertKeyPress(e: KeyboardEvent) {
    if (e.code === "Escape") {
      this.hotkeyPressed = "512"
      await this.saveHotkey();
      return;
    }
    if (!e.code.startsWith("Key")) return;

    if (e.key.length != 1) return;

    this.hotkeyPressed = e.key.toUpperCase();

    await this.saveHotkey();
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

.current-selection-container {
  margin-left: 50px;
  background: url("~@/assets/images/hotkeys/Hotkeys_Change_Key_Frame.png") no-repeat center;
  background-size: cover;
  width: 291px;
  height: 85px;
}
</style>
