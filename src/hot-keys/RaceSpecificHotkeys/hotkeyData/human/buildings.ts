import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    buildingWithCancel,
    cancelBuild,
    defaultMainBuilding,
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const buildings =
    [
        new Building('Townhall', 'btntownhall', [
            new Ability('Train Peasant', 'btnpeasant', 'hpea', 'P', []),
            ...defaultMainBuilding,
            //new Ability.DoubleHotkey('Upgrade to Keep', 'btnkeep', 'hkee', 'U', [], 'hcas'),
            new Ability('Call to Arms', 'btncalltoarms', 'amil', 'C', []),
            new Ability('Back to Work', 'btnbacktowork', 'amil', 'W', []),
            cancelBuild
        ]),
        new Building('Barracks', 'btnhumanbarracks', [
            new Ability('Train Footman', 'btnfootman', 'hfoo', 'F', []),
            new Ability('Train Rifleman', 'btnrifleman', 'hrif', 'R', []),
            new Ability('Train Knight', 'btnknight', 'hkni', 'K', []),
            ...Ability.Defaults(3),
            new Ability('Research Sundering Blades', 'btnsunderingblades', 'rhsb', 'B', []),
            new Ability('Set Rally Point', 'btnrallypoint', 'cmdrally', 'Y', []),
            new Ability('Research Defend', 'btndefend', 'rhde', 'D', []),
            new Ability('Research Long Rifles', 'btndwarvenlongrifle', 'rhri', 'L', []),
            new Ability('Research Animal War Training', 'btnanimalwartraining', 'rhan', 'A', []),
            cancelBuild
        ])
    ] as Unit[]

export default buildings;
