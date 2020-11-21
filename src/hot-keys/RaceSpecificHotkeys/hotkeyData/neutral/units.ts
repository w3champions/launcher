import {
    Ability,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {defaultFighterAbilities, defaultUnitAbilities} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const units =
    [
        new Unit('Forest Troll Shadow Priest', 'btnforesttrollshadowpriest', [
            ...defaultFighterAbilities,
            Ability.Create('Heal', 'btnhealoff', 'anh1', 'E', []),
            Ability.Create('Abolish Magic', 'btndryaddispelmagicoff', 'acdm', 'B', []),
        ]),
        new Unit('Mud Golem', 'btnmudgolem', [
            ...defaultFighterAbilities,
            Ability.Create('Slow', 'btnslowoff', 'acsw', 'W', []),
        ]),
        new Unit('Goblin Shredder', 'btnjunkgolem', [
            ...defaultUnitAbilities,
            ...Ability.Defaults(2),
            Ability.UnhotkeyAbility('Gather', 'btngathergold', 'ahr3', 'G'),
        ]),
        new Unit('Goblin Sappers', 'btngoblinsapper', [
            ...defaultFighterAbilities,
            Ability.Create('Kaboom!', 'btnselfdestructoff', 'asds', 'B', []),
        ]),
        new Unit('Goblin Zeppelin', 'btngoblinzeppelin', [
            ...defaultFighterAbilities,
            Ability.Create('Load', 'btnload', 'aloa', 'L', []),
            Ability.Create('Unload All', 'btnunload', 'adro', 'U', []),
        ]),
        new Unit('Storm (Pandaren Ultimate)', 'btnearthbrewmaster', [
            ...defaultFighterAbilities,
            Ability.Create('Dispel Magic', 'btndispelmagic', 'adsm', 'D', []),
            Ability.Create('Cyclone', 'btncyclone', 'accy', 'C', []),
            Ability.Create('Wind Walk', 'btnwindwalkon', 'anwk', 'W', []),
        ]),
        new Unit('Earth (Pandaren Ultimate)', 'btnstormbrewmaster', [
            ...defaultFighterAbilities,
            Ability.Default(),
            Ability.Create('TaunT', 'btnpandataunt', 'anta', 'T', []),
        ]),
        new Unit('Spirit Bear (Level 3)', 'btnspiritbear', [
            ...defaultFighterAbilities,
            Ability.Create('Blink', 'btnbearblink', 'anbl', 'B', []),
        ]),
        new Unit('Quilbeast (Level 2/3)', 'btnquillbeastlv2', [
            ...defaultFighterAbilities,
            Ability.Create('Frenzy', 'btnbloodlustoff', 'afzy', 'F', []),
        ]),
        new Unit('Doom Guard', 'btndoomguard', [
            ...defaultFighterAbilities,
            Ability.Create('Dispel Magic', 'btndispelmagic', 'adsm', 'D', []),
            Ability.Create('War Stomp', 'btnwarstomp', 'awrs', 'T', []),
            Ability.Create('Cripple', 'btncripple', 'accr', 'C', []),
            Ability.Create('Rain of Fire', 'btnfire', 'acrf', 'F', []),
        ]),
        new Unit('Cloak of Shadows', 'btncloak', [
            ...Ability.Defaults(6),
            Ability.Create('Hide', 'btncloak', 'aihm', 'I', []),
        ])
    ] as Unit[]

export default units;
