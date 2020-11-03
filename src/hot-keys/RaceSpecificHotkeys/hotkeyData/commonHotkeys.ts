import {Ability} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";

export const defaultUnitAbilities = [
    new Ability("Move", "btnmove", "cmdmove", "M", "M", []),
    new Ability("Stop", "btnstop", "cmdstop", "S", "S", []),
    new Ability("Hold", "btnholdposition", "cmdholdpos", "H", "H", []),
    new Ability("Attack", "btnattack", "cmdattack", "A", "A", []),
    new Ability("Patrol", "btnpatrol", "cmdpatrol", "P", "P", [])
]

export const defaultFighterAbilities = [
    ...defaultUnitAbilities,
    Ability.Default(),
    Ability.Default(),
    Ability.Default(),
]

export const defaultHeroAbilities = (learningSkills: Ability[]) => [
    ...defaultUnitAbilities,
    Ability.Default(),
    Ability.Default(),
    new Ability('Hero Abilities', 'btnskillz', 'cmdselectskill', 'O', 'O', learningSkills)
]

export const cancel = new Ability('Cancel', 'btncancel', 'cmdcancel', 'ESC', 'ESC', [])
