<template>
  <div>
    <div class="hotkey-wrapper">
      <div class="hotkey-enter-modal" :style="`visibility: ${modal ? 'visible' : 'hidden'}`">
        <div style="font-size: 30px">Enter Hotkey:</div>
        <br/>
        <div class="hotkey-input">
          {{ hotKeyCombo }}
        </div>
        <div>
          <div class="modal-button" @click="addKey">Add</div>
          <div class="modal-button" @click="closeModal">Cancel</div>
          <div class="modal-button" @click="removeHotKey">Remove</div>
        </div>
      </div>
      <div class="item-grid">
        <div class="single-item" @click="() => openChangeHotkeyModal(itemTopLeft)">{{getKeyComboOf(itemTopLeft)}}</div>
        <div class="single-item" @click="() => openChangeHotkeyModal(itemTopRight)">{{getKeyComboOf(itemTopRight)}}</div>
        <div class="single-item" @click="() => openChangeHotkeyModal(itemMiddleLeft)">{{getKeyComboOf(itemMiddleLeft)}}</div>
        <div class="single-item" @click="() => openChangeHotkeyModal(itemMiddleRight)">{{getKeyComboOf(itemMiddleRight)}}</div>
        <div class="single-item" @click="() => openChangeHotkeyModal(itemBottomLeft)">{{getKeyComboOf(itemBottomLeft)}}</div>
        <div class="single-item" @click="() => openChangeHotkeyModal(itemBottomRight)">{{getKeyComboOf(itemBottomRight)}}</div>
      </div>
      <div class="function-key-grid">
        <div class="single-item function-item" @click="() => openChangeHotkeyModal(f1Key)">{{getKeyComboOf(f1Key)}} <div class="foot-note">F1</div></div>
        <div class="single-item function-item" @click="() => openChangeHotkeyModal(f2Key)">{{getKeyComboOf(f2Key)}} <div class="foot-note">F2</div></div>
        <div class="single-item function-item" @click="() => openChangeHotkeyModal(f3Key)">{{getKeyComboOf(f3Key)}} <div class="foot-note">F3</div></div>
        <div class="single-item function-item" style="margin-left: 50px" @click="() => openChangeHotkeyModal('toggle')">{{hotkeyToggle}} <div class="foot-note">hotkeys on/off</div></div>
      </div>
      <div class="hotkey-toggle" @click="toggleHotKeys" :class="hotkeyState ? 'hotkeys-active' : 'hotkeys-inactive'" />
    </div>

    <div class="hotkey-tips">
      Hotkeys will be turned on, as soon as you enter any game automatically.
      If you open the chat or any menu by keyboard they will be turned off and turned back on when you leave the chat or menu.
      If something goes wrong, you can always toggle the hotkeys with the provided <b>hotkeys on/off</b> toggle key.
      <br/>
      <br/>
      <input type="checkbox" :checked="isHotkeyManualMode" @click="toggleHotkeyManualMode" id="manual-mode-check-box"/>
      <label for="manual-mode-check-box">  Never turn on hotkeys automatically</label>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {
  F1,
  F2,
  F3,
  ITEM_BOTTOM_LEFT,
  ITEM_BOTTOM_RIGHT,
  ITEM_MIDDLE_LEFT,
  ITEM_MIDDLE_RIGHT,
  ITEM_TOP_LEFT,
  ITEM_TOP_RIGHT
} from "@/hot-keys/keyValuesRobotJs";
/* eslint-disable */
import {KeyDto, ModifierKey} from "@/hot-keys/hotkeyTypes";
import {InGameState, ManualHotkeyMode} from "@/hot-keys/HotKeyStateMachine";
import {combiAsStringForDisplay} from "@/hot-keys/utilsFunctions";

@Component
export default class ItemsTab extends Vue {
  public modal = false;
  public hotkeyToEdit = {} as KeyDto;
  public selectedHotKey = "";
  public hotkeyModifierToEdit = ModifierKey.None;

  @Prop() public tab!: string;

  public closeModal() {
    this.modal = false;
    this.hotkeyToEdit = {} as KeyDto;
    this.selectedHotKey = "";
    this.hotkeyModifierToEdit = ModifierKey.None;
    window.document.onkeydown = null;
  }

  public addKey() {
    if (this.selectedHotKey === "toggle") {
      this.$store.direct.dispatch.hotKeys.setToggleKey({hotKey: this.hotkeyToEdit, modifier: this.hotkeyModifierToEdit})
    } else {
      // the replace is for the numpad_1 etc keys, as they need to be passed like that
      if (this.selectedHotKey.replace("_", "") === this.hotkeyToEdit.key.toLowerCase()) {
        this.$store.direct.dispatch.hotKeys.removeHotKey(this.selectedHotKey)
      } else {
        this.$store.direct.dispatch.hotKeys.addHotKey({key: this.selectedHotKey, combo: {hotKey: this.hotkeyToEdit, modifier: this.hotkeyModifierToEdit}})
      }
    }

    this.closeModal();
  }

  public removeHotKey() {
    this.$store.direct.dispatch.hotKeys.removeHotKey(this.selectedHotKey);
    this.closeModal();
  }

  get isHotkeyManualMode() {
    return this.$store.direct.state.hotKeys.hotKeyStateMachine.isManual();
  }

  get hotKeyCombo() {
    const forDisplay = combiAsStringForDisplay({hotKey: this.hotkeyToEdit, modifier: this.hotkeyModifierToEdit});
    return forDisplay === "" ? "none" : forDisplay;
  }

  get hotKeys() {
    return this.$store.direct.state.hotKeys.hotKeys;
  }

  public toggleHotKeys() {
    this.$store.direct.commit.hotKeys.TOGGLE_HOTKEYS();
  }

  public toggleHotkeyManualMode() {
    this.$store.direct.dispatch.hotKeys.toggleManualMode();
  }

  public openChangeHotkeyModal(hotKey: string) {
    this.modal = !this.modal;
    this.selectedHotKey = hotKey;
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
  }

  get isWindows() {
    return this.$store.direct.state.isWindows;
  }

  get hotkeyState() {
    const hotKeyStateMachine = this.$store.direct.state.hotKeys.hotKeyStateMachine;
    if (hotKeyStateMachine.constructor.name === ManualHotkeyMode.name) {
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
    const hotKeys = this.$store.direct.state.hotKeys.hotKeys;
    if (!hotKeys) return "none"
    const combo = hotKeys?.filter(h => h.key === itemKey)[0];
    if (!combo) return "none"
    return combiAsStringForDisplay(combo?.combo).replace("CommandOrControl", "Ctrl");
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
  background: url("~@/assets/images/home/itemBg.png") no-repeat center;
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
  cursor: pointer;

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
  cursor: pointer;
  width: 33px;
  height: 33px;
  right: 120px;
  top: 190px;
  position: absolute;
}

.foot-note {
  text-align: center;
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

.hotkey-on-toggle {
  width: 33px;
  height: 33px;
}

.hotkeys-active {
  background: url("~@/assets/images/hotkeys/Hotkeys_Inventory_On.png") no-repeat center;
  background-size: cover;
}
.hotkeys-inactive {
  background: url("~@/assets/images/hotkeys/Hotkeys_Inventory_Off.png") no-repeat center;
  background-size: cover;
}

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

.hotkey-tips {
  padding: 30px;
  width: 80%;
}

.modal-button {
  margin-left: 15px;
  margin-right: 15px;
  display: inline;
  cursor: pointer;
}
</style>
