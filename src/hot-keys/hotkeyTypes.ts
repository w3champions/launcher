export interface HotKeyModifierState {
  hotKeys: HotKey[]
}

export enum ModifierKey {
  None, CommandOrControl, Alt, Shift
}

export interface ClickCombination {
  modifier: ModifierKey,
  hotKey: string,
}

export interface HotKey {
  combo: ClickCombination
  key: string
}
