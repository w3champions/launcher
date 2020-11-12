import {
    Ability,
    Hero,
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
        ]),
        new Hero('Archmage', 'btnheroarchmage', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Blizzard', 'btnblizzard', 'ahbz', 'B', []),
                Ability.HeroAbility('Summon Water Elemental', 'btnsummonwaterelemental', 'ahwe', 'W', []),
                Ability.Aura('Brilliance Aura', 'pasbtnbrilliance', 'ahab', 'R', []),
                Ability.HeroAbility('Mass Teleport', 'btnmassteleport', 'ahmt', 'T', []),
            ])
        ]),
        new Hero('Mountain King', 'btnheromountainking', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Storm Bolt', 'btnstormbolt', 'ahtb', 'T', []),
                Ability.HeroAbility('Thunder Clap', 'btnthunderclap', 'ahtc', 'C', []),
                Ability.Aura('Bash', 'pasbtnbash', 'ahbh', 'B', []),
                Ability.HeroAbility('Avatar', 'btnavatar', 'ahav', 'V', []),
            ])
        ]),
        new Hero('Blood Mage', 'btnherobloodelfprince', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Flame Strike', 'btnwalloffire', 'ahfs', 'F', []),
                Ability.HeroAbility('Banish', 'btnbanish', 'ahbn', 'B', []),
                Ability.HeroAbility('Siphon Mana', 'btnmanadrain', 'ahdr', 'N', []),
                Ability.HeroAbility('Phoenix', 'btnmarkoffire', 'ahpx', 'X', []),
            ])
        ])
    ] as Unit[]

export default heroes;
