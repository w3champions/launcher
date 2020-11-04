import {
    Ability,
    Hero,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {defaultHeroAbilities} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const heroes =
    [
        new Hero('Death Knight', 'btnherodeathknight', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Death Coil', 'btndeathcoil', 'audc', 'C', []),
                Ability.HeroAbility('Death Pact', 'btndeathpact', 'audp', 'E', []),
                Ability.Aura('Unholy Aura', 'pasbtnunholyaura', 'auau', 'U', []),
                Ability.HeroAbility('Animate Dead', 'btnanimatedead', 'auan', 'D', []),
            ])
        ]),

    ] as Unit[]

export default heroes;
