import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    cancelBuild,
    defaultFighterAbilities,
    defaultMainBuilding, rally
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";
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
        ]),

        new Building('Entangled Gold Mine', 'btngoldmine', [
            ...Ability.Defaults(9),
            new Ability('Load Wisp', 'btnload', 'slo2', 'L', []),
            new Ability('Unload All', 'btnunload', 'adri', 'U', [])
        ]),

        new Building('Uprooted Ancient', 'btnuproot', [
            ...defaultFighterAbilities,
            new Ability('Eat Tree', 'btneattree', 'aeat', 'E', []),
            ...Ability.Defaults(2),
            uproot
        ]),

        new Building('Ancient of War', 'btnancientoftheearth', [
            new Ability('Train Archer', 'btnarcher', 'earc', 'A', []),
            new Ability('Train Huntress ', 'btnhuntress', 'esen', 'H', []),
            new Ability('Train Glaive Thrower', 'btnglaivethrower', 'ebal', 'T', []),
            Ability.Default(),
            new Ability('Research Marksmanship', 'btnmarksmanship', 'remk', 'M', []),
            new Ability('Research Moon Glaive', 'btnupgrademoonglaive', 'remg', 'G', []),
            Ability.Default(),
            rally,
            new Ability('Research Improved Bows', 'btnimprovedbows', 'reib', 'I', []),
            new Ability('Research Sentinel', 'btnsentinel', 'resc', 'S', []),
            new Ability('Research Vorpal Blades', 'btnvorpalblades', 'repb', 'P', []),
            uproot
        ])
    ] as Unit[]

export default buildings;
