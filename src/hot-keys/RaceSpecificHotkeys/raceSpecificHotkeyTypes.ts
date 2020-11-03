import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";

export interface HotkeyMappingPerRace {
  hotkeyType: HotkeyType,
  units: Unit[]
}

export interface W3cIcon {
  icon: string;
}

export interface RaceHotKey {
  hotkeyCommand: string;
  hotKey: string;
}

export class Unit implements W3cIcon {
  public type = Unit.name

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

export class Building extends Unit {
  public type = Building.name
}

export class Hero extends Unit {
  public type = Hero.name
}

export class Ability implements W3cIcon {
  constructor(name: string, icon: string, hotkeyIdentifier: string, defaultHotkey: string, abilities: Ability[]) {
    this.name = name;
    this.hotkeyIdentifier = hotkeyIdentifier;
    this.icon = icon;
    this.defaultHotkey = defaultHotkey;
    this.currentHotkey = defaultHotkey;
    this.abilities = abilities;
    this.hasConflict = false;
  }

  public static Default() {
    const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return new Ability("", guid, "", "", [])
  }

  public name: string;
  public hasConflict: boolean;
  public hotkeyIdentifier: string;
  public icon: string;
  public defaultHotkey: string;
  public currentHotkey: string;
  public abilities: Ability[];
}

