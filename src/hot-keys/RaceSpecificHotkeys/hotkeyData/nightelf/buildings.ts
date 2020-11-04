import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {cancelBuild, defaultMainBuilding} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";
const uproot = new Ability('Uproot', 'btnuproot', 'aro1', 'R', [])

const buildings =
    [
        new Building('Tree of Life', 'btntreeoflife', [
            new Ability('Train Wisp', 'btnwisp', 'hpea', 'P', []),
            ...defaultMainBuilding(
                new Ability('Research Nature’s Blessing', 'btnnaturesblessing', 'renb', 'N', []),
                'repm'
            ),
            Ability.DoubleHotkey('Upgrade', 'btntreeofages', 'etoa', 'U', [], 'etoe'),
            new Ability('Entangle Gold Mine', 'btngoldmine', 'aent', 'G', []),
            uproot,
            cancelBuild
        ])
    ] as Unit[]

export default buildings;
