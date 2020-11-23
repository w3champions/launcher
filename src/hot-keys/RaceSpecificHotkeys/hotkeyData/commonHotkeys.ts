import {Ability} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";

export const cancel = Ability.Create('Cancel', 'btncancel', 'cmdcancel', '27', [])
export const cancelBuild = Ability.Create('Cancel Build', 'btncancel', 'cmdcancelbuild', '27', [])
export const cancelTrain = Ability.Create('Cancel Learn', 'btncancel', 'cmdcanceltrain', '27', [])
export const cancelRevive = Ability.Create('Cancel Revive', 'btncancel', 'cmdcancelrevive', '27', [])
export const rally = Ability.Create('Rally', 'btnrallypoint', 'cmdrally', 'Y', [])
export const stop = Ability.Create("Stop", "btnstop", "cmdstop", "S", []);
export const attack = Ability.Create("Attack", "btnattack", "cmdattack", "A", []);

export const defaultUnitAbilities = [
    Ability.Create("Move", "btnmove", "cmdmove", "M", []),
    stop,
    Ability.Create("Hold", "btnholdposition", "cmdholdpos", "H", []),
    attack,
    Ability.Create("Patrol", "btnpatrol", "cmdpatrol", "P", [])
]

export const defaultFighterAbilities = [
    ...defaultUnitAbilities,
    ...Ability.Defaults(3),
]

export const defaultSiegeAbilities = [
    ...defaultUnitAbilities,
    ...Ability.Defaults(2),
    Ability.Create("Attack Ground", "btnattackground", "cmdattackground", "G", [])
]

export const defaultHeroAbilities = (learningSkills: Ability[], middleAbilities: Ability[] = []) => {
    const notAuras = learningSkills.filter(l => !l.isAura);
    if (middleAbilities.length === 0) {
        middleAbilities = Ability.Defaults(2)
    }
    const ammountAuras = notAuras.length;
    const ultimate = notAuras[ammountAuras - 1];
    notAuras.pop();
    Ability.Defaults(learningSkills.length - ammountAuras)
    return [
        ...defaultUnitAbilities,
        ...middleAbilities,
        Ability.Create('Hero Abilities', 'btnskillz', 'cmdselectskill', 'O', [...learningSkills, ...Ability.Defaults(7), cancelTrain]),
        ...notAuras,
        ...Ability.Defaults(learningSkills.length - ammountAuras),
        ultimate
    ];
}

export const buildingWithCancel = (buildItems: Ability[]) => [
    ...buildItems,
    cancelBuild
]

export const selectUser = Ability.Create('Select User', 'btnselectunit', 'anei', 'U', []);
export const shop = (tier1ITems: Ability[], tier3ITems: Ability[]) => [
    ...tier1ITems,
    ...tier2ITems,
    ...tier3ITems,
    selectUser
]

export const tier2ITems = [
    Ability.Create('Purchase Potion of Healing', 'btnpotiongreensmall', 'phea', 'P', []),
    Ability.Create('Purchase Potion of Mana', 'btnpotionbluesmall', 'pman', 'M', []),
    Ability.Create('Purchase Scroll of Town Portal', 'btnscrolluber', 'stwp', 'T', [])
]

export const defaultAltar = (heroes: Ability[]) => [
    ...Ability.Defaults(4),

    heroes[0],
    ...Ability.Defaults(2),
    rally,

    heroes[1],
    heroes[2],
    heroes[3],
    cancelRevive
]


export const defaultMainBuilding = (abilityBeforeBackpack: Ability, backpackCommand: string) => [
    Ability.Default(),
    abilityBeforeBackpack,
    Ability.Create('Research Backpack', 'btnpackbeast', backpackCommand, 'B', []),
    ...Ability.Defaults(3),
    rally
]
