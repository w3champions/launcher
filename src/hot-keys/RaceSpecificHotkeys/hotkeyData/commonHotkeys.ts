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
    Ability.Default("default_1"),
    Ability.Default("default_2"),
    Ability.Default("default_3"),
]

export const defaultHeroAbilities = (learningSkills: Ability[]) => [
    ...defaultUnitAbilities,
    Ability.Default("default_1"),
    Ability.Default("default_2"),
    new Ability('Hero Abilities', 'btnskillz', 'cmdselectskill', 'O', 'O', learningSkills)
]
