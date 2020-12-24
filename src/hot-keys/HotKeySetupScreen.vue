<template>
  <div class="hotkey-race-wrapper">
    <div class="hotkey-tabs">
      <div v-for="race in racesValues" :key="race" class="hotkey-tab" :class="`hotkey-tab-${races[race]}`" @click="() => navigateTo(race)"/>
    </div>
    <div class="tab-container">
      <div v-if="this.tab === races.items">
        <ItemHotkeyTab />
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
@Component({
  components: {ItemHotkeyTab, RaceSpecificHotkeyTab, LoadingSpinner}
})
export default class HotKeySetupScreen extends Vue {
  public races = HotkeyType;
  public racesValues = [ HotkeyType.items, HotkeyType.human, HotkeyType.orc, HotkeyType.undead, HotkeyType.nightelf, HotkeyType.neutral ];
  @Prop() public tab!: HotkeyType;

  isLoading = false;

  async mounted() {
    this.$store.direct.dispatch.hotKeys.createBackupOfHotkeyFile();

    this.isLoading = true;
    
    setTimeout(async () => {
        await this.$store.direct.dispatch.hotKeys.importHotkeysFromFile();
        this.isLoading = false;
    }, 200);
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
  flex-direction: row;
  height: 90%;
  padding: 30px 50px 30px 70px;
}

.hotkey-tabs {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.tab-container {
  width: 100%;
}
</style>
