import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {cancelBuild, rally} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const buildings =
    [
        new Building('Chimaera Roost', 'btnchimaeraroost', [
            new Ability('Train Chimaera', 'btnchimaera', 'echm', 'C', []),
            ...Ability.Defaults(6),
            rally,
            new Ability('Research Corrosive Breath', 'btncorrosivebreath', 'recb', 'B', []),
            ...Ability.Defaults(2),
            cancelBuild,
        ]),
    ] as Unit[]

export default buildings;
