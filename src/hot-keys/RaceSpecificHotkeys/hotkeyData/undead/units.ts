import {
    Ability,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {defaultFighterAbilities, defaultUnitAbilities} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const units =
    [
        new Unit('Acolyte', 'btnacolyte', [
            ...defaultUnitAbilities,
            new Ability('Restore', 'btnrepair', 'arst', 'R', 'R', []),
            Ability.Default(),
            new Ability('Gather', 'btngathergold', 'ahaa', 'G', 'G', []),
            new Ability('Summon Building', 'btnscourgebuild', 'cmdbuildundead', 'B', 'B', [
                new Ability('Summon Necropolis', 'btnnecropolis', 'unpl', 'N', 'N', []),
                new Ability('Summon Crypt', 'btncrypt', 'usep', 'C', 'C', [])
            ]),
            new Ability('Unsummon Building', 'btnunsummonbuilding', 'auns', 'U', 'U', []),
            Ability.Default(),
            new Ability('Sacrifice ', 'btnsacrifice', 'alam', 'C', 'C', []),
        ])
    ] as Unit[]

export default units;
