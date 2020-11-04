import {
    Ability,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    cancel,
    defaultFighterAbilities, defaultSiegeAbilities,
    defaultUnitAbilities
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const units =
    [
        new Unit('Acolyte', 'btnacolyte', [
            ...defaultUnitAbilities,
            new Ability('Restore', 'btnrepair', 'arst', 'R', []),
            Ability.Default(),
            new Ability('Gather', 'btngathergold', 'ahaa', 'G', []),
            new Ability('Summon Building', 'btnscourgebuild', 'cmdbuildundead', 'B', [
                new Ability('Summon Necropolis', 'btnnecropolis', 'unpl', 'N', []),
                new Ability('Summon Crypt', 'btncrypt', 'usep', 'C', []),
                new Ability('Haunt Gold Mine', 'btnhauntedmine', 'ugol', 'G', []),
                new Ability('Summon Graveyard', 'btngraveyard', 'ugrv', 'V', []),
                new Ability('Summon Ziggurat', 'btnziggurat', 'uzig', 'Z', []),
                new Ability('Summon Altar of Darkness', 'btnaltarofdarkness', 'uaod', 'A', []),
                new Ability('Summon Temple of the Damned', 'btntempleofthedamned', 'utod', 'T', []),
                new Ability('Summon Slaughterhouse', 'btnslaughterhouse', 'uslh', 'H', []),
                new Ability('Summon Sacrificial Pit', 'btnsacrificialpit', 'usap', 'S', []),
                new Ability('Summon Boneyard', 'btnboneyard', 'ubon', 'B', []),
                new Ability('Summon Tomb of Relics', 'btntombofrelics', 'utom', 'R', []),
                cancel
            ]),
            new Ability('Unsummon Building', 'btnunsummonbuilding', 'auns', 'U', []),
            Ability.Default(),
            new Ability('Sacrifice ', 'btnsacrifice', 'alam', 'C', []),
        ]),
        new Unit('Ghoul', 'btnghoul', [
            ...defaultUnitAbilities,
            ...Ability.Defaults(2),
            new Ability('Gather', 'btngathergold', 'ahrl', 'G', []),
            new Ability('Cannibalize', 'btncannibalize', 'acan', 'C', []),
        ]),
        new Unit('Crypt Fiend', 'btncryptfiend', [
            ...defaultFighterAbilities,
            new Ability('Web', 'btnweboff', 'aweb', 'W', []),
            ...Ability.Defaults(2),
            new Ability('Burrow', 'btncryptfiendburrow', 'abur', 'B', []),
        ]),
        new Unit('Gargoyle', 'btngargoyle', [
            ...defaultUnitAbilities,
            new Ability('Prioritize', 'btnairattackon', 'aatp', 'R', []),
            ...Ability.Defaults(2),
            new Ability('Stone Form', 'btnstoneform', 'astn', 'F', []),
        ]),
        new Unit('Abomination', 'btnabomination', [
            ...defaultFighterAbilities,
            new Ability('Cannibalize', 'btncannibalize', 'acn2', 'C', []),
        ]),
        new Unit('Meat Wagon', 'btnmeatwagon', [
            ...defaultSiegeAbilities,
            new Ability('Load Corpse', 'btnundeadloadoff', 'amel', 'C', []),
            new Ability('Drop All Corpses', 'btnundeadunload', 'amed', 'D', []),
        ]),
        new Unit('Necromancer', 'btnnecromancer', [
            ...defaultFighterAbilities,
            new Ability('Raise Dead', 'btnraisedeadoff', 'arai', 'R', []),
            new Ability('Cripple ', 'btncripple', 'acri', 'C', []),
            new Ability('Unholy Frenzy', 'btnunholyfrenzy', 'auhf', 'U', []),
        ]),
        new Unit('Banshee', 'btnbanshee', [
            ...defaultFighterAbilities,
            new Ability('Curse', 'btncurseoff', 'acrs', 'C', []),
            new Ability('Anti-magic Shell', 'btnantimagicshell', 'aam2', 'N', []),
            new Ability('Possession ', 'btnpossession', 'aps2', 'O', []),
        ]),
        new Unit('Frost Wyrm', 'btnfrostwyrm', [
            ...defaultFighterAbilities
        ]),
        new Unit('Obsidian Statue', 'btnobsidianstatue', [
            ...defaultFighterAbilities,
            new Ability('Essence of Blight', 'btnreplenishhealthoff', 'arpl', 'B', []),
            new Ability('Spirit Touch', 'btnreplenishmanaoff', 'arpm', 'C', []),
            Ability.Default(),
            new Ability('Morph into Destroyer', 'btndestroyer', 'ubsp', 'T', []),
        ]),
        new Unit('Destroyer', 'btndestroyer', [
            ...defaultFighterAbilities,
            new Ability('Devour Magic', 'btnreplenishhealthoff', 'advm', 'D', []),
            new Ability('Orb of Annihilation', 'btnorbofdeathoff', 'afak', 'O', []),
            Ability.Default(),
            new Ability('Absorb Mana', 'btnabsorbmagic', 'aabs', 'B', []),
        ]),
        new Unit('Carrion Beetle', 'btncarrionscarabslv3', [
            ...defaultFighterAbilities,
            ...Ability.Defaults(3),
            Ability.DoubleHotkey('Burrow', 'btncryptfiendburrow', 'abu2', 'B', [], 'abu3'),
        ])
    ] as Unit[]

export default units;
