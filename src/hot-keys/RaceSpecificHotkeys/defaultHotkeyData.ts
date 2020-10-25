import {Ability, HotkeyMappingPerRace, Unit} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";

const defaultUnitAbilities = [
    new Ability("Move", "btnmove", "attack", "M", []),
    new Ability("Stop", "btnstop", "attack", "Spatrol", []),
    new Ability("Hold", "btnholdposition", "attack", "A", []),
    new Ability("Attack", "btnattack", "attack", "A", []),
    new Ability("Patrol", "btnpatrol", "attack", "A", [])
]

const defaultUnitAbilitiesFigther = [
    new Ability("Move", "btnmove", "attack", "M", []),
    new Ability("Stop", "btnstop", "attack", "Spatrol", []),
    new Ability("Hold", "btnholdposition", "attack", "A", []),
    new Ability("Attack", "btnattack", "attack", "A", []),
    new Ability("Patrol", "btnpatrol", "attack", "A", []),
    Ability.Default("default1"),
    Ability.Default("default2"),
    Ability.Default("default3"),
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
          new Ability('Repair', 'btnrepair', 'cmdbuildhuman', 'B', []),
          Ability.Default("defa"),
          new Ability('Gather', 'btngathergold', 'cmdbuildhuman', 'B', []),
          new Ability('Build', 'btnhumanbuild', 'cmdbuildhuman', 'B', [
              new Ability('Build Townhall', 'btntownhall', 'htow', 'H', []),
              new Ability('Build Arcane Vault', 'btnarcanevault', 'hvlt', 'V', [])
          ]),
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
