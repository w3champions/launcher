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
        ]),
        new Unit('Gargoyle', 'btngargoyle', [
            ...defaultUnitAbilities,
            new Ability('Prioritize', 'btnairattackon', 'aatp', 'R', 'R', []),
            Ability.Default(),
            Ability.Default(),
            new Ability('Stone Form', 'btnstoneform', 'astn', 'F', 'F', []),
        ]),
        new Unit('Abomination', 'btnabomination', [
            ...defaultFighterAbilities,
            new Ability('Cannibalize', 'btncannibalize', 'acn2', 'C', 'C', []),
        ]),
        new Unit('Meat Wagon', 'btnmeatwagon', [
            ...defaultSiegeAbilities,
            new Ability('Load Corpse', 'btnundeadloadoff', 'amel', 'C', 'C', []),
            new Ability('Drop All Corpses', 'btnundeadunload', 'amed', 'D', 'D', []),
        ]),
        new Unit('Necromancer', 'btnnecromancer', [
            ...defaultFighterAbilities,
            new Ability('Raise Dead', 'btnraisedeadoff', 'arai', 'R', 'R', []),
            new Ability('Cripple ', 'btncripple', 'acri', 'C', 'C', []),
            new Ability('Unholy Frenzy', 'btnunholyfrenzy', 'auhf', 'U', 'U', []),
        ]),
        new Unit('Banshee', 'btnbanshee', [
            ...defaultFighterAbilities,
            new Ability('Curse', 'btncurseoff', 'acrs', 'C', 'C', []),
            new Ability('Anti-magic Shell', 'btnantimagicshell', 'aam2', 'N', 'N', []),
            new Ability('Possession ', 'btnpossession', 'aps2', 'O', 'O', []),
        ]),
        new Unit('Frost Wyrm', 'btnfrostwyrm', [
            ...defaultFighterAbilities
        ]),
        new Unit('Obsidian Statue', 'btnobsidianstatue', [
            ...defaultFighterAbilities,
            new Ability('Essence of Blight', 'btnreplenishhealthoff', 'arpl', 'B', 'B', []),
            new Ability('Spirit Touch', 'btnreplenishmanaoff', 'arpm', 'C', 'C', []),
            Ability.Default(),
            new Ability('Morph into Destroyer', 'btndestroyer', 'ubsp', 'T', 'T', []),
        ]),
        new Unit('Destroyer', 'btndestroyer', [
            ...defaultFighterAbilities,
            new Ability('Devour Magic', 'btnreplenishhealthoff', 'advm', 'D', 'D', []),
            new Ability('Orb of Annihilation', 'btnorbofdeathoff', 'afak', 'O', 'O', []),
            Ability.Default(),
            new Ability('Absorb Mana', 'btnabsorbmagic', 'aabs', 'B', 'B', []),
        ])
    ] as Unit[]

export default units;
