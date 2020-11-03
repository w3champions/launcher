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

const nightelfs =
  {
    hotkeyType: HotkeyType.nightelf,
    units: []
  } as HotkeyMappingPerRace

export default nightelfs;
