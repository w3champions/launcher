import {
    Ability,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    cancel, cancelBuild,
    defaultFighterAbilities, defaultSiegeAbilities,
    defaultUnitAbilities
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

export const shadowMeld = Ability.Create("Shadowmeld", "btnambush", "ashm", "I", []);

const defaultNightelfFighterAbilities = [
    ...defaultUnitAbilities,
    Ability.Default(),
    shadowMeld,
    Ability.Default()
]

const units =
    [
        new Unit('Wisp', 'btnwisp', [
            Ability.Create("Move", "btnmove", "cmdmove", "M", []),
            Ability.Create("Stop", "btnstop", "cmdstop", "S", []),
            Ability.Create("Hold", "btnholdposition", "cmdholdpos", "H", []),
            Ability.Default(),
            Ability.Create("Patrol", "btnpatrol", "cmdpatrol", "P", []),
            Ability.UnhotkeyAbility('Renew ', 'btnwisphealoff', 'aren', 'R'),
            Ability.Default(),
            Ability.Create('Gather', 'btngathergold', 'awha', 'G', []),
            Ability.Unmovable('Create Building', 'btnnightelfbuild', 'cmdbuildnightelf', 'B', [
                Ability.Create('Create Tree of Life', 'btntreeoflife', 'etol', 'T', []),
                Ability.Create('Create Ancient of War', 'btnancientoftheearth', 'eaom', 'R', []),
                Ability.Create('Create Hunter’s Hall', 'btnhuntershall', 'edob', 'H', []),
                Ability.Create('Create Ancient Protector', 'btntreant', 'etrp', 'P', []),
                Ability.Create('Create Moon Well', 'btnmoonwell', 'emow', 'M', []),
                Ability.Create('Create Altar of Elders', 'btnaltarofelders', 'eate', 'A', []),
                Ability.Create('Create Ancient of Lore', 'btnancientoflore', 'eaoe', 'L', []),
                Ability.Default(),
                Ability.Create('Create Ancient of Wind', 'btnancientofthemoon', 'eaow', 'W', []),
                Ability.Create('Create Chimaera Roost', 'btnchimaeraroost', 'edos', 'C', []),
                Ability.Create('Create Ancient of Wonders', 'btnancientofwonders', 'eden', 'D', []),
                cancel
            ]),
            Ability.Create('Denotate', 'btnwispsplode', 'adtn', 'D', []),
            Ability.Default(),
            cancelBuild
        ]),

        new Unit('Archer', 'btnarcher', [
            ...defaultNightelfFighterAbilities,
            Ability.Create("Mount Hippogryph", "btnhippogriffrider", "aco2", "U", []),
        ]),

        new Unit('Huntress', 'btnhuntress', [
            ...defaultNightelfFighterAbilities,
            Ability.Create("Sentinel", "btnsentinel", "aesn", "E", []),
        ]),

        new Unit('Glaive Thrower', 'btnglaivethrower', [
            ...defaultSiegeAbilities,
        ]),

        new Unit('Dryad', 'btndryad', [
            ...defaultFighterAbilities,
            Ability.UnhotkeyAbility("Abolish Magic", "btndryaddispelmagicoff", "aadm", "B"),
        ]),

        new Unit('Druid of the Claw', 'btndruidoftheclaw', [
            ...defaultFighterAbilities,
            Ability.MultiHotkey("Roar ", "btnbattleroar", "aroa", "R", [], ["ara2"]),
            Ability.Create("Rejuvenation", "btnrejuvenation", "arej", "E", []),
            Ability.Default(),
            Ability.UnhotkeyAbility("Bear Form", "btnbearform", "abrf", "F"),
        ]),

        new Unit('Mountain Giant', 'btnmountaingiant', [
            ...defaultFighterAbilities,
            Ability.Create("Taunt", "btntaunt", "atau", "T", []),
            Ability.Create("War Club", "btngrabtree", "agra", "W", []),
        ]),

        new Unit('Hippogryph', 'btnhippogriff', [
            ...defaultFighterAbilities,
            Ability.Create("Pick up Archer", "btnhippogriffrider", "aco3", "U", []),
        ]),

        new Unit('Hippogryph Rider', 'btnhippogriffrider', [
            ...defaultFighterAbilities,
            Ability.Create("Dismount Archer", "btnarcher", "adec", "U", [])
        ]),

        new Unit('Druid of the Talon', 'btndruidofthetalon', [
            ...defaultFighterAbilities,
            Ability.UnhotkeyAbility("Faerie Fire", "btnfaeriefireoff", "afae", "R", "R", false,["afa2"]),
            Ability.Create("Cyclone", "btncyclone", "acyc", "C", []),
            Ability.Default(),
            Ability.UnhotkeyAbility("Storm Crow Form", "btnravenform", "arav", "F")
        ]),

        new Unit('Faerie Dragon', 'btnfaeriedragon', [
            ...defaultFighterAbilities,
            Ability.UnhotkeyAbility("Phase Shift", "btnphaseshiftoff", "apsh", "E"),
            Ability.UnhotkeyAbility("Mana Flare", "btnmanaflare", "amfl", "F")
        ]),

        new Unit('Avatar of Vengance', 'btnvengeanceincarnate', [
            ...defaultFighterAbilities,
            Ability.Create("Spirit of Vengeance", "btnavengingwatcheroff", "avng", "V", []),
        ]),

    ] as Unit[]

export default units;
