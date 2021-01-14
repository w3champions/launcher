<template>
  <div>
    <div class="hotkey-wrapper">
      <div>
        <div class="w3font" style="margin-bottom: 15px">Inventory</div>
        <table class="item-grid">
          <tr>
            <td class="single-item" @click="() => openChangeHotkeyModal(itemTopLeft)">
              <div class="item-hover">{{getKeyComboOf(itemTopLeft)}}</div>
            </td>
            <td class="single-item" @click="() => openChangeHotkeyModal(itemTopRight)">
              <div class="item-hover">{{getKeyComboOf(itemTopRight)}}</div>
            </td>
          </tr>
          <tr>
            <td class="single-item" @click="() => openChangeHotkeyModal(itemMiddleLeft)">
              <div class="item-hover">{{getKeyComboOf(itemMiddleLeft)}}</div></td>
            <td class="single-item" @click="() => openChangeHotkeyModal(itemMiddleRight)">
              <div class="item-hover">{{getKeyComboOf(itemMiddleRight)}}</div></td>
          </tr>
          <tr>
            <td class="single-item" @click="() => openChangeHotkeyModal(itemBottomLeft)">
              <div class="item-hover">{{getKeyComboOf(itemBottomLeft)}}</div></td>
            <td class="single-item" @click="() => openChangeHotkeyModal(itemBottomRight)">
              <div class="item-hover">{{getKeyComboOf(itemBottomRight)}}</div></td>
          </tr>
        </table>
      </div>

      <div style="margin-left: 40px">
        <div class="w3font" style="margin-bottom: 15px; margin-left: 8px">Miscellaneous</div>
        <table class="function-key-grid">
          <tr>
            <td class="single-item function-item" @click="() => openChangeHotkeyModal(f1Key)">{{getKeyComboOf(f1Key)}} <div class="foot-note">F1</div></td>
            <td class="single-item function-item" @click="() => openChangeHotkeyModal(f2Key)">{{getKeyComboOf(f2Key)}} <div class="foot-note">F2</div></td>
            <td class="single-item function-item" @click="() => openChangeHotkeyModal(f3Key)">{{getKeyComboOf(f3Key)}} <div class="foot-note">F3</div></td>
            <td class="single-item function-item" @click="() => openChangeHotkeyModal('toggle')">{{hotkeyToggle}} <div class="foot-note">on/off</div></td>
          </tr>
        </table>
      </div>
    </div>

    <div style="position:absolute; right: 133px; top: 210px" :class="modal ? 'visible' : 'hidden'" class="current-selection-container">
      <div style="display: flex; flex-direction: row">
        <div style="height: 64px; width: 64px; margin: 10px;" class="function-item w3font">
          <div style="padding-top: 38px; position: absolute; right: 7px">
            {{ hotKeyCombo }}
          </div>
        </div>
        <div style="margin-top: 15px">
          <div class="w3font">Press desired key</div>
          <div style="cursor: pointer; color: aliceblue; margin-top: 18px; font-size: 14px" class="w3font" @click="removeHotKey">Remove</div>
        </div>
      </div>
    </div>

    <div class="hotkey-tips">
      <div class="inventory-options">
        <div>
          After entering a game and pressing Enter [or F10 etc], hotkeys will be disabled until you'll press the same button again! If you forgot about it, toggle hotkeys on again with the <b>on/off</b> toggle key.
        </div>
        <div class="just-a-row">
          <div :class="isHotkeyManualMode ? 'manual-mode-on' : 'manual-mode-off'" @click="toggleHotkeyManualMode" id="manual-mode-check-box"/>
          <div class="text-spacer">turn on hotkeys manually</div>
        </div>
        <div class="just-a-row">
          <div :class="isShowHotkeyIndicator ? 'manual-mode-on' : 'manual-mode-off'" @click="toggleShowHotkeyIndicator" />
          <div class="text-spacer">show hotkey indicator</div>
        </div>
        <div class="just-a-row" >
          <div :class="isGridMode ? 'manual-mode-on' : 'manual-mode-off'" @click="toggleGridMode" />
          <div class="text-spacer"> Wc3 Reforged grid mode </div>          
        </div>
        <div class="just-a-row">
          <div class="hotkey-toggle" @click="toggleHotKeys" :class="hotkeyState ? 'hotkeys-active' : 'hotkeys-inactive'" />
          <div class="text-spacer">Inventory hotkeys are {{hotkeyState ? 'ON' : 'OFF'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {
  F1,
  F2,
  F3,
  F4,
  ITEM_BOTTOM_LEFT,
  ITEM_BOTTOM_RIGHT,
  ITEM_MIDDLE_LEFT,
  ITEM_MIDDLE_RIGHT,
  ITEM_TOP_LEFT,
  ITEM_TOP_RIGHT
} from "@/hot-keys/ItemHotkeys/keyValuesHotKeys";
import {InGameState, ManualHotkeyMode} from "@/hot-keys/ItemHotkeys/HotKeyStateMachine";
import {combiAsStringForDisplay} from "@/hot-keys/ItemHotkeys/utilsFunctions";
// eslint-disable-next-line no-unused-vars
import {KeyDto, ModifierKey} from "@/hot-keys/ItemHotkeys/hotkeyState";
import {tooltips} from  "@/hot-keys/Tooltips";

@Component
export default class ItemHotkeyTab extends Vue {
  public modal = false;
  public hotkeyToEdit = {} as KeyDto;
  public selectedHotKey = "";
  public hotkeyModifierToEdit = ModifierKey.None;
  
  @Prop() public tab!: string;

  public closeModal() {
    this.hotkeyToEdit = {} as KeyDto;
    this.selectedHotKey = "";
    this.hotkeyModifierToEdit = ModifierKey.None;
    this.modal = false;
    window.document.onkeydown = null;
  }

  public addKey() {
    if (this.selectedHotKey === "toggle") {
      this.$store.direct.dispatch.hotKeys.setToggleKey({hotKey: this.hotkeyToEdit, modifier: this.hotkeyModifierToEdit})
    } else {
      // the replace is for the numpad_1 etc keys, as they need to be passed like that
      if (this.selectedHotKey.replace("_", "") === this.hotkeyToEdit?.key?.toLowerCase()) {
        this.$store.direct.dispatch.hotKeys.removeHotKey(this.selectedHotKey)
      } else {
        this.$store.direct.dispatch.hotKeys.addHotKey({key: this.selectedHotKey, combo: {hotKey: this.hotkeyToEdit, modifier: this.hotkeyModifierToEdit}})
      }
    }

    this.closeModal();
  }

  public removeHotKey() {
    if (this.selectedHotKey === "toggle") {
      this.$store.direct.dispatch.hotKeys.setToggleKey({hotKey: { key: F4, uiDisplay: F4 }, modifier: ModifierKey.Shift})
    } else {
      this.$store.direct.dispatch.hotKeys.removeHotKey(this.selectedHotKey);
    }

    this.closeModal();
  }

  get gridToolTip(){
    return tooltips.gridmode;
  }

  get isHotkeyManualMode() {
    return this.$store.direct.state.hotKeys.hotKeyStateMachine.isManual();
  }

  get isGridMode() {
    return this.$store.direct.state.hotKeys.gridMode;
  }

  get isShowHotkeyIndicator() {
    return this.$store.direct.state.hotKeys.isShowHotkeyIndicator;
  }

  get hotKeyCombo() {
    const forDisplay = combiAsStringForDisplay({hotKey: this.hotkeyToEdit, modifier: this.hotkeyModifierToEdit});
    return forDisplay === "" ? "none" : forDisplay;
  }

  get hotKeys() {
    return this.$store.direct.state.hotKeys.itemHotKeys;
  }

  public toggleHotKeys() {
    this.$store.direct.commit.hotKeys.TOGGLE_HOTKEYS();
  }

  public toggleHotkeyManualMode() {
    this.$store.direct.dispatch.hotKeys.toggleManualMode();
  }
  public toggleGridMode() {
    let cur = this.$store.direct.state.hotKeys.gridMode;
    this.$store.direct.dispatch.hotKeys.saveGridMode(!cur);
    this.$store.direct.dispatch.hotKeys.updateHotkeyMode();
  }
  public toggleShowHotkeyIndicator() {
    this.$store.direct.dispatch.hotKeys.toggleShowHotkeyIndicator();
  }

  public openChangeHotkeyModal(hotKey: string) {
    this.closeModal();
    this.selectedHotKey = hotKey;
    this.modal = true;
    const currentSelection = this.hotKeys.find(h => h.key === hotKey);
    if (currentSelection) {
      this.hotkeyToEdit = { key: currentSelection.combo.hotKey.key, uiDisplay: currentSelection.combo.hotKey.uiDisplay };
      this.hotkeyModifierToEdit = currentSelection.combo.modifier;
    }

    window.document.onkeydown = this.convertKeyPress;
  }

  private convertKeyPress(e: KeyboardEvent) {
    if (e.altKey) {
      this.hotkeyModifierToEdit = ModifierKey.Alt;
    }

    if (e.ctrlKey && this.isWindows) {
      this.hotkeyModifierToEdit = ModifierKey.Ctrl;
    }

    if (e.shiftKey) {
      this.hotkeyModifierToEdit = ModifierKey.Shift;
    }

    if (e.metaKey && this.isWindows) {
      this.hotkeyModifierToEdit = ModifierKey.Cmd;
    }

    if (e.key === " ") {
      this.hotkeyToEdit = { } as KeyDto;
      this.hotkeyModifierToEdit = ModifierKey.Space;
    }

    if (e.key !== "Alt" && e.key !== "Control" && e.key !== " " && e.key !== "Shift" && e.key !== "Meta") {
      // the key property does not work on other keyboards then en with global shortcut, that is the reason for this "hack"
      if (e.code.startsWith("Digit")) {
        let key = e.code.replace("Digit", "");
        if (key.length > 1) {
          key = e.code;
        }
        this.hotkeyToEdit = { key, uiDisplay: e.key };
      } else {
        if (this.isWindows) {
          let key = e.key.toLowerCase();
          if (key.length > 1) {
            key = e.code;
          }

          this.hotkeyToEdit = { key, uiDisplay: key };
        } else {
          let key = e.code.replace("Key", "").toLowerCase();
          if (key.length > 1) {
            key = e.code;
          }
          const uiDisplay = e.key.toLowerCase();
          this.hotkeyToEdit = { key, uiDisplay};
        }
      }
    }

    e.preventDefault();
    this.addKey()
  }

  get isWindows() {
    return this.$store.direct.state.isWindows;
  }

  get hotkeyState() {
    const hotKeyStateMachine = this.$store.direct.state.hotKeys.hotKeyStateMachine;
    if (hotKeyStateMachine instanceof ManualHotkeyMode) {
      return (hotKeyStateMachine as ManualHotkeyMode).keysActivatedInManualMode;
    }

    return hotKeyStateMachine.constructor.name === InGameState.name
  }

  get itemTopLeft() {
    return ITEM_TOP_LEFT;
  }

  get itemMiddleLeft() {
    return ITEM_MIDDLE_LEFT;
  }

  get itemBottomLeft() {
    return ITEM_BOTTOM_LEFT;
  }

  get itemTopRight() {
    return ITEM_TOP_RIGHT;
  }

  get itemMiddleRight() {
    return ITEM_MIDDLE_RIGHT;
  }

  get itemBottomRight() {
    return ITEM_BOTTOM_RIGHT;
  }

  get f1Key() {
    return F1;
  }

  get f2Key() {
    return F2;
  }

  get f3Key() {
    return F3;
  }

  get hotkeyToggle() {
    return combiAsStringForDisplay(this.$store.direct.state.hotKeys.toggleButton).replace("CommandOrControl", "Ctrl");
  }

  private getKeyComboOf(itemKey: string) {
    const hotKeys = this.$store.direct.state.hotKeys.itemHotKeys;
    if (!hotKeys) return "none"
    const combo = hotKeys?.filter(h => h.key === itemKey)[0];
    if (!combo) return "none"
    return combiAsStringForDisplay(combo?.combo).replace("CommandOrControl", "Ctrl").replace("Space", "Spc");
  }
}

</script>

<style scoped type="text/css">
.hotkey-wrapper {
  padding-top: 20px;
  padding-left: 60px;
  padding-right: 60px;

  min-width: 80%;

  display: flex;
  flex-direction: row;
}

.item-grid {
  background: url("~@/assets/images/hotkeys/Hotkeys_Inventory_Frame.png") no-repeat center;
  background-size: cover;
  padding: 5px;
  width: 155px;
  height: 221px;
}

.function-key-grid {
  background: url("~@/assets/images/hotkeys/Hotkeys_Heroes_Frame.png") no-repeat center;
  background-size: cover;
  padding: 5px;
  width: 291px;
  height: 85px;
}

.single-item {
  background: url("~@/assets/images/hotkeys/Hotkeys_Inventory_Button.png") no-repeat center;
  background-size: cover;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  line-height: 68px;
  height: 68px;
  width: 68px;
}

.item-hover:hover {
  background: url("~@/assets/images/hotkeys/Hotkeys_Button_Highlight.png") no-repeat center;
  background-size: cover;
  line-height: 68px;
}

.hotkey-toggle {
  cursor: pointer;
  width: 33px;
  height: 33px;
}

.foot-note {
  text-align: center;
  color: #7f7f7f;
  font-size: 12px;

  position: absolute;
  bottom: -20px;
  left: 20px;
}

.function-item {
  background: url("~@/assets/images/buttons/war3_btn_small_blue_normal_4k.png") no-repeat center;
  background-size: cover;
  height: 64px;
  width: 64px;
  position: relative;
}

.hotkeys-active {
  background: url("~@/assets/images/hotkeys/Hotkeys_Inventory_On.png") no-repeat center;
  background-size: cover;
}
.hotkeys-inactive {
  background: url("~@/assets/images/hotkeys/Hotkeys_Inventory_Off.png") no-repeat center;
  background-size: cover;
}

.hotkey-tips {
  display: flex;
  font-size: 13px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding: 20px;
  background: url("~@/assets/images/hotkeys/Hotkeys_Inventory_Text_Frame.png") no-repeat center;
  width: 562px;
  height: 180px;
  margin-left: 66px;
  margin-top: 60px;
  background-size: cover;
}

.inventory-options {
  display: flex;
  height: 100%;
  justify-content: space-around;
  flex-direction: column;
}

.just-a-row {
  display: flex;
  flex-flow: row;
  width: 100%;
}

.manual-mode-on{
  background: url("~@/assets/images/settings/Settings_Toggle_On.png") center no-repeat;
  background-size: cover;
  width: 31px;
  height: 30px;
}

.manual-mode-off {
  background: url("~@/assets/images/settings/Settings_Toggle_Off.png") center no-repeat;
  background-size: cover;
  width: 31px;
  height: 30px;
}

.text-spacer {
  line-height: 33px;
  margin-left: 20px
}

</style>
