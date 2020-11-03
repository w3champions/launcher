import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";
import {
    HotkeyMappingPerRace
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import units from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/undead/units";
import buildings from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/undead/buildings";
import heroes from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/undead/heroes";

const undead =
  {
    hotkeyType: HotkeyType.undead,
      units: [
          ...units,
          ...buildings,
          ...heroes
      ]
  } as HotkeyMappingPerRace

export default undead;
