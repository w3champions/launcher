<template>
  <div class="hotkey-race-wrapper">
    <div class="hotkey-tabs">
      <div v-for="race in racesValues" :key="race" class="hotkey-tab" :class="`hotkey-tab-${races[race]}`" @click="() => navigateTo(race)"/>
    </div>
    <div class="tab-container">
      <div v-if="this.tab === races.items">
        <ItemHotkeyTab />
        <div class="wc3hotkey-mode-container">
            <div class="tooltip"> {{hotkeyTooltip}} </div>
            <div :class="hotkeyMode == 0 ? 'rect-button rb-on' : 'rect-button rb-off'" @click="setHotkeyMode(0)"> Classic </div>
            <div :class="hotkeyMode == 1 ? 'rect-button rb-on' : 'rect-button rb-off'" @click="setHotkeyMode(1)"> Custom </div>
            <div :class="hotkeyMode == 2 ? 'rect-button rb-on' : 'rect-button rb-off'" @click="setHotkeyMode(2)"> Grid </div>
        </div>
      </div>
      <div v-else>
        <RaceSpecificHotkeyTab :race="tab"/>
      </div>
    </div>
    <LoadingSpinner :style="`visibility: ${isLoading ? 'visible' : 'hidden'}`" :text="'Loading hotkeys...'" />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import logger from "@/logger";
import RaceSpecificHotkeyTab from "@/hot-keys/RaceSpecificHotkeys/RaceSpecificHotkeyTab.vue";
import ItemHotkeyTab from "@/hot-keys/ItemHotkeys/ItemHotkeyTab.vue";
import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";
import LoadingSpinner from "@/home/LoadingSpinner.vue";
import {tooltips} from  "@/hot-keys/Tooltips";


@Component({
  components: {ItemHotkeyTab, RaceSpecificHotkeyTab, LoadingSpinner}
})
export default class HotKeySetupScreen extends Vue {
  public hotkeyMode: Number= 0;
  public races = HotkeyType;
  public racesValues = [ HotkeyType.items, HotkeyType.human, HotkeyType.orc, HotkeyType.undead, HotkeyType.nightelf, HotkeyType.neutral ];
  @Prop() public tab!: HotkeyType;

  isLoading = false;

  async mounted() {
    this.$store.direct.dispatch.hotKeys.createBackupOfHotkeyFile();

    this.isLoading = true;
    this.$store.direct.dispatch.hotKeys.importHotkeysFromFile().then(
      () => {
        this.isLoading = false;
        this.hotkeyMode = this.$store.direct.state.hotKeys.hotkeyMode;
      });
    
  }

  public setHotkeyMode(mode: Number) {
    this.$store.direct.dispatch.hotKeys.updateHotkeyMode(mode);
    this.hotkeyMode = mode;
  }

  public get hotkeyTooltip(){
    return tooltips.hotkeyMode;
  }

  public navigateTo(tab: HotkeyType) {
    const path = `/HotKeys/${tab}`;
    this.$router.push({
      path: path
    }).catch(err => {
      if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
      ) {
        logger.error(err);
      }
    });
  }
}

</script>

<style scoped type="text/css">
.hotkey-tab {
  cursor: pointer;
  width: 80px;
  height: 77px;
}

.hotkey-tab-items {
  background: url("~@/assets/images/hotkeys/races/Hotkeys_items_Icon.png") center no-repeat;
  background-size: cover;
}

.hotkey-tab-human {
  background: url("~@/assets/images/hotkeys/races/Hotkeys_human_Icon.png") center no-repeat;
  background-size: cover;
}

.hotkey-tab-orc {
 background: url("~@/assets/images/hotkeys/races/Hotkeys_orc_Icon.png") center no-repeat;
 background-size: cover;
}

.hotkey-tab-undead {
  background: url("~@/assets/images/hotkeys/races/Hotkeys_undead_Icon.png") center no-repeat;
  background-size: cover;
}

.hotkey-tab-nightelf {
  background: url("~@/assets/images/hotkeys/races/Hotkeys_nightelf_Icon.png") center no-repeat;
  background-size: cover;
}

.hotkey-tab-neutral {
  background: url("~@/assets/images/hotkeys/races/Hotkeys_neutral_Icon.png") center no-repeat;
  background-size: cover;
}

.hotkey-race-wrapper {
  display: flex;
  height: 90%;
  padding: 0% 16% 0% 8%;
}

.hotkey-tabs {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.wc3hotkey-mode-container{
  position:absolute;
  width: 278px;
  height: 34px;
  background: url("~@/assets/images/settings/SmallFrame.png") center no-repeat;
  background-size: cover;
  top: 41%;
  left: 35%;
  display:flex;
}
.rect-button{
  margin:3px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  background-size: cover;
  width: 89px;
  height: 28px;

}
.tooltip {
  display:none;
  top:40px;
  left:40px;
  position:absolute;
  background: #28282b;
  padding:4px;
  border: 2px solid gold;
  border-radius: 10px;
  font-size: 13px;
}
.wc3hotkey-mode-container:hover .tooltip{
  display:block;
}
.rb-on {
  background: url("~@/assets/images/settings/RectButtonActive.png") center no-repeat;
}
.rb-off {
  background: url("~@/assets/images/settings/RectButtonDefault.png") center no-repeat;
}
.tab-container {
  width: 100%;
}


</style>
