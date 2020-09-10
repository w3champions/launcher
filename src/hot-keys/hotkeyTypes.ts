import {HotKeyState} from "@/hot-keys/HotKeyStateMachine";

export interface HotKeyModifierState {
  hotKeys: HotKey[],
  hotKeyStateMachine: HotKeyState,
  toggleButton: ClickCombination,
  lastW3cPort: string,
}

export enum ModifierKey {
  None = 0, Ctrl = 1, Alt = 2, Shift = 3, Space = 4, Cmd = 5
}

export enum HotkeyTabs {
  items= 0, human = 1, orc = 2, undead = 3, nightelf = 4, neutral = 5
}

export interface ClickCombination {
  modifier: ModifierKey,
  hotKey: KeyDto,
}

export interface HotKey {
  combo: ClickCombination,
  key: string,
}

export interface KeyDto {
  key: string,
  uiDisplay: string,
}
