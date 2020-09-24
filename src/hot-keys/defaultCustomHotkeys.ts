import {HotkeyMappingPerRace, HotkeyType} from "@/hot-keys/hotkeyTypes";

const defaultCustomHotkeys = [
  {
    hotkeyType: HotkeyType.human,
    buildings: [],
    units: [],
    heroes: [],
  },
  {
    hotkeyType: HotkeyType.orc,
    units: [],
    buildings:[],
    heroes: [],
  },
  {
    hotkeyType: HotkeyType.undead,
    units: [],
    buildings:[],
    heroes: [],
  },
  {
    hotkeyType: HotkeyType.nightelf,
    units: [],
    buildings:[],
    heroes: [],
  },
  {
    hotkeyType: HotkeyType.neutral,
    units: [],
    buildings:[],
    heroes: [],
  },
] as HotkeyMappingPerRace[]

export default defaultCustomHotkeys;
