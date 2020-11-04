import {
    Ability,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    cancel, cancelBuild,
    defaultFighterAbilities,
    defaultUnitAbilities
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

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
    ] as Unit[]

export default units;
