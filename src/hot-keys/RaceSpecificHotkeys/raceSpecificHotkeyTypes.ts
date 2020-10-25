import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";

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

