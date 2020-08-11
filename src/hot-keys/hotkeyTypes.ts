import {HotKeyState} from "@/hot-keys/HotKeyStateMachine";

export interface HotKeyModifierState {
  hotKeys: HotKey[],
  hotKeyStateMachine: HotKeyState,
  lastW3cPort: string,
}

export enum ModifierKey {
  None, CommandOrControl, Alt, Shift
}

export class ClickCombination {
  modifier: ModifierKey;
  hotKey: string;

  constructor(modifier: ModifierKey, hotKey: string) {
    this.hotKey = hotKey;
    this.modifier = modifier;
  }

  get asString() {
    const keys = [this.modifier !== ModifierKey.None ? ModifierKey[this.modifier] : null, this.hotKey].filter(f => f);
    return keys.join("+");
  }
}

export interface HotKey {
  combo: ClickCombination
  key: string
}
