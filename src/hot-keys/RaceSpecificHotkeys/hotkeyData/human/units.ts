import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    cancel,
    defaultFighterAbilities, defaultSiegeAbilities,
    defaultUnitAbilities
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";
//Ability.Default(),
const units =
    [
        new Unit('Peasant', 'btnpeasant', [
            ...defaultUnitAbilities,
            Ability.Create('Repair', 'btnrepair', 'ahrp', 'R', []),
            Ability.Default(),
            Ability.UnhotkeyAbility('Gather', 'btngathergold', 'ahar', 'G'),
            Ability.Create('Build Structure', 'btnhumanbuild', 'cmdbuildhuman', 'B', [
                Ability.Create('Build Townhall', 'btntownhall', 'htow', 'H', []),
                Ability.Create('Build Barracks', 'btnhumanbarracks', 'hbar', 'B', []),
                Ability.Create('Build Lumber Mill', 'btnhumanlumbermill', 'hlum', 'L', []),
                Ability.Create('Build Blacksmith', 'btnblacksmith', 'hbla', 'S', []),
                Ability.Create('Build Farm', 'btnfarm', 'hhou', 'F', []),
                Ability.Create('Build Altar of Kings', 'btnaltarofkings', 'halt', 'A', []),
                Ability.Create('Build Arcane Sanctum', 'btnarcanesanctum', 'hars', 'R', []),
                Ability.Create('Build Workshop', 'btnworkshop', 'harm', 'W', []),
                Ability.Create('Build Scout Tower', 'btnhumanwatchtower', 'hwtw', 'T', []),
                Ability.Create('Build Gryphon Aviary', 'btngryphonaviary', 'hgra', 'V', []),
                Ability.Create('Build Arcane Vault', 'btnarcanevault', 'hvlt', 'V', []),
                cancel
            ]),
            Ability.UnhotkeyAbility('Call to Arms', 'btncalltoarms', 'amil', 'C', 'W'),
            Ability.Default(),
            cancel
        ]),
        new Unit('Footman', 'btnfootman', [
            ...defaultFighterAbilities,
            Ability.UnhotkeyAbility('Defend', 'btndefend', 'adef', 'D'),
        ]),
        new Unit('Rifleman', 'btnrifleman', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Knight', 'btnknight', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Priest', 'btnpriest', [
            ...defaultFighterAbilities,
            Ability.Create('Heal', 'btnhealoff', 'ahea', 'E', []),
            Ability.Create('Dispel Magic', 'btndispelmagic', 'adis', 'D', []),
            Ability.Create('Inner Fire', 'btninnerfireoff', 'ainf', 'F', []),
        ]),
        new Unit('Sorceress', 'btnsorceress', [
            ...defaultFighterAbilities,
            Ability.Create('Slow', 'btnslowoff', 'aslo', 'W', []),
            Ability.Create('Invisibility', 'btninvisibility', 'aivs', 'I', []),
            Ability.Create('Polymorph', 'btnpolymorph', 'aply', 'O', []),
        ]),
        new Unit('Spell Breaker', 'btnspellbreaker', [
            ...defaultFighterAbilities,
            Ability.Create('Spell Steal', 'btnspellstealoff', 'asps', 'T', []),
            Ability.Create('Control Magic', 'btncontrolmagic', 'acmg', 'C', []),
        ]),
        new Unit('Flying Machine', 'btnflyingmachine', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Mortar Team', 'btnmortarteam', [
            ...defaultSiegeAbilities,
            Ability.Create('Flare', 'btnflare', 'afla', 'F', []),
        ]),
        new Unit('Siege Engine', 'btnseigeengine', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Gryphon Rider', 'btngryphonrider', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Dragonhawk Rider', 'btndragonhawkrider', [
            ...defaultFighterAbilities,
            Ability.Create('Aerial Shackles', 'btnmagiclariet', 'AMLS', 'E', []),
            Ability.Create('Cloud', 'btncloudoffog', 'aclf', 'C', []),
        ]),

    ] as Unit[]

export default units;
