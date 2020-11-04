import {
    Ability,
    Building, Hero,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {defaultHeroAbilities} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const heroes =
    [
        new Hero('Paladin', 'btnheropaladin', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Holy Light', 'btnholybolt', 'ahhb', 'T', []),
                Ability.HeroAbility('Divine Shield', 'btndivineintervention', 'ahds', 'D', []),
                Ability.Aura('Devotion Aura', 'btndevotion', 'ahad', 'V', []),
                Ability.HeroAbility('Resurrection', 'btnresurrection', 'ahre', 'R', []),
            ])
        ])
    ] as Unit[]

export default heroes;
