import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {defaultFighterAbilities, defaultUnitAbilities} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const units =
    [
        new Unit('Peasant', 'btnpeasant', [
            ...defaultUnitAbilities,
            new Ability('Repair', 'btnrepair', 'ahrp', 'F', 'F', []),
            Ability.Default(),
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
        ])
    ] as Unit[]

export default units;
