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
    Ability.Default(),
    Ability.Default(),
    Ability.Default(),
]

export const defaultSiegeAbilities = [
    ...defaultUnitAbilities,
    Ability.Default(),
    Ability.Default(),
    new Ability("Attack Ground", "btnattackground", "cmdattackground", "G", [])
]

export const defaultHeroAbilities = (learningSkills: Ability[]) => [
    ...defaultUnitAbilities,
    Ability.Default(),
    Ability.Default(),
    new Ability('Hero Abilities', 'btnskillz', 'cmdselectskill', 'O', learningSkills)
]

export const defaultMainBuilding = [
    Ability.Default(),
    Ability.Default(),
    new Ability('Research Backpack', 'btnpackbeast', 'rupm', 'B', []),
    Ability.Default(),
    Ability.Default(),
    Ability.Default(),
    rally
]
