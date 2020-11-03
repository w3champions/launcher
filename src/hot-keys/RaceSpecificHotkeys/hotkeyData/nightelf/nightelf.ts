import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";
import {
    HotkeyMappingPerRace
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import units from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/nightelf/units";
import buildings from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/nightelf/buildings";
import heroes from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/nightelf/heroes";

const nightelf =
  {
    hotkeyType: HotkeyType.nightelf,
      units: [
          ...units,
          ...buildings,
          ...heroes
      ]
  } as HotkeyMappingPerRace

export default nightelf;
