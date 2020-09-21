import {HotkeyMappingPerRace, HotkeyType} from "@/hot-keys/hotkeyTypes";

const defaultCustomHotkeys = [
  {
    hotkeyType: HotkeyType.human,
    buildings: [
      {
        name: 'Townhall',
        icon: 'btntownhall',
        abilities: [
          {
            hotkeyIdentifier: 'hpea',
            icon: 'btnpeasant',
            name: 'Train Peasant',
            defaultHotkey: 'P'
          },
          {
            hotkeyIdentifier: 'amil',
            icon: 'btncalltoarms',
            name: 'Call to Arms',
            defaultHotkey: 'C'
          }
        ]
      }
    ],
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
