<template>
  <div class="hotkey-wrapper">
    <div class="hotkey-toggle" @click="toggleHotKeys" :style="`background-color: ${hotkeyState ? 'green' : 'red'}`" />
    <div class="item-grid">
      <div class="single-item">{{itemHotHotkeyTopLeft}}</div>
      <div class="single-item">{{itemHotHotkeyTopRight}}</div>
      <div class="single-item">{{itemHotHotkeyMidleLeft}}</div>
      <div class="single-item">{{itemHotHotkeyMiddleRight}}</div>
      <div class="single-item">{{itemHotHotkeyBottomLeft}}</div>
      <div class="single-item">{{itemHotHotkeyBottomRight}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {
  ITEM_BOTTOM_LEFT, ITEM_BOTTOM_RIGHT,
  ITEM_MIDDLE_LEFT,
  ITEM_MIDDLE_RIGHT,
  ITEM_TOP_LEFT,
  ITEM_TOP_RIGHT
} from "@/hot-keys/keyValuesRobotJs";
import {combiAsString} from "@/hot-keys/utilsFunctions";

@Component
export default class HotKeySetupScreen extends Vue {
  public toggleHotKeys() {
    this.$store.direct.commit.hotKeys.TOGGLE_HOTKEYS();
  }

  get hotkeyState() {
    return this.$store.direct.state.hotKeys.hotKeyStateMachine.constructor.name === "InGameState"
  }

  get itemHotHotkeyTopLeft() {
    return this.getKeyComboOf(ITEM_TOP_LEFT);
  }

  get itemHotHotkeyMidleLeft() {
    return this.getKeyComboOf(ITEM_MIDDLE_LEFT);
  }

  get itemHotHotkeyBottomLeft() {
    return this.getKeyComboOf(ITEM_BOTTOM_LEFT);
  }

  get itemHotHotkeyTopRight() {
    return this.getKeyComboOf(ITEM_TOP_RIGHT);
  }

  get itemHotHotkeyMiddleRight() {
    return this.getKeyComboOf(ITEM_MIDDLE_RIGHT);
  }

  get itemHotHotkeyBottomRight() {
    return this.getKeyComboOf(ITEM_BOTTOM_RIGHT);
  }

  private getKeyComboOf(itemKey: string) {
    const hotKeys = this.$store.direct.state.hotKeys.hotKeys;
    if (!hotKeys) return "none"
    const combo = hotKeys?.filter(h => h.key === itemKey)[0];
    if (!combo) return "none"
    return combiAsString(combo?.combo);
  }
}

</script>

<style scoped type="text/css">
.hotkey-wrapper {
  padding-top: 60px;
  padding-left: 60px;
  padding-right: 60px;
}

.item-grid {
  background: url("~@/assets/images/itemBg.png") no-repeat center;
  background-size: cover;
  width: 187px;
  height: 276px;
  border: 2px solid rgba(0,0,0, 0.5);
  border-radius: 5px;

  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
}

.single-item {
  width: 67px;
  height: 67px;
  margin: 8px 10px 10px;
  border: 3px solid transparent;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.single-item:hover {
  border: 3px solid #a59f33;
}

.hotkey-toggle {
  float: right;
  width: 20px;
  height: 20px;
  border-radius: 12px;
  border: 2px solid #b0b0b0;
}
</style>
