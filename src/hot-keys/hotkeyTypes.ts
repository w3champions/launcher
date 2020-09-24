import {HotKeyState} from "@/hot-keys/HotKeyStateMachine";

export interface HotKeyModifierState {
  itemHotKeys: HotKey[],
  customHotkeys: HotkeyMappingPerRace[],
  hotKeyStateMachine: HotKeyState,
  toggleButton: ClickCombination,
  lastW3cPort: string,
}

export enum ModifierKey {
  None = 0, Ctrl = 1, Alt = 2, Shift = 3, Space = 4, Cmd = 5
}

export enum HotkeyType {
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

export interface HotkeyMappingPerRace {
  hotkeyType: HotkeyType,
  units: Unit[],
  buildings: Unit[],
  heroes: Unit[],
}

export interface W3cIcon {
  icon: string;
}

export class Unit implements W3cIcon {
  constructor(name: string, icon: string, abilities: Ability[]) {
    this.name = name;
    this.icon = icon;
    this.abilities = abilities;
  }

  public static Default() {
    return new Unit("", "", [])
  }

  public name: string;
  public icon: string;
  public abilities: Ability[];
}

export class Ability implements W3cIcon {
  constructor(name: string, hotkeyIdentifier: string, icon: string, defaultHotkey: string, abilities: Ability[]) {
    this.name = name;
    this.hotkeyIdentifier = hotkeyIdentifier;
    this.icon = icon;
    this.defaultHotkey = defaultHotkey;
    this.abilities = abilities;

  }

  public static Default() {
    return new Ability("", "", "", "", [])
  }

  public name: string;
  public hotkeyIdentifier: string;
  public icon: string;
  public defaultHotkey: string;
  public abilities: Ability[];
}

