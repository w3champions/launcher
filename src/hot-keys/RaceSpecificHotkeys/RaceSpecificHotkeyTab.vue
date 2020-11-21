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
        <ItemSelectionContainer :class="selectedAbility.icon ? 'visible' : 'hidden'" :on-click="selectExtendedAbility" :selection-items="selectedUnitExtendedAbilities" :is-research-ability-selected="isResearchAbilitySelected || wasSkillSelectSelected"/>
        <div class="selection-header w3font" style="visibility: hidden">.</div>
        <ItemSelectionContainer style="visibility: hidden" :single-row="true" :on-click="selectUnit" :selection-items="heroes"/>
      </div>
      <div class="hero-wrapper" />
      <ButtonWarcraft style="position: absolute; bottom: 128px; right: 150px" :on-click="importHotkeys" text="Import" />
      <ButtonWarcraft style="position: absolute; bottom: 58px; right: 150px" :on-click="saveHotkeys" text="Save" />
    </div>
    <div style="position:absolute; left: 852px; top: 172px; font-size: 18px;"  class="w3font">
      <span v-if="isResearchAbilitySelected">Train: </span>{{ editAbility.name }}
    </div>
    <div style="position:absolute; right: 133px; top: 193px" :class="editAbility.icon ? 'visible' : 'hidden'" class="current-selection-container">
      <div style="display: flex; flex-direction: row">
        <div style="height: 64px; width: 64px; margin: 10px; display: flex; cursor: pointer" class="w3font" :class="editAbility.icon"  @click="() => listenToUnhotkeyFunction = false">
          <div style="padding-top: 45px; position: absolute; right: 222px">
             {{ parseHotkey(editAbility) }}
          </div>
        </div>
        <div style="margin-top: 15px">
          <div class="w3font">Press desired key</div>
          <div style="cursor: pointer; color: aliceblue; margin-top: 18px; font-size: 14px" class="w3font" @click="resetKey">Reset default: {{parseWithEscape(editAbility.defaultHotkey)}}</div>
        </div>
      </div>
      <div v-if="editAbility.unHotkey" style="display: flex; flex-direction: row">
        <div style="height: 64px; width: 64px; margin: 10px; display: flex; cursor: pointer" class="w3font btncancel" @click="() => listenToUnhotkeyFunction = true">
          <div style="padding-top: 45px; position: absolute; right: 222px">
            {{ parseWithEscape(editAbility.unHotkey) }}
          </div>
        </div>
        <div style="margin-top: 15px">
          <div class="w3font" style="color: aliceblue; font-size: 14px">Hotkey to disable ability</div>
        </div>
      </div>
      <div v-if="editAbility.canNotBeMoved">
        <div class="w3font" style="color: aliceblue; font-size: 14px; padding: 5px; margin-top: 20px">
          reallocation of ability not supported by Blizzard
        </div>
      </div>
      <div v-else-if="isResearchAbilitySelected">
        <div style="margin-top: 25px" class="w3font"><div style="display:inline; ">Train hotkey location</div><div @click="resetResearchGrid" style=" float: right; margin-right: 20px; cursor: pointer; color: aliceblue; display:inline; font-size: 14px">(Reset)</div></div>
        <ItemSelectionContainer style="margin-top: 10px" :on-click="saveGridForAbility" :selection-items="selectionGridResearchUiModel"/>
      </div>
      <div v-else>
        <div style="margin-top: 25px" class="w3font"><div style="display:inline; ">Hotkey location</div><div @click="resetGrid" style=" float: right; margin-right: 20px; cursor: pointer; color: aliceblue; display:inline; font-size: 14px">(Reset)</div></div>
        <ItemSelectionContainer style="margin-top: 10px" :on-click="saveGridForAbility" :selection-items="selectionGridUiModel"/>
      </div>
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
  public unhotkeyPressed = "";
  public researchHotkeyPressed = "";
  public listenToUnhotkeyFunction = false;
  public isResearchAbilitySelected = false;
  public wasSkillSelectSelected = false;
  public editAbility = {} as Ability | null;
  public selectedGrid = null as Grid | null;
  public selectedResearchGrid = null as Grid | null;
  public selectedAbility = {} as Ability | null;
  public selectedUnitExtendedAbility = {} as Ability | null;
  public selectedUnit = {} as Unit;
  public selectedUnitExtendedAbilities = [] as Ability[][];
  public selectedUnitAbilities = [] as Ability[][];
  public selectionGridUiModel = [
    [new Grid(0, 0), new Grid(1, 0), new Grid(2, 0), new Grid(3, 0)],
    [new Grid(0, 1), new Grid(1, 1), new Grid(2, 1), new Grid(3, 1)],
    [new Grid(0, 2), new Grid(1, 2), new Grid(2, 2), new Grid(3, 2)],
  ];

  public selectionGridResearchUiModel = [
    [new Grid(0, 0), new Grid(1, 0), new Grid(2, 0), new Grid(3, 0)],
    [new Grid(0, 1), new Grid(1, 1), new Grid(2, 1), new Grid(3, 1)],
    [new Grid(0, 2), new Grid(1, 2), new Grid(2, 2), new Grid(3, 2)],
  ];

  @Watch("race")
  public onRaceChanged() {
    this.selectedGrid = null;
    this.selectedResearchGrid = null;
    this.wasSkillSelectSelected = false;
    this.isResearchAbilitySelected = false;
    this.selectedUnit = {} as Unit;
    this.selectedUnitAbilities = [];
    this.selectedUnitExtendedAbilities = [];
    this.selectedUnitAbilities = [] as Ability[][];
    this.editAbility = {} as Ability;
    this.selectedAbility = {} as Ability;
    this.hotkeyPressed = "";
    this.unhotkeyPressed = "";
    this.researchHotkeyPressed = "";
    this.listenToUnhotkeyFunction = false;
    this.setGridForAbility(null);
    this.setResearchGridForAbility(null);
  }

  public parseHotkey(item: Ability) {
    if (this.isResearchAbilitySelected) {
      return this.parseWithEscape(item.researchHotkey)
    }
    return this.parseWithEscape(item.currentHotkey);
  }

  private parseWithEscape(item: string) {
    return item ? item.replace("27", "ESC").replace("512", "ESC") : '';
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

  public setGridForAbility(selection: Grid | null) {
    if (selection) {
      this.selectedGrid = new Grid(selection.x, selection.y);
      this.selectedGrid.Select();
    } else {
      this.selectedGrid = selection;
    }

    this.selectionGridUiModel.forEach(g => g.forEach(g2 => {
      if (g2.x === this.selectedGrid?.x && g2.y === this.selectedGrid?.y) {
        g2.Select()
      } else {
        g2.UnSelect()
      }
    }));

    this.selectionGridUiModel = [...this.selectionGridUiModel]
  }

  public setResearchGridForAbility(selection: Grid | null) {
    if (selection) {
      this.selectedResearchGrid = new Grid(selection.x, selection.y);
      this.selectedResearchGrid.Select();
    } else {
      this.selectedResearchGrid = selection;
    }

    this.selectionGridResearchUiModel.forEach(g => g.forEach(g2 => {
      if (g2.x === this.selectedResearchGrid?.x && g2.y === this.selectedResearchGrid?.y) {
        g2.Select()
      } else {
        g2.UnSelect()
      }
    }));

    this.selectionGridResearchUiModel = [...this.selectionGridResearchUiModel]
  }

  public saveGridForAbility(selection: Grid) {
    if (this.isResearchAbilitySelected) {
      this.setResearchGridForAbility(selection);
    } else {
      this.setGridForAbility(selection);
    }

    this.setRaceHotkeyInState();
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
    this.wasSkillSelectSelected = selection.icon === 'btnskillz';
    this.isResearchAbilitySelected = false;
    this.selectedUnitExtendedAbilities = this.splitInArrayOf4Abilities(this.selectedAbility?.abilities ?? []);
  }

  get hotKeys() {
    return this.$store.direct.state.hotKeys.raceHotkeyData.filter(h => h.hotkeyType === this.race)[0];
  }

  public setRaceHotkeyInState() {
    if (!this.editAbility) return;

    this.$store.direct.dispatch.hotKeys.setRaceHotkey(
        {
          hotKey: this.hotkeyPressed,
          hotkeyCommand: this.editAbility.hotkeyIdentifier,
          grid: this.selectedGrid,
          researchGrid: this.selectedResearchGrid,
          additionalHotkeyIdentifiers: this.editAbility.additionalHotkeyIdentifiers,
          isStagedUpgrade: this.editAbility.isStagedUpgrade,
          unHotkey: this.unhotkeyPressed,
          researchHotkey: this.editAbility.isResearchAbility ? this.researchHotkeyPressed : "",
          hotkeyName: this.editAbility.name,
        });
  }

  public resetKey() {
    if (!this.editAbility) return;

    this.$store.direct.dispatch.hotKeys.setRaceHotkey(
        {
          hotKey: this.editAbility.defaultHotkey,
          hotkeyCommand: this.editAbility.hotkeyIdentifier,
          grid: null,
          researchGrid: null,
          additionalHotkeyIdentifiers: this.editAbility.additionalHotkeyIdentifiers,
          isStagedUpgrade: this.editAbility.isStagedUpgrade,
          unHotkey: this.editAbility.defaultHotkey,
          researchHotkey: this.editAbility.isResearchAbility ? this.editAbility.defaultHotkey : "",
          hotkeyName: this.editAbility.name,
        });

    this.setGridForAbility(null);
    this.setResearchGridForAbility(null);
  }

  public resetGrid() {
    if (!this.editAbility) return;

    this.$store.direct.dispatch.hotKeys.setRaceHotkey(
        {
          hotKey: this.editAbility.currentHotkey,
          hotkeyCommand: this.editAbility.hotkeyIdentifier,
          grid: null,
          researchGrid: this.selectedResearchGrid,
          additionalHotkeyIdentifiers: this.editAbility.additionalHotkeyIdentifiers,
          isStagedUpgrade: this.editAbility.isStagedUpgrade,
          unHotkey: this.editAbility.unHotkey,
          researchHotkey: this.editAbility.isResearchAbility ? this.researchHotkeyPressed : "",
          hotkeyName: this.editAbility.name,
        });

    this.setGridForAbility(null);
  }

  public resetResearchGrid() {
    if (!this.editAbility) return;

    this.$store.direct.dispatch.hotKeys.setRaceHotkey(
        {
          hotKey: this.editAbility.currentHotkey,
          hotkeyCommand: this.editAbility.hotkeyIdentifier,
          grid: this.selectedGrid,
          researchGrid: null,
          additionalHotkeyIdentifiers: this.editAbility.additionalHotkeyIdentifiers,
          isStagedUpgrade: this.editAbility.isStagedUpgrade,
          unHotkey: this.editAbility.unHotkey,
          researchHotkey: this.editAbility.isResearchAbility ? this.researchHotkeyPressed : "",
          hotkeyName: this.editAbility.name,
        });

    this.setResearchGridForAbility(null);
  }

  public toKey(units: Unit[]) {
    return units.map(u => u.icon).join("_");
  }

  public selectExtendedAbility(selection: Ability) {
    if (selection.name === "") {
      return;
    }

    this.isResearchAbilitySelected = this.wasSkillSelectSelected && selection.isResearchAbility;
    this.selectedUnitExtendedAbility = selection;
    this.setupHotkeyDialog(selection);
  }

  public openHotkeysOrCreatNewPanel(selection: Ability) {
    if (selection.abilities.length > 0) {
      this.selectAbility(selection);
      this.setupHotkeyDialog(selection);
    } else {
      this.isResearchAbilitySelected = false;
      this.setupHotkeyDialog(selection);
    }
  }

  public selectUnit(selection: Unit) {
    if (selection.name === "") {
      return;
    }
    this.wasSkillSelectSelected = false;
    this.isResearchAbilitySelected = false;
    this.selectedUnit = selection;
    this.selectedUnit = selection;
    this.selectedAbility = {} as Ability;
    this.editAbility = {} as Ability;
    this.listenToUnhotkeyFunction = false;
    this.selectedUnitAbilities = this.splitInArrayOf4Abilities(this.selectedUnit?.abilities ?? []);
    this.selectedUnitExtendedAbilities = this.splitInArrayOf4Abilities(this.selectedAbility?.abilities ?? []);
  }

  public setupHotkeyDialog(selection: Ability) {
    if (selection.name === "") {
      return
    }

    this.editAbility = selection;
    this.hotkeyPressed = selection.currentHotkey;
    this.unhotkeyPressed = selection.unHotkey;
    this.researchHotkeyPressed = selection.researchHotkey;
    this.listenToUnhotkeyFunction = false;

    if (selection.currentGrid) {
      this.selectedGrid = new Grid(selection.currentGrid.x, selection.currentGrid.y);
      this.selectedGrid.Select();
    } else {
      this.selectedGrid = null;
    }

    if (selection.currentResearchGrid) {
      this.selectedResearchGrid = new Grid(selection.currentResearchGrid.x, selection.currentResearchGrid.y);
      this.selectedResearchGrid.Select();
    } else {
      this.selectedResearchGrid = null;
    }

    this.setGridForAbility(this.selectedGrid);
    this.setResearchGridForAbility(this.selectedResearchGrid);

    window.document.onkeydown = this.convertKeyPress;
  }

  private convertKeyPress(e: KeyboardEvent) {
    if (e.code === "Escape") {
      this.setHotkeyPressed("27");
    } else {
      if (!e.code.startsWith("Key")) return;

      if (e.key.length != 1) return;

      this.setHotkeyPressed(e.key.toUpperCase());
    }

    this.setRaceHotkeyInState();
  }

  private setHotkeyPressed(key: string) {
    if (this.listenToUnhotkeyFunction) {
      this.unhotkeyPressed = key;
    } else if (this.isResearchAbilitySelected) {
      this.researchHotkeyPressed = key;
    } else {
      this.hotkeyPressed = key;
    }

    if (this.editAbility?.isResearchAbility && !this.isResearchAbilitySelected) {
      this.researchHotkeyPressed = this.hotkeyPressed
    }

    if (this.editAbility?.isUnhotkey && !this.listenToUnhotkeyFunction) {
      this.unhotkeyPressed = this.hotkeyPressed
    }
  }

  private splitInArrayOf4Units(elements: Unit[]) {
    const elemsWithId = this.fillUp(elements, 12, Unit.Default);
    return this.splitIn4s(elemsWithId) as Unit[][];
  }

  private splitInArrayOf4Abilities(elements: Ability[]) {
    const elemsWithId = this.fillUp(elements, 12, Ability.Default);
    return this.splitIn4s(elemsWithId) as Ability[][];
  }

  // eslint-disable-next-line no-unused-vars
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

<style type="text/css">

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
