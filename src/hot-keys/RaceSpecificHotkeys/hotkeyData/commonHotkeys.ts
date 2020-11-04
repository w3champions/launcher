import {Ability} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";

export const cancel = new Ability('Cancel', 'btncancel', 'cmdcancel', 'ESC', [])
export const cancelBuild = new Ability('Cancel', 'btncancel', 'cmdcancelbuild', 'ESC', [])
export const rally = new Ability('Rally', 'btnrallypoint', 'cmdrally', 'Y', [])

export const defaultUnitAbilities = [
    new Ability("Move", "btnmove", "cmdmove", "M", []),
    new Ability("Stop", "btnstop", "cmdstop", "S", []),
    new Ability("Hold", "btnholdposition", "cmdholdpos", "H", []),
    new Ability("Attack", "btnattack", "cmdattack", "A", []),
    new Ability("Patrol", "btnpatrol", "cmdpatrol", "P", [])
]

export const defaultFighterAbilities = [
    ...defaultUnitAbilities,
    ...Ability.Defaults(3),
]

export const defaultSiegeAbilities = [
    ...defaultUnitAbilities,
    ...Ability.Defaults(2),
    new Ability("Attack Ground", "btnattackground", "cmdattackground", "G", [])
]

export const defaultHeroAbilities = (learningSkills: Ability[]) => {
    const notAuras = learningSkills.filter(l => !l.isAura);
    const ammountAuras = notAuras.length;
    const ultimate = notAuras[ammountAuras - 1];
    notAuras.pop();
    Ability.Defaults(learningSkills.length - ammountAuras)
    return [
        ...defaultUnitAbilities,
        ...Ability.Defaults(2),
        new Ability('Hero Abilities', 'btnskillz', 'cmdselectskill', 'O', learningSkills),
        ...notAuras,
        ...Ability.Defaults(learningSkills.length - ammountAuras),
        ultimate
    ];
}

export const buildingWithCancel = (buildItems: Ability[]) => [
    ...buildItems,
    cancelBuild
]

export const shop = (tier1ITems: Ability[], tier3ITems: Ability[]) => [
    ...tier1ITems,
    ...tier2ITems,
    ...tier3ITems,
    new Ability('Select User', 'btnselectunit', 'anei', 'U', [])
]

export const tier2ITems = [
    new Ability('Purchase Potion of Healing', 'btnpotiongreensmall', 'phea', 'P', []),
    new Ability('Purchase Potion of Mana', 'btnpotionbluesmall', 'pman', 'M', []),
    new Ability('Purchase Scroll of Town Portal', 'btnscrolluber', 'stwp', 'T', []),
    Ability.Default()
]

export const defaultAltar = (heroes: Ability[]) => buildingWithCancel([
    ...Ability.Defaults(4),

    heroes[0],
    ...Ability.Defaults(2),
    rally,

    heroes[1],
    heroes[2],
    heroes[3]]
)

export const defaultMainBuilding = (abilityBeforeBackpack: Ability, backpackCommand: string) => [
    Ability.Default(),
    abilityBeforeBackpack,
    new Ability('Research Backpack', 'btnpackbeast', backpackCommand, 'B', []),
    ...Ability.Defaults(3),
    rally
]
