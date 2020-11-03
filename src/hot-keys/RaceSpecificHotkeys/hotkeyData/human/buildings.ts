import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {cancelBuild, defaultMainBuilding} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const buildings =
    [
        new Building('Townhall', 'btntownhall', [
            new Ability('Train Peasant', 'btnpeasant', 'hpea', 'P', []),
            ...defaultMainBuilding,
            new Ability('Upgrade to Keep', 'btnkeep', 'hkee', 'U', []),
            new Ability('Call to Arms', 'btncalltoarms', 'amil', 'C', []),
            Ability.Default(),
            cancelBuild
        ])
    ] as Unit[]

export default buildings;
