import {HotkeyType} from "@/hot-keys/ItemHotkeys/hotkeyState";
import {
    Ability,
    Building,
    Unit,
    Hero,
    HotkeyMappingPerRace
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    defaultFighterAbilities,
    defaultHeroAbilities,
    defaultUnitAbilities
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const humans =
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
    ]
  } as HotkeyMappingPerRace

export default humans;
