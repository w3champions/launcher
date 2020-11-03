import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    cancel,
    defaultFighterAbilities,
    defaultUnitAbilities
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const units =
    [
        new Unit('Peasant', 'btnpeasant', [
            ...defaultUnitAbilities,
            new Ability('Repair', 'btnrepair', 'ahrp', 'F', []),
            Ability.Default(),
            new Ability('Gather', 'btngathergold', 'ahar', 'G', []),
            new Ability('Build', 'btnhumanbuild', 'cmdbuildhuman', 'B', [
                new Ability('Build Townhall', 'btntownhall', 'htow', 'H', []),
                new Ability('Build Arcane Vault', 'btnarcanevault', 'hvlt', 'V', []),
                cancel
            ]),
            new Ability('Call to Arms', 'btncalltoarms', 'amil', 'C', [])
        ]),
        new Unit('Footman', 'btnfootman', [
            ...defaultFighterAbilities,
            new Ability('Defend', 'btndefend', 'adef', 'D', []),
        ])
    ] as Unit[]

export default units;
