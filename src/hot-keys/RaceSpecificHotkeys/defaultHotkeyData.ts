import {Ability, HotkeyMappingPerRace, Unit} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";

const defaultUnitAbilities = [
    new Ability("Move", "btnmove", "cmdmove", "M", "M", []),
    new Ability("Stop", "btnstop", "cmdstop", "S", "S", []),
    new Ability("Hold", "btnholdposition", "cmdholdpos", "H", "H", []),
    new Ability("Attack", "btnattack", "cmdattack", "A", "A", []),
    new Ability("Patrol", "btnpatrol", "cmdpatrol", "P", "P", [])
]

const defaultUnitAbilitiesFigther = [
    ...defaultUnitAbilities,
    Ability.Default("default_1"),
    Ability.Default("default_2"),
    Ability.Default("default_3"),
]

const defaultHotkeyData = [
  {
    hotkeyType: HotkeyType.human,
    buildings: [
      new Unit('Townhall', 'btntownhall', [
          new Ability('Train Peasant', 'btnpeasant', 'hpea', 'P', 'P', []),
          new Ability('Call to Arms', 'btncalltoarms', 'amil', 'C', 'C', []),
      ])
    ],
    units: [
        new Unit('Peasant', 'btnpeasant', [
          ...defaultUnitAbilities,
          new Ability('Repair', 'btnrepair', 'ahrp', 'F', 'F', []),
          Ability.Default("default_a"),
          new Ability('Gather', 'btngathergold', 'ahar', 'G', 'G', []),
          new Ability('Build', 'btnhumanbuild', 'cmdbuildhuman', 'B', 'B', [
              new Ability('Build Townhall', 'btntownhall', 'htow', 'H', 'H', []),
              new Ability('Build Arcane Vault', 'btnarcanevault', 'hvlt', 'V', 'V', [])
          ]),
          new Ability('Call to Arms', 'btncalltoarms', 'amil', 'C', 'C', [])
        ]),
        new Unit('Footman', 'btnfootman', [
          ...defaultUnitAbilitiesFigther,
          new Ability('Defend', 'btndefend', 'adef', 'P', 'P', []),
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
