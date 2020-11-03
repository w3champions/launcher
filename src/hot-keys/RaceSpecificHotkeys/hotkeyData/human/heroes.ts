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
                new Ability('Holy Light', 'btnholybolt', 'ahhb', 'T', 'T', []),
                new Ability('Divine Shield', 'btndivineintervention', 'adef', 'D', 'D', []),
                new Ability('Devotion Aura', 'btndevotion', 'ahad', 'V', 'V', []),
                new Ability('Resurrection', 'btnresurrection', 'ahre', 'R', 'R', []),
            ]),
            new Ability('Holy Light', 'btnholybolt', 'ahhb', 'T', 'T', []),
            new Ability('Divine Shield', 'btndivineintervention', 'adef', 'D', 'D', []),
            Ability.Default(),
            new Ability('Resurrection', 'btnresurrection', 'ahre', 'R', 'R', []),
        ])
    ] as Unit[]

export default heroes;
