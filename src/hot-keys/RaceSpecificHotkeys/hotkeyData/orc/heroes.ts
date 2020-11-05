import {
    Ability,
    Hero,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {defaultHeroAbilities} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const heroes =
    [
        new Hero('Blademaster', 'btnheroblademaster', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Wind Walk', 'btnwindwalkon', 'aowk', 'W', []),
                Ability.HeroAbility('Mirror Image', 'btnmirrorimage', 'aomi', 'R', []),
                Ability.Aura('Critical Strike', 'pasbtncriticalstrike', 'aocr', 'C', []),
                Ability.HeroAbility('Bladestorm', 'btnwhirlwind', 'aoww', 'B', []),
            ])
        ]),
        new Hero('Far Seer', 'btnherofarseer', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Chain Lightning', 'btnchainlightning', 'aocl', 'C', []),
                Ability.HeroAbility('Far Sight', 'btnfarsight', 'aofs', 'F', []),
                Ability.HeroAbility('Feral Spirit', 'btnspiritwolf', 'aosf', 'T', []),
                Ability.HeroAbility('Earthquake', 'btnearthquake', 'aoeq', 'E', []),
            ])
        ]),
        new Hero('Tauren Chieftain', 'btnherotaurenchieftain', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Shockwave', 'btnshockwave', 'aosh', 'W', []),
                Ability.HeroAbility('War Stomp', 'btnwarstomp', 'aows', 'T', []),
                Ability.Aura('Endurance Aura', 'pasbtncommand', 'aoae', 'E', []),
                Ability.Aura('Reincarnation', 'pasbtnreincarnation', 'aore', 'R', []),
            ])
        ]),
        new Hero('Shadow Hunter', 'btnshadowhunter', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Healing Wave', 'btnhealingwave', 'aohw', 'E', []),
                Ability.HeroAbility('Hex', 'btnhex', 'aohx', 'X', []),
                Ability.HeroAbility('Serpent Ward', 'btnserpentward', 'aosw', 'W', []),
                Ability.HeroAbility('Big Bad Voodoo', 'btnbigbadvoodoospell', 'aovd', 'V', []),
            ])
        ])
    ] as Unit[]


export default heroes;
