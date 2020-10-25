import {Ability, HotkeyMappingPerRace, Unit} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";

const defaultUnitAbilities = [
    new Ability("Move", "btnmove", "cmdmove", "M", []),
    new Ability("Stop", "btnstop", "cmdstop", "S", []),
    new Ability("Hold", "btnholdposition", "cmdholdpos", "H", []),
    new Ability("Attack", "btnattack", "cmdattack", "A", []),
    new Ability("Patrol", "btnpatrol", "cmdpatrol", "P", [])
]

const defaultUnitAbilitiesFigther = [
    new Ability("Move", "btnmove", "attack", "M", []),
    new Ability("Stop", "btnstop", "attack", "Spatrol", []),
    new Ability("Hold", "btnholdposition", "attack", "A", []),
    new Ability("Attack", "btnattack", "attack", "A", []),
    new Ability("Patrol", "btnpatrol", "attack", "A", []),
    Ability.Default("default_1"),
    Ability.Default("default_2"),
    Ability.Default("default_3"),
]

const defaultHotkeyData = [
  {
    hotkeyType: HotkeyType.human,
    buildings: [
      new Unit('Townhall', 'btntownhall', [
          new Ability('Train Peasant', 'btnpeasant', 'hpea', 'P', []),
          new Ability('Call to Arms', 'btncalltoarms', 'amil','C', []),
      ])
    ],
    units: [
        new Unit('Peasant', 'btnpeasant', [
          ...defaultUnitAbilities,
          new Ability('Repair', 'btnrepair', 'ahrp', 'F', []),
          Ability.Default("default_a"),
          new Ability('Gather', 'btngathergold', 'ahar', 'G', []),
          new Ability('Build', 'btnhumanbuild', 'cmdbuildhuman', 'B', [
              new Ability('Build Townhall', 'btntownhall', 'htow', 'H', []),
              new Ability('Build Arcane Vault', 'btnarcanevault', 'hvlt', 'V', [])
          ]),
          new Ability('Call to Arms', 'btncalltoarms', 'amil', 'C', [])
        ]),
        new Unit('Footman', 'btnfootman', [
          ...defaultUnitAbilitiesFigther,
          new Ability('Defend', 'btndefend', 'adef', 'P', []),
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
