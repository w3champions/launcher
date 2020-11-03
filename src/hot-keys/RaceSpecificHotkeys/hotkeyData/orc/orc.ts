import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";
import {
    HotkeyMappingPerRace
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import units from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/orc/units";
import buildings from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/orc/buildings";
import heroes from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/orc/heroes";

const orc =
  {
    hotkeyType: HotkeyType.orc,
      units: [
          ...units,
          ...buildings,
          ...heroes
      ]
  } as HotkeyMappingPerRace

export default orc;
