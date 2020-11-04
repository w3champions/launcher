import {
    Ability,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {defaultFighterAbilities, defaultUnitAbilities} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const units =
    [
        new Unit('Forest Troll Shadow Priest', 'btnforesttrollshadowpriest', [
            ...defaultFighterAbilities,
            new Ability('Heal', 'btnhealoff', 'anh1', 'E', []),
            new Ability('Abolish Magic', 'btndryaddispelmagicoff', 'acdm', 'B', []),
        ]),
        new Unit('Mud Golem', 'btnmudgolem', [
            ...defaultFighterAbilities,
            new Ability('Slow', 'btnslowoff', 'acsw', 'W', []),
        ]),
        new Unit('Goblin Shredder', 'btnjunkgolem', [
            ...defaultUnitAbilities,
            ...Ability.Defaults(2),
            new Ability('Gather', 'btngathergold', 'ahr3', 'G', []),
        ]),
        new Unit('Goblin Sappers', 'btngoblinsapper', [
            ...defaultFighterAbilities,
            new Ability('Kaboom!', 'btnselfdestructoff', 'asds', 'B', []),
        ]),
        new Unit('Goblin Zeppelin', 'btngoblinzeppelin', [
            ...defaultFighterAbilities,
            new Ability('Load', 'btnload', 'aloa', 'L', []),
            new Ability('Unload All', 'btnunload', 'adro', 'U', []),
        ]),
        new Unit('Storm (Pandaren Ultimate)', 'btnstormearthfire', [
            ...defaultFighterAbilities,
            new Ability('Wind Walk', 'btnwindwalkon', 'anwk', 'W', []),
            new Ability('Cyclone', 'btncyclone', 'accy', 'C', []),
            new Ability('Dispel Magic', 'btndispelmagic', 'adsm', 'D', []),
        ]),
        new Unit('Earth (Pandaren Ultimate)', 'btnstormearthfire', [
            ...defaultFighterAbilities,
            new Ability('TaunT', 'btnpandataunt', 'anta', 'T', []),
        ]),
        new Unit('Spirit Bear (Level 3)', 'btnspiritbear', [
            ...defaultFighterAbilities,
            new Ability('Blink', 'btnbearblink', 'anbl', 'B', []),
        ]),
        new Unit('Quilbeast (Level 2/3)', 'btnquillbeastlv2', [
            ...defaultFighterAbilities,
            new Ability('Frenzy', 'btnbloodlustoff', 'afzy', 'F', []),
        ]),
        new Unit('Doom Guard', 'btndoomguard', [
            ...defaultFighterAbilities,
            new Ability('Dispel Magic', 'btndispelmagic', 'adsm', 'D', []),
            new Ability('War Stomp', 'btnwarstomp', 'awrs', 'T', []),
            new Ability('Cripple', 'btncripple', 'accr', 'C', []),
            new Ability('Rain of Fire', 'btnfire', 'acrf', 'F', []),
        ]),
        new Unit('Cloak of Shadows', 'btncloak', [
            ...Ability.Defaults(6),
            new Ability('Hide', 'btncloak', 'aihm', 'I', []),
        ])
    ] as Unit[]

export default units;
