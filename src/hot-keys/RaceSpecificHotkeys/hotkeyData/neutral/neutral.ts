import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";
import {
    HotkeyMappingPerRace
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import units from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/neutral/units";
import buildings from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/neutral/buildings";
import heroes from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/neutral/heroes";

const neutral =
  {
    hotkeyType: HotkeyType.neutral,
    units: [
        ...units,
        ...buildings,
        ...heroes
    ]
  } as HotkeyMappingPerRace

export default neutral;
