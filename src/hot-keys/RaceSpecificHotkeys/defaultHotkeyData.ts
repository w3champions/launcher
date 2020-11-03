// Explanation:
// the Ability class is the hotkey, that you can alter in the ui. Example:
// new Ability("Move", "btnmove", "cmdmove", "M", "M", [])
// Where the most Parameters are as follow:
// new Ability(<Name in the UI>, <name of the icon>, <name of the hotkey command>, <default hotkey>, <current hootkey (is always the same as default, for the data file here>, [])
// the [] on the end is and array of "Extended Abilities" that open up, when you select the ability. You can see it as sub hotkeys.
// An example is the peasent build hotkey, which is on B, but if you enter that menu, you get more options on what buildings you can build, which also have hotkeys.
// The same goes for hero ability selections for example.
// To add extended abilities, do something like that
// new Ability('Build', 'btnhumanbuild', 'cmdbuildhuman', 'B', 'B', [
//     new Ability('Build Townhall', 'btntownhall', 'htow', 'H', 'H', []),
//     new Ability('Build Arcane Vault', 'btnarcanevault', 'hvlt', 'V', 'V', [])
// ]),



import {
    Ability,
    Building,
    Hero,
    HotkeyMappingPerRace,
    Unit
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";

const defaultUnitAbilities = [
    new Ability("Move", "btnmove", "cmdmove", "M", "M", []),
    new Ability("Stop", "btnstop", "cmdstop", "S", "S", []),
    new Ability("Hold", "btnholdposition", "cmdholdpos", "H", "H", []),
    new Ability("Attack", "btnattack", "cmdattack", "A", "A", []),
    new Ability("Patrol", "btnpatrol", "cmdpatrol", "P", "P", [])
]

const defaultFighterAbilities = [
    ...defaultUnitAbilities,
    Ability.Default("default_1"),
    Ability.Default("default_2"),
    Ability.Default("default_3"),
]

const defaultHeroAbilities = (learningSkills: Ability[]) => [
    ...defaultUnitAbilities,
    Ability.Default("default_1"),
    Ability.Default("default_2"),
    new Ability('Hero Abilities', 'btnskillz', 'cmdselectskill', 'O', 'O', learningSkills)
]

const defaultHotkeyData = [
  {
    hotkeyType: HotkeyType.human,
    units: [
        //Buildings
        new Building('Townhall', 'btntownhall', [
            new Ability('Train Peasant', 'btnpeasant', 'hpea', 'P', 'P', []),
            new Ability('Call to Arms', 'btncalltoarms', 'amil', 'C', 'C', []),
        ]),

        //Units
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
          ...defaultFighterAbilities,
          new Ability('Defend', 'btndefend', 'adef', 'D', 'D', []),
        ]),

        //Heroes
        new Hero('Paladin', 'btnheropaladin', [
            ...defaultHeroAbilities([
                new Ability('Holy Light', 'btnholybolt', 'ahhb', 'T', 'T', []),
                new Ability('Divine Shield', 'btndivineshieldoff', 'adef', 'D', 'D', []),
                new Ability('Devotion Aura', 'btndevotion', 'ahad', 'V', 'V', []),
                new Ability('Resurrection', 'btnresurrection', 'ahre', 'R', 'R', []),
            ]),
            new Ability('Holy Light', 'btnholybolt', 'ahhb', 'T', 'T', []),
            new Ability('Divine Shield', 'btndivineshieldoff', 'adef', 'D', 'D', []),
            Ability.Default("default_5"),
            new Ability('Resurrection', 'btnresurrection', 'ahre', 'R', 'R', []),
        ])
    ],
  },
  {
    hotkeyType: HotkeyType.orc,
    units: [],
  },
  {
    hotkeyType: HotkeyType.undead,
    units: [],
  },
  {
    hotkeyType: HotkeyType.nightelf,
    units: [],
  },
  {
    hotkeyType: HotkeyType.neutral,
    units: [],
  },
] as HotkeyMappingPerRace[]

export default defaultHotkeyData;
