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
                new Ability('Holy Light', 'btnholybolt', 'ahhb', 'T', []),
                new Ability('Divine Shield', 'btndivineintervention', 'adef', 'D', []),
                new Ability('Devotion Aura', 'btndevotion', 'ahad', 'V', []),
                new Ability('Resurrection', 'btnresurrection', 'ahre', 'R', []),
            ]),
            new Ability('Holy Light', 'btnholybolt', 'ahhb', 'T', []),
            new Ability('Divine Shield', 'btndivineintervention', 'adef', 'D', []),
            Ability.Default(),
            new Ability('Resurrection', 'btnresurrection', 'ahre', 'R', []),
        ])
    ] as Unit[]

export default heroes;
