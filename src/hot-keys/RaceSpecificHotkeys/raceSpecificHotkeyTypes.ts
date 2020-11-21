import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";

export interface HotkeyMappingPerRace {
  hotkeyType: HotkeyType,
  units: Unit[]
}

export interface W3cIcon {
  icon: string;
}

export interface RaceHotKey {
  isW3cSupportedKey: boolean;
  hotkeyCommand: string;
  hotkeyName: string;
  researchHotkey: string;
  hotKey: string;
  isStagedUpgrade: boolean;
  unHotkey: string;
  additionalHotkeyIdentifiers: string[];
  grid: Grid | null;
}

export class Grid implements W3cIcon {
  public Select() {
    this.icon = 'selected-item'
  }

  public UnSelect() {
    this.icon = `none${this.x}${this.y}`;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.UnSelect();
  }

  public x: number;
  public y: number;
  public icon!: string;
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
  private constructor(
      name: string,
      icon: string,
      hotkeyIdentifier: string,
      defaultHotkey: string,
      abilities: Ability[],
      isResearchAbility: boolean = false,
      isAura: boolean = false,
      additionalHotkeyIdentifiers: string[] = [],
      isStagedUpgrade: boolean = false,
      unHotkey: string = '',
      canNotBeMoved: boolean = false) {
    this.name = name;
    this.hotkeyIdentifier = hotkeyIdentifier;
    this.icon = icon;
    this.defaultHotkey = defaultHotkey;
    this.currentHotkey = defaultHotkey;
    this.researchHotkey = defaultHotkey;
    this.additionalHotkeyIdentifiers = additionalHotkeyIdentifiers;
    this.abilities = abilities;
    this.hasConflict = false;
    this.currentGrid = null;
    this.isAura = isAura;
    this.unHotkey = unHotkey;
    this.isUnhotkey = !!unHotkey;
    this.isResearchAbility = isResearchAbility;
    this.isStagedUpgrade = isStagedUpgrade;
    this.canNotBeMoved = canNotBeMoved;
  }

  public static Aura(name: string, icon: string, hotkeyIdentifier: string, defaultHotkey: string, abilities: Ability[]) {
    return new Ability(name, icon, hotkeyIdentifier, defaultHotkey, abilities, true, true)
  }

  public static Create(name: string, icon: string, hotkeyIdentifier: string, defaultHotkey: string, abilities: Ability[]) {
    return new Ability(name, icon, hotkeyIdentifier, defaultHotkey, abilities)
  }

  public static Unmovable(name: string, icon: string, hotkeyIdentifier: string, defaultHotkey: string, abilities: Ability[]) {
    return new Ability(name, icon, hotkeyIdentifier, defaultHotkey, abilities, false, false, [], false, '', true)
  }

  public static MultiHotkey(name: string, icon: string, hotkeyIdentifier: string, defaultHotkey: string, abilities: Ability[], additionalHotkeyIdentifiers: string[], isResearch: boolean = false) {
    return new Ability(name, icon, hotkeyIdentifier, defaultHotkey, abilities, isResearch, false, additionalHotkeyIdentifiers)
  }

  public static StagedUpgrade(name: string, icon: string, hotkeyIdentifier: string, defaultHotkey: string, abilities: Ability[]) {
    return new Ability(name, icon, hotkeyIdentifier, defaultHotkey, abilities, false, false, [], true)
  }

  public static UnhotkeyAbility(name: string, icon: string, hotkeyIdentifier: string, defaultHotkey: string, isResearch: boolean = false, extendedAbilities: string[] = []) {
    return new Ability(name, icon, hotkeyIdentifier, defaultHotkey, [], isResearch, false, extendedAbilities, false, defaultHotkey)
  }

  public static HeroAbility(name: string, icon: string, hotkeyIdentifier: string, defaultHotkey: string, abilities: Ability[], isHUnhotkey = false) {
    return new Ability(name, icon, hotkeyIdentifier, defaultHotkey, abilities, true, false, [], false, defaultHotkey)
  }

  public static Default() {
    const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return new Ability("", guid, "", "", [])
  }

  public static Defaults(amount: number) {
    const abs = []
    for (let i = 0; i < amount; i++) {
      abs.push(Ability.Default());
    }

    return abs;
  }

  public name: string;
  public hasConflict: boolean;
  public isAura: boolean;
  public isResearchAbility: boolean;
  public isStagedUpgrade: boolean;
  public canNotBeMoved: boolean;
  public isUnhotkey: boolean;
  public hotkeyIdentifier: string;
  public additionalHotkeyIdentifiers: string[];
  public icon: string;
  public defaultHotkey: string;
  public unHotkey: string;
  public researchHotkey: string;
  public currentHotkey: string;
  public currentGrid: Grid | null;
  public abilities: Ability[];
}
