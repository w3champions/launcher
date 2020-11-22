import {
    Ability,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    cancel, cancelBuild,
    defaultFighterAbilities, defaultSiegeAbilities,
    defaultUnitAbilities
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const units =
    [
        new Unit('Peon', 'btnpeon', [
            ...defaultUnitAbilities,
            Ability.UnhotkeyAbility('Repair', 'btnrepair', 'arep', 'R'),
            Ability.Default(),
            Ability.UnhotkeyAbility('Gather', 'btngathergold', 'ahar', 'G'),
            Ability.Create('Build Structure', 'btnhumanbuild', 'cmdbuildorc', 'B', [
                Ability.Create('Build Great Hall', 'btngreathall', 'ogre', 'H', []),
                Ability.Create('Build Barracks', 'btnbarracks', 'obar', 'B', []),
                Ability.Create('Build War Mill', 'btnforge', 'ofor', 'M', []),
                Ability.Create('Build Watch Tower', 'btnorctower', 'owtw', 'W', []),
                Ability.Create('Build Orc Burrow', 'btntrollburrow', 'otrb', 'O', []),
                Ability.Create('Build Altar of Storms', 'btnaltarofstorms', 'oalt', 'A', []),
                Ability.Create('Build Spirit Lodge', 'btnspiritlodge', 'osld', 'S', []),
                Ability.Create('Build Beastiary', 'btnbeastiary', 'obea', 'E', []),
                Ability.Create('Build Tauren Totem', 'btntaurentotem', 'otto', 'T', []),
                Ability.Create('Build Voodoo Lounge', 'btnvoodoolounge', 'ovln', 'V', []),
                Ability.Default(),
                cancel
            ]),
            ...Ability.Defaults(2),
            cancel
        ]),
        new Unit('Grunt', 'btngrunt', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Troll Berserker', 'btnheadhunterberserker', [
            ...defaultFighterAbilities,
            Ability.Create('Berserk', 'btnberserkfortrolls', 'absk', 'B', []),
        ]),
        new Unit('Demolisher', 'btndemolisher', [
            ...defaultSiegeAbilities,
        ]),
        new Unit('Shaman', 'btnshaman', [
            ...defaultFighterAbilities,
            Ability.Create('Purge', 'btnpurge', 'aprg', 'G', []),
            Ability.Create('Lightning Shield', 'btnlightningshield', 'alsh', 'L', []),
            Ability.UnhotkeyAbility('Bloodlust', 'btnbloodlustoff', 'ablo', 'B'),
        ]),
        new Unit('Witch Doctor', 'btnwitchdoctor', [
            ...defaultFighterAbilities,
            Ability.Create('Sentry Ward', 'btnsentryward', 'aeye', 'W', []),
            Ability.Create('Stasis Trap', 'btnstasistrap', 'asta', 'T', []),
            Ability.Create('Healing Ward', 'btnhealingward', 'ahwd', 'E', []),
        ]),
        new Unit('Spirit Walker', 'btnspiritwalker', [
            ...defaultFighterAbilities,
            Ability.Create('Spirit Link', 'btnspiritlink', 'aspl', 'R', []),
            Ability.Create('Disenchant', 'btndisenchant', 'adcn', 'D', []),
            Ability.Create('Ancestral Spirit', 'btnancestralspirit', 'aast', 'C', []),
            Ability.UnhotkeyAbility('Corporeal Form', 'btnspiritwalker', 'acpf', 'F', 'F', false, ['aetf']),
        ]),
        new Unit('Raider', 'btnraider', [
            ...defaultFighterAbilities,
            Ability.Create('Ensnare', 'btnensnare', 'aens', 'E', []),
        ]),
        new Unit('Kodo Beast', 'btnkodobeast', [
            ...defaultFighterAbilities,
            Ability.Create('Devour', 'btndevour', 'adev', 'D', []),
        ]),
        new Unit('Wind Rider', 'btnwyvernrider', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Troll Batrider', 'btntrollbatrider', [
            ...defaultFighterAbilities,
            Ability.UnhotkeyAbility('Unstable Concoction', 'btnunstableconcoction', 'auco', 'C'),
        ]),
        new Unit('Tauren', 'btntauren', [
            ...defaultFighterAbilities,
        ]),
    ] as Unit[]

export default units;
