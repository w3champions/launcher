import {
    Ability,
    Hero,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {defaultHeroAbilities} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";
import {shadowMeld} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/nightelf/units";

const heroes =
    [
        new Hero('Demon Hunter', 'btnherodemonhunter', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Mana Burn', 'btnmanaburn', 'aemb', 'B', []),
                Ability.HeroAbility('Immolation', 'btnimmolationon', 'aeim', 'L', []),
                Ability.Aura('Evasion', 'pasbtnevasion', 'aeev', 'E', []),
                Ability.HeroAbility('Metamorphosis', 'btnmetamorphosis', 'aeme', 'T', []),
            ])
        ]),

        new Hero('Keeper of the Grove', 'btnkeeperofthegrove', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Entangling Roots', 'btnentanglingroots', 'aeer', 'E', []),
                Ability.HeroAbility('Force of Nature', 'btnent', 'aefn', 'F', []),
                Ability.Aura('Thorns Aura', 'pasbtnthorns', 'aeah', 'R', []),
                Ability.HeroAbility('Tranquility', 'btntranquility', 'aetq', 'T', []),
            ])
        ]),

        new Hero('Priestess of the Moon', 'btnpriestessofthemoon', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Scout', 'btnscout', 'aest', 'C', []),
                Ability.HeroAbility('Searing Arrows', 'btnsearingarrowsoff', 'ahfa', 'R', []),
                Ability.Aura('Trueshot Aura', 'pasbtntrueshot', 'aear', 'T', []),
                Ability.HeroAbility('Starfall ', 'btnstarfall', 'aesf', 'F', []),
            ],[
                Ability.Default(),
                shadowMeld
            ])
        ]),

        new Hero('Warden', 'btnherowarden', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Fan of Knives', 'btnfanofknives', 'aefk', 'F', []),
                Ability.HeroAbility('Blink ', 'btnblink', 'aebl', 'B', []),
                Ability.HeroAbility('Shadow Strike', 'btnshadowstrike', 'aesh', 'D', []),
                Ability.HeroAbility('Vengeance ', 'btnspiritofvengeance', 'aesv', 'V', []),
            ],[
                Ability.Create("Spirit of Vengeance (on Avatar)", "btnavengingwatcheroff", "avng", "V", []),
                shadowMeld
            ])
        ]),

    ] as Unit[]

export default heroes;
