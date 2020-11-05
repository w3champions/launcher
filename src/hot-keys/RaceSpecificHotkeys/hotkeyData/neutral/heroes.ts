import {
    Ability,
    Hero,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {defaultFighterAbilities, defaultHeroAbilities} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const heroes =
    [
        new Hero('Naga Sea Witch', 'btnnagaseawitch', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Forked Lightning', 'btnmonsoon', 'anfl', 'F', []),
                Ability.HeroAbility('Frost Arrows', 'btncoldarrowsoff', 'anfa', 'R', []),
                Ability.HeroAbility('Mana Shield', 'btnneutralmanashield', 'anms', 'N', []),
                Ability.HeroAbility('Tornado ', 'btntornado', 'anto', 'T', []),
            ])
        ]),

        new Hero('Dark Ranger', 'btnbansheeranger', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Silence', 'btnsilence', 'ansi', 'E', []),
                Ability.HeroAbility('Black Arrow', 'btntheblackarrowoff', 'anba', 'F', []),
                Ability.HeroAbility('Life Drain', 'btnlifedrain', 'andr', 'D', []),
                Ability.HeroAbility('Charm', 'btncharm', 'anch', 'C', []),
            ])
        ]),

        new Hero('Pandaren Brewmaster', 'btnpandarenbrewmaster', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Breath of Fire', 'btnbreathoffire', 'anbf', 'F', []),
                Ability.HeroAbility('Drunken Haze', 'btnstrongdrink', 'andh', 'R', []),
                Ability.Aura('Drunken Brawler', 'pasbtndrunkendodge', 'andb', 'N', []),
                Ability.HeroAbility('Storm, Earth, and Fire', 'btnstormearthfire', 'anef', 'T', []),
            ])
        ]),

        new Hero('Beastmaster', 'btnbeastmaster', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Summon Bear', 'btngrizzlybear', 'ansg', 'B', []),
                Ability.HeroAbility('Summon Quilbeast', 'btnquillbeast', 'ansq', 'Q', []),
                Ability.HeroAbility('Summon Hawk', 'btnwareagle', 'answ', 'W', []),
                Ability.HeroAbility('Stampede', 'btnstampede', 'anst', 'T', []),
            ])
        ]),

        new Hero('Pit Lord', 'btnpitlord', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Rain of Fire', 'btnfire', 'anrf', 'F', []),
                Ability.HeroAbility('Howl of Terror', 'btnhowlofterror', 'anht', 'T', []),
                Ability.Aura('Cleaving Attack', 'pasbtncleavingattack', 'anca', 'C', []),
                Ability.HeroAbility('Doom', 'btndoom', 'ando', 'D', []),
            ])
        ]),

        new Hero('Goblin Tinker', 'btnherotinker', [
            ...defaultHeroAbilities([
                Ability.MultiHotkey('Pocket Factory', 'btnpocketfactory', 'ansy', 'F', [], ['ans1','ans2','ans2'], true),
                Ability.MultiHotkey('Cluster Rockets', 'btnclusterrockets', 'ancs', 'R', [], ['anc1','anc2','anc2'], true),
                Ability.Aura('Engineering Upgrade', 'pasbtnengineeringupgrade', 'aneg', 'E', []),
                Ability.HeroAbility('Robo-Goblin', 'btnrobogoblin', 'anrg', 'B', []),
            ])
        ]),

        new Hero('Firelord', 'btnheroavatarofflame', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Soul Burn', 'btnsoulburn', 'anso', 'B', []),
                Ability.HeroAbility('Summon Lava Spawn', 'btnlavaspawn', 'anlm', 'W', []),
                Ability.HeroAbility('Incinerate', 'btnincinerateoff', 'ania', 'C', []),
                Ability.HeroAbility('Volcano', 'btnvolcano', 'anvc', 'V', []),
            ])
        ]),

        new Hero('Goblin Alchemist', 'btnheroalchemist', [
            ...defaultHeroAbilities([
                Ability.HeroAbility('Healing Spray', 'btnhealingspray', 'anhs', 'E', []),
                Ability.HeroAbility('Chemical Rage', 'btnchemicalrage', 'ancr', 'R', []),
                Ability.HeroAbility('Acid Bomb', 'btnacidbomb', 'anab', 'B', []),
                Ability.HeroAbility('Transmute', 'btntransmute', 'antm', 'T', []),
            ])
        ])

    ] as Unit[]

export default heroes;
