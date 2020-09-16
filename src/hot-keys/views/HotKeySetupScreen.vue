<template>
  <div class="hotkey-race-wrapper">
    <div class="hotkey-tabs">
      <div v-for="race in racesValues" :key="race" class="hotkey-tab" :class="`hotkey-tab-${races[race]}`" @click="() => navigateTo(race)"/>
    </div>
    <div class="tab-container">
      <div v-if="this.tab === races.items">
        <ItemsTab />
      </div>
      <div v-else>
        <RaceTab :race="tab"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import {HotkeyTabs} from "@/hot-keys/hotkeyTypes";
import logger from "@/logger";
import RaceTab from "@/hot-keys/views/RaceTab.vue";
import ItemsTab from "@/hot-keys/views/ItemsTab.vue";
@Component({
  components: {ItemsTab, RaceTab}
})
export default class HotKeySetupScreen extends Vue {
  public races = HotkeyTabs;
  // public racesValues = [ HotkeyTabs.items ];
  public racesValues = [ HotkeyTabs.items, HotkeyTabs.human, HotkeyTabs.orc, HotkeyTabs.undead, HotkeyTabs.nightelf, HotkeyTabs.neutral ];

  @Prop() public tab!: HotkeyTabs;
  public navigateTo(tab: HotkeyTabs) {
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
