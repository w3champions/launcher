<template>
  <table v-if="!singleRow" class="selection-background">
    <tr v-for="line in selectionItems" :key="toKey(line)">
      <td class="item-selection-container" v-for="item in line" :key="item.icon" :class="item.icon + isClassicMode">
        <div class="item-selection" @click="() => onClick(item)">
          <div class="item-selection-hover-text w3font" :class="item.hasConflict ? 'has-conflict' : ''">
            {{ parseHotkey(item) }}
          </div>
        </div>
      </td>
    </tr>
  </table>
  <table v-else class="selection-background selection-background-single-line">
    <tr>
      <td class="item-selection-container" v-for="item in selectionItems" :key="item.icon" :class="item.icon + isClassicMode">
        <div class="item-selection" @click="() => onClick(item)">
          <div class="item-selection-hover-text w3font" :class="item.hasConflict ? 'has-conflict' : ''">
            {{ parseHotkey(item) }}
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-facing-decorator";
import {Ability, W3cIcon} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";

@Component
export default class ItemSelectionContainer extends Vue {
  @Prop() public selectionItems!: W3cIcon[][];
  @Prop() public singleRow!: boolean;
  @Prop() public isResearchAbilitySelected!: boolean;
  // eslint-disable-next-line no-unused-vars
  @Prop() public onClick!: (icon: W3cIcon) => void;

  public toKey(units: W3cIcon[]) {
    return units.map(u => u.icon).join("_");
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

  get isClassicMode() {
    return this.$store.direct.state.hotKeys.isClassicMode ? '-classic' : '';
  }
}

</script>

<style type="text/css">
@import '~@/assets/styles/classic-icons.css';
@import '~@/assets/styles/reforged-icons.css';

.has-conflict {
  color: #ff2828;
}

.item-selection-container {
  height: 64px;
  width: 64px;
  padding: 0 !important;
}

.item-selection{
  height: 100%;
  width: 100%;
}

.item-selection:hover{
  background: url("~@/assets/images/hotkeys/Hotkeys_Button_Highlight.png") no-repeat center;
  background-size: cover;
}

.selected-item{
  background: url("~@/assets/images/hotkeys/Hotkeys_Button_Highlight.png") no-repeat center;
  background-size: cover;
}

.item-selection-container {
  height: 64px;
  width: 64px;
  padding: 0 !important;
}

.item-selection{
  height: 100%;
  width: 100%;
}

.item-selection:hover{
  background: url("~@/assets/images/hotkeys/Hotkeys_Button_Highlight.png") no-repeat center;
  background-size: cover;
}

.item-selection-hover-text {
  text-align: right;
  padding-right: 5px;
  padding-top: 43px;
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
