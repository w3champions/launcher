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

const neutral =
  {
    hotkeyType: HotkeyType.neutral,
    units: []
  } as HotkeyMappingPerRace

export default neutral;
