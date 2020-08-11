<template>
  <div class="hotkey-wrapper">

    <div class="item-grid">
      <div class="single-item">{{itemHotHotkeyTopLeft}}</div>
      <div class="single-item">{{itemHotHotkeyTopRight}}</div>
      <div class="single-item">{{itemHotHotkeyMidleLeft}}</div>
      <div class="single-item">{{itemHotHotkeyMiddleRight}}</div>
      <div class="single-item">{{itemHotHotkeyBottomLeft}}</div>
      <div class="single-item">{{itemHotHotkeyBottomRight}}</div>
    </div>
    <div class="function-key-grid">
      <div class="single-item function-item">{{f1Key}} <div class="foot-note">F1</div></div>
      <div class="single-item function-item">{{f2Key}} <div class="foot-note">F2</div></div>
      <div class="single-item function-item">{{f3Key}} <div class="foot-note">F3</div></div>
      <div class="single-item function-item" style="margin-left: 50px">{{hotkeyToggle}} <div class="foot-note">toggle</div></div>
    </div>
    <div class="hotkey-toggle" @click="toggleHotKeys" :style="`background-color: ${hotkeyState ? 'green' : 'red'}`" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {
  F1, F2, F3,
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

  get f1Key() {
    return this.getKeyComboOf(F1);
  }

  get f2Key() {
    return this.getKeyComboOf(F2);
  }

  get f3Key() {
    return this.getKeyComboOf(F3);
  }

  get hotkeyToggle() {
    return combiAsString(this.$store.direct.state.hotKeys.toggleButton).replace("CommandOrControl", "Ctrl");
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

  min-width: 80%;

  display: flex;
  flex-direction: row;
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

.function-key-grid {
  border-radius: 5px;
  margin-left: 40px;

  display: flex;
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
  font-size: 18px;
}

.single-item:hover {
  border: 3px solid #a59f33;
}

.hotkey-toggle {
  width: 20px;
  height: 20px;
  border-radius: 12px;
  border: 2px solid #b0b0b0;
  right: 120px;
  top: 190px;
  position: absolute;
}

.foot-note {
  color: #7f7f7f;
  font-size: 12px;

  position: absolute;
  align-self: flex-end;
  bottom: 12px;
}

.function-item {
  background: url("~@/assets/images/buttons/war3_btn_small_blue_normal_4k.png") no-repeat center;
  background-size: cover;

  position: relative;

  width: 86px;
  height: 86px;
  margin: 0 0 0 10px;
}

.function-item:hover {
  border: 3px solid transparent;

  background: url("~@/assets/images/buttons/war3_btn_small_blue_hover_4k.png") no-repeat center;
  background-size: cover;
}
</style>
