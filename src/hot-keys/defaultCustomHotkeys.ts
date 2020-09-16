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
    hotkeyType: HotkeyType.orc
  },
  {
    hotkeyType: HotkeyType.undead
  },
  {
    hotkeyType: HotkeyType.nightelf
  },
  {
    hotkeyType: HotkeyType.neutral
  },
] as HotkeyMappingPerRace[]

export default defaultCustomHotkeys;
