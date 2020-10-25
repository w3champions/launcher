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

  public static Default(identifier: string) {
    return new Unit("", identifier, [])
  }

  public name: string;
  public icon: string;
  public abilities: Ability[];
}

export class Ability implements W3cIcon {
  constructor(name: string, icon: string, hotkeyIdentifier: string, defaultHotkey: string, currentHotkey: string, abilities: Ability[]) {
    this.name = name;
    this.hotkeyIdentifier = hotkeyIdentifier;
    this.icon = icon;
    this.defaultHotkey = defaultHotkey;
    this.currentHotkey = currentHotkey;
    this.abilities = abilities;

  }

  public static Default(identifier: string) {
    return new Ability("", identifier, "", "", "", [])
  }

  public name: string;
  public hotkeyIdentifier: string;
  public icon: string;
  public defaultHotkey: string;
  public currentHotkey: string;
  public abilities: Ability[];
}

