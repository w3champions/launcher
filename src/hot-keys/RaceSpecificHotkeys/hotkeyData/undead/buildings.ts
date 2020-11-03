import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {cancelBuild, defaultMainBuilding, rally} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const buildings =
    [
        new Building('Necropolis', 'btnnecropolis', [
            new Ability('Train Acolyte', 'btnacolyte', 'uaco', 'C', []),
            ...defaultMainBuilding,
            new Ability('Upgrade to Halls of the Dead', 'btnhallofthedead', 'unp1', 'U', []),
            Ability.Default(),
            Ability.Default(),
            cancelBuild
        ]),
        new Building('Halls of the Dead', 'btnhallofthedead', [
            new Ability('Train Acolyte', 'btnacolyte', 'uaco', 'C', []),
            ...defaultMainBuilding,
            new Ability('Upgrade to Black Citadel ', 'btnblackcitadel', 'unp2', 'U', []),
            Ability.Default(),
            Ability.Default(),
            cancelBuild
        ]),
        new Building('Crypt', 'btncrypt', [
            new Ability('Train Ghoul', 'btnghoul', 'ugho', 'G', []),
            new Ability('Train Crypt Fiend', 'btncryptfiend', 'ucry', 'F', []),
            new Ability('Train Gargoyle', 'btngargoyle', 'ugar', 'A', []),
            Ability.Default(),

            new Ability('Research Ghoul Frenzy', 'btnghoulfrenzy', 'rugf', 'Z', []),
            new Ability('Research Burrow', 'btncryptfiendburrow', 'rubu', 'B', []),
            new Ability('Research Stone Form', 'btnstoneform', 'rusf', 'S', []),
            rally,

            new Ability('Research Cannibalize', 'btncannibalize', 'ruac', 'C', []),
            new Ability('Research Web', 'btnweboff', 'ruwb', 'W', []),
            Ability.Default(),
            cancelBuild
        ])
    ] as Unit[]

export default buildings;
