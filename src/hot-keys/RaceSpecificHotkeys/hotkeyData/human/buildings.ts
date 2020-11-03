import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";

const buildings =
    [
        new Building('Townhall', 'btntownhall', [
            new Ability('Train Peasant', 'btnpeasant', 'hpea', 'P', 'P', []),
            new Ability('Call to Arms', 'btncalltoarms', 'amil', 'C', 'C', []),
        ])
    ] as Unit[]

export default buildings;
