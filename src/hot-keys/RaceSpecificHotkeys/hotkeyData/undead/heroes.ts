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

        new Hero('Dreadlord', 'btnherodreadlord', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Carrion Swarm', 'btncarrionswarm', 'aucs', 'C', []),
                Ability.HeroAbility('Sleep', 'btnsleep', 'ausl', 'E', []),
                Ability.Aura('Vampiric Aura', 'pasbtnvampiricaura', 'auav', 'V', []),
                Ability.HeroAbility('Inferno', 'btninfernal', 'auin', 'N', []),
            ])
        ]),

        new Hero('Lich', 'btnlichversion2', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Frost Nova', 'btnglacier', 'aufn', 'N', []),
                Ability.HeroAbility('Frost Armor', 'btnfrostarmoroff', 'aufu', 'F', []),
                Ability.HeroAbility('Dark Ritual', 'btndarkritual', 'audr', 'R', []),
                Ability.HeroAbility('Death and Decay', 'btndeathanddecay', 'audd', 'D', []),
            ])
        ]),

        new Hero('Crypt Lord', 'btnherocryptlord', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Impale', 'btnimpale', 'auim', 'E', []),
                Ability.HeroAbility('Carrion Beetles', 'btncarrionscarabsoff', 'aucb', 'C', []),
                Ability.Aura('Spiked Carapace', 'pasbtnthornshield', 'auts', 'S', []),
                Ability.HeroAbility('Locust Swarm', 'btnlocustswarm', 'auls', 'L', []),
            ])
        ]),

    ] as Unit[]

export default heroes;
