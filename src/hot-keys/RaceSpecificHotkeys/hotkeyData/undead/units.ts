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
            Ability.Create('Restore', 'btnrepair', 'arst', 'R', []),
            Ability.Default(),
            Ability.Create('Gather', 'btngathergold', 'aaha', 'G', []),
            Ability.Create('Summon Building', 'btnscourgebuild', 'cmdbuildundead', 'B', [
                Ability.Create('Summon Necropolis', 'btnnecropolis', 'unpl', 'N', []),
                Ability.Create('Summon Crypt', 'btncrypt', 'usep', 'C', []),
                Ability.Create('Haunt Gold Mine', 'btnhauntedmine', 'ugol', 'G', []),
                Ability.Create('Summon Graveyard', 'btngraveyard', 'ugrv', 'V', []),
                Ability.Create('Summon Ziggurat', 'btnziggurat', 'uzig', 'Z', []),
                Ability.Create('Summon Altar of Darkness', 'btnaltarofdarkness', 'uaod', 'A', []),
                Ability.Create('Summon Temple of the Damned', 'btntempleofthedamned', 'utod', 'T', []),
                Ability.Create('Summon Slaughterhouse', 'btnslaughterhouse', 'uslh', 'H', []),
                Ability.Create('Summon Sacrificial Pit', 'btnsacrificialpit', 'usap', 'S', []),
                Ability.Create('Summon Boneyard', 'btnboneyard', 'ubon', 'B', []),
                Ability.Create('Summon Tomb of Relics', 'btntombofrelics', 'utom', 'R', []),
                cancel
            ]),
            Ability.Create('Unsummon Building', 'btnunsummonbuilding', 'auns', 'U', []),
            Ability.Default(),
            Ability.Create('Sacrifice ', 'btnsacrifice', 'alam', 'C', []),
        ]),
        new Unit('Ghoul', 'btnghoul', [
            ...defaultUnitAbilities,
            ...Ability.Defaults(2),
            Ability.Create('Gather', 'btngathergold', 'ahrl', 'G', []),
            Ability.Create('Cannibalize', 'btncannibalize', 'acan', 'C', []),
        ]),
        new Unit('Crypt Fiend', 'btncryptfiend', [
            ...defaultFighterAbilities,
            Ability.Create('Web', 'btnweboff', 'aweb', 'W', []),
            ...Ability.Defaults(2),
            Ability.UnhotkeyAbility('Burrow', 'btncryptfiendburrow', 'abur', 'B'),
        ]),
        new Unit('Gargoyle', 'btngargoyle', [
            ...defaultUnitAbilities,
            Ability.Unmovable('Prioritize', 'btnairattackon', 'aatp', 'R', []),
            ...Ability.Defaults(2),
            Ability.UnhotkeyAbility('Stone Form', 'btnstoneform', 'astn', 'F'),
        ]),
        new Unit('Abomination', 'btnabomination', [
            ...defaultFighterAbilities,
            Ability.Create('Cannibalize', 'btncannibalize', 'acn2', 'C', []),
        ]),
        new Unit('Meat Wagon', 'btnmeatwagon', [
            ...defaultSiegeAbilities,
            Ability.Create('Load Corpse', 'btnundeadloadoff', 'amel', 'C', []),
            Ability.Create('Drop All Corpses', 'btnundeadunload', 'amed', 'D', []),
        ]),
        new Unit('Necromancer', 'btnnecromancer', [
            ...defaultFighterAbilities,
            Ability.Create('Raise Dead', 'btnraisedeadoff', 'arai', 'R', []),
            Ability.Create('Cripple ', 'btncripple', 'acri', 'C', []),
            Ability.Create('Unholy Frenzy', 'btnunholyfrenzy', 'auhf', 'U', []),
        ]),
        new Unit('Banshee', 'btnbanshee', [
            ...defaultFighterAbilities,
            Ability.Create('Curse', 'btncurseoff', 'acrs', 'C', []),
            Ability.Create('Anti-magic Shell', 'btnantimagicshell', 'aam2', 'N', []),
            Ability.Create('Possession ', 'btnpossession', 'aps2', 'O', []),
        ]),
        new Unit('Frost Wyrm', 'btnfrostwyrm', [
            ...defaultFighterAbilities
        ]),
        new Unit('Obsidian Statue', 'btnobsidianstatue', [
            ...defaultFighterAbilities,
            Ability.Create('Essence of Blight', 'btnreplenishhealthoff', 'arpl', 'B', []),
            Ability.Create('Spirit Touch', 'btnreplenishmanaoff', 'arpm', 'C', []),
            Ability.Default(),
            Ability.Create('Morph into Destroyer', 'btndestroyer', 'ubsp', 'T', []),
        ]),
        new Unit('Destroyer', 'btndestroyer', [
            ...defaultFighterAbilities,
            Ability.Create('Devour Magic', 'btnreplenishhealthoff', 'advm', 'D', []),
            Ability.Create('Orb of Annihilation', 'btnorbofdeathoff', 'afak', 'O', []),
            Ability.Default(),
            Ability.Create('Absorb Mana', 'btnabsorbmagic', 'aabs', 'B', []),
        ]),
        new Unit('Carrion Beetle', 'btncarrionscarabslv3', [
            ...defaultFighterAbilities,
            ...Ability.Defaults(3),
            Ability.UnhotkeyAbility('Burrow', 'btncryptfiendburrow', 'abu2', 'B', false, ['abu3']),
        ])
    ] as Unit[]

export default units;
