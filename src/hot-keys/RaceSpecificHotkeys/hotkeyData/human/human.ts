import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";
import {
    HotkeyMappingPerRace
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import buildings from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/human/buildings";
import units from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/human/units";
import heroes from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/human/heroes";

const human =
  {
    hotkeyType: HotkeyType.human,
    units: [
        ...buildings,
        ...units,
        ...heroes
    ]
  } as HotkeyMappingPerRace

export default human;
