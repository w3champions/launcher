import {
    Ability,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    cancel,
    defaultFighterAbilities,
    defaultUnitAbilities
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const units =
    [
        new Unit('Acolyte', 'btnacolyte', [
            ...defaultUnitAbilities,
            new Ability('Restore', 'btnrepair', 'arst', 'R', 'R', []),
            Ability.Default(),
            new Ability('Gather', 'btngathergold', 'ahaa', 'G', 'G', []),
            new Ability('Summon Building', 'btnscourgebuild', 'cmdbuildundead', 'B', 'B', [
                new Ability('Summon Necropolis', 'btnnecropolis', 'unpl', 'N', 'N', []),
                new Ability('Summon Crypt', 'btncrypt', 'usep', 'C', 'C', []),
                new Ability('Haunt Gold Mine', 'btnhauntedmine', 'ugol', 'G', 'G', []),
                new Ability('Summon Graveyard', 'btngraveyard', 'ugrv', 'V', 'V', []),
                new Ability('Summon Ziggurat', 'btnziggurat', 'uzig', 'Z', 'Z', []),
                new Ability('Summon Altar of Darkness', 'btnaltarofdarkness', 'uaod', 'A', 'A', []),
                new Ability('Summon Temple of the Damned', 'btntempleofthedamned', 'utod', 'T', 'T', []),
                new Ability('Summon Slaughterhouse', 'btnslaughterhouse', 'uslh', 'H', 'H', []),
                new Ability('Summon Sacrificial Pit', 'btnsacrificialpit', 'usap', 'S', 'S', []),
                new Ability('Summon Boneyard', 'btnboneyard', 'ubon', 'B', 'B', []),
                new Ability('Summon Tomb of Relics', 'btntombofrelics', 'utom', 'R', 'R', []),
                cancel
            ]),
            new Ability('Unsummon Building', 'btnunsummonbuilding', 'auns', 'U', 'U', []),
            Ability.Default(),
            new Ability('Sacrifice ', 'btnsacrifice', 'alam', 'C', 'C', []),
        ]),
        new Unit('Ghoul', 'btnghoul', [
            ...defaultUnitAbilities,
            Ability.Default(),
            Ability.Default(),
            new Ability('Gather', 'btngathergold', 'ahrl', 'G', 'G', []),
            new Ability('Cannibalize', 'btncannibalize', 'acan', 'C', 'C', []),
        ]),
        new Unit('Crypt Fiend', 'btncryptfiend', [
            ...defaultFighterAbilities,
            new Ability('Web', 'btnweboff', 'aweb', 'W', 'W', []),
            Ability.Default(),
            Ability.Default(),
            new Ability('Burrow', 'btncryptfiendburrow', 'abur', 'B', 'B', []),
        ])
    ] as Unit[]

export default units;
