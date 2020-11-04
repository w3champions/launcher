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
            new Ability('Repair', 'btnrepair', 'ahrp', 'F', []),
            new Ability('Lumber Harvest', 'pasbtnhumanlumberupgrade1', 'ahlh', '', []),
            new Ability('Gather', 'btngathergold', 'ahar', 'G', []),
            new Ability('Build', 'btnhumanbuild', 'cmdbuildhuman', 'B', [
                new Ability('Build Townhall', 'btntownhall', 'htow', 'H', []),
                new Ability('Build Barracks', 'btnhumanbarracks', 'hbar', 'B', []),
                new Ability('Build Lumber Mill', 'btnhumanlumbermill', 'hlum', 'L', []),
                new Ability('Build Blacksmith', 'btnblacksmith', 'hbla', 'S', []),
                new Ability('Build Farm', 'btnfarm', 'hhou', 'F', []),
                new Ability('Build Altar of Kings', 'btnaltarofkings', 'halt', 'A', []),
                new Ability('Build Arcane Sanctum', 'btnarcanesanctum', 'hars', 'R', []),
                new Ability('Build Workshop', 'btnworkshop', 'harm', 'W', []),
                new Ability('Build Scout Tower', 'btnhumanwatchtower', 'hwtw', 'T', []),
                new Ability('Build Gryphon Aviary', 'btngryphonaviary', 'hgra', 'V', []),
                new Ability('Build Arcane Vault', 'btnarcanevault', 'hvlt', 'V', []),
                cancel
            ]),
            new Ability('Call to Arms', 'btncalltoarms', 'amil', 'C', []),
            new Ability('Back to Work', 'btnbacktowork', 'amil', 'W', []),
            cancel
        ]),
        new Unit('Footman', 'btnfootman', [
            ...defaultFighterAbilities,
            new Ability('Defend', 'btndefend', 'adef', 'D', []),
        ]),
        new Unit('Rifleman', 'btnrifleman', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Knight', 'btnknight', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Priest', 'btnpriest', [
            ...defaultFighterAbilities,
            new Ability('Heal', 'btnhealoff', 'ahea', 'E', []),
            new Ability('Dispel Magic', 'btndispelmagic', 'adis', 'D', []),
            new Ability('Inner Fire', 'btninnerfireoff', 'ainf', 'F', []),
        ]),
        new Unit('Sorceress', 'btnsorceress', [
            ...defaultFighterAbilities,
            new Ability('Slow', 'btnslowoff', 'aslo', 'W', []),
            new Ability('Invisibility', 'btninvisibility', 'aivs', 'I', []),
            new Ability('Polymorph', 'btnpolymorph', 'aply', 'O', []),
        ]),
        new Unit('Spell Breaker', 'btnspellbreaker', [
            ...defaultFighterAbilities,
            new Ability('Spell Steal', 'btnspellstealoff', 'asps', 'T', []),
            new Ability('Control Magic', 'btncontrolmagic', 'acmg', 'C', []),
        ]),
        new Unit('Flying Machine', 'btnflyingmachine', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Mortar Team', 'btnmortarteam', [
            ...defaultSiegeAbilities,
            new Ability('Flare', 'btnflare', 'afla', 'F', []),
        ]),
        new Unit('Siege Engine', 'btnseigeengine', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Gryphon Rider', 'btngryphonrider', [
            ...defaultFighterAbilities,
        ]),
        new Unit('Dragonhawk Rider', 'btndragonhawkrider', [
            ...defaultFighterAbilities,
            new Ability('Aerial Shackles', 'btnmagiclariet', 'AMLS', 'E', []),
            new Ability('Cloud', 'btncloudoffog', 'aclf', 'C', []),
        ]),

    ] as Unit[]

export default units;
