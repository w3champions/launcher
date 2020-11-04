import {
    Ability,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    cancel, cancelBuild,
    defaultFighterAbilities, defaultSiegeAbilities,
    defaultUnitAbilities
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

export const shadowMeld = new Ability("Shadowmeld", "btnambush", "ashm", "I", []);

const defaultNightelfFighterAbilities = [
    ...defaultUnitAbilities,
    Ability.Default(),
    shadowMeld,
    Ability.Default()
]

const units =
    [
        new Unit('Wisp', 'btnwisp', [
            new Ability("Move", "btnmove", "cmdmove", "M", []),
            new Ability("Stop", "btnstop", "cmdstop", "S", []),
            new Ability("Hold", "btnholdposition", "cmdholdpos", "H", []),
            Ability.Default(),
            new Ability("Patrol", "btnpatrol", "cmdpatrol", "P", []),
            new Ability('Renew ', 'btnwisphealoff', 'aren', 'R', []),
            Ability.Default(),
            new Ability('Gather', 'btngathergold', 'awha', 'G', []),
            new Ability('Create Building', 'btnnightelfbuild', 'cmdbuildnightelf', 'B', [
                new Ability('Create Tree of Life', 'btntreeoflife', 'etol', 'T', []),
                new Ability('Create Ancient of War', 'btnancientoftheearth', 'eaom', 'R', []),
                new Ability('Create Hunter’s Hall', 'btnhuntershall', 'edob', 'H', []),
                new Ability('Create Ancient Protector', 'btntreant', 'etrp', 'P', []),
                new Ability('Create Moon Well', 'btnmoonwell', 'emow', 'M', []),
                new Ability('Create Altar of Elders', 'btnaltarofelders', 'eate', 'A', []),
                new Ability('Create Ancient of Lore', 'btnancientoflore', 'eaoe', 'L', []),
                Ability.Default(),
                new Ability('Create Ancient of Wind', 'btnancientofthemoon', 'eaow', 'W', []),
                new Ability('Create Chimaera Roost', 'btnchimaeraroost', 'edos', 'C', []),
                new Ability('Create Ancient of Wonders', 'btnancientofwonders', 'eden', 'D', []),
                cancel
            ]),
            new Ability('Denotate', 'btnwispsplode', 'adtn', 'D', []),
            Ability.Default(),
            cancelBuild
        ]),

        new Unit('Archer', 'btnarcher', [
            ...defaultNightelfFighterAbilities,
            new Ability("Mount Hippogryph", "btnhippogriffrider", "aco2", "U", []),
        ]),

        new Unit('Huntress', 'btnhuntress', [
            ...defaultNightelfFighterAbilities,
            new Ability("Sentinel", "btnsentinel", "aesn", "E", []),
        ]),

        new Unit('Glaive Thrower', 'btnglaivethrower', [
            ...defaultSiegeAbilities,
        ]),

        new Unit('Dryad', 'btndryad', [
            ...defaultFighterAbilities,
            new Ability("Abolish Magic", "btndryaddispelmagicoff", "aadm", "B", []),
        ]),

        new Unit('Druid of the Claw', 'btndruidoftheclaw', [
            ...defaultFighterAbilities,
            Ability.MultiHotkey("Roar ", "btnbattleroar", "aroa", "R", [], ["ara2"]),
            new Ability("Rejuvenation", "btnrejuvenation", "arej", "E", []),
            Ability.Default(),
            new Ability("Bear Form", "btnbearform", "abrf", "F", []),
        ]),

        new Unit('Mountain Giant', 'btnmountaingiant', [
            ...defaultFighterAbilities,
            new Ability("Taunt", "btntaunt", "atau", "T", []),
            new Ability("War Club", "btngrabtree", "agra", "W", []),
        ]),

        new Unit('Hippogryph', 'btnhippogriff', [
            ...defaultFighterAbilities,
            new Ability("Pick up Archer", "btnhippogriffrider", "aco3", "U", [])
        ]),

        new Unit('Hippogryph Rider', 'btnhippogriffrider', [
            ...defaultFighterAbilities,
            new Ability("Dismount Archer", "btnarcher", "adec", "U", [])
        ]),

        new Unit('Druid of the Talon', 'btndruidofthetalon', [
            ...defaultFighterAbilities,
            Ability.MultiHotkey("Faerie Fire", "btnfaeriefireoff", "afae", "R", [], ["afa2"]),
            new Ability("Cyclone", "btncyclone", "acyc", "C", []),
            Ability.Default(),
            new Ability("Storm Crow Form", "btnravenform", "arav", "F", [])
        ]),

        new Unit('Faerie Dragon', 'btnfaeriedragon', [
            ...defaultFighterAbilities,
            new Ability("Phase Shift", "btnphaseshiftoff", "apsh", "E", []),
            new Ability("Mana Flare", "btnmanaflare", "amfl", "F", [])
        ]),

        new Unit('Chimaera', 'btnchimaera', [
            ...defaultFighterAbilities,
        ]),

    ] as Unit[]

export default units;
