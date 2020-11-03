import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";
import {
    Ability,
    Building,
    Unit,
    Hero,
    HotkeyMappingPerRace
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    defaultFighterAbilities,
    defaultHeroAbilities,
    defaultUnitAbilities
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const orcs =
  {
    hotkeyType: HotkeyType.orc,
    units: []
  } as HotkeyMappingPerRace

export default orcs;
