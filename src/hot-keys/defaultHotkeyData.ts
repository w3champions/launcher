import {Ability, HotkeyMappingPerRace, HotkeyType, Unit} from "@/hot-keys/hotkeyTypes";

const defaultHotkeyData = [
  {
    hotkeyType: HotkeyType.human,
    buildings: [
      new Unit('Townhall', 'btntownhall', [
          new Ability('Train Peasant', 'hpea', 'btnpeasant', 'P', []),
          new Ability('Call to Arms', 'amil', 'btncalltoarms', 'C', []),
      ])
    ],
    units: [
        new Unit("Peasant", "btnpeasant", [
          new Ability('Build', 'cmdbuildhuman', 'btnpeasant', 'B', [
              new Ability('Build Townhall', 'btntownhall', 'htow', 'H', []),
              new Ability('Build Arcane Vault', 'btnarcanevault', 'hvlt', 'V', [])
          ]),
        ]),
        new Unit("Footman", "btnfootman", [
          new Ability('Defend', 'adef', 'btndefend', 'P', []),
        ])
    ],
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

export default defaultHotkeyData;
