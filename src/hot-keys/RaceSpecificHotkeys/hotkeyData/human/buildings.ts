import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    buildingWithCancel,
    defaultAltar,
    defaultMainBuilding,
    rally, shop
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const buildings =
    [
        new Building('Townhall', 'btntownhall',
            buildingWithCancel([
            new Ability('Train Peasant', 'btnpeasant', 'hpea', 'P', []),
            ...defaultMainBuilding(Ability.Default(), 'rhpm'),
            Ability.DoubleHotkey('Upgrade to Keep', 'btnkeep', 'hkee', 'U', [], 'hcas'),
            new Ability('Call to Arms', 'btncalltoarms', 'amil', 'C', []),
            new Ability('Back to Work', 'btnbacktowork', 'amil', 'W', []),
            ])),
        new Building('Barracks', 'btnhumanbarracks',
            buildingWithCancel([
            new Ability('Train Footman', 'btnfootman', 'hfoo', 'F', []),
            new Ability('Train Rifleman', 'btnrifleman', 'hrif', 'R', []),
            new Ability('Train Knight', 'btnknight', 'hkni', 'K', []),
            ...Ability.Defaults(3),
            new Ability('Research Sundering Blades', 'btnsunderingblades', 'rhsb', 'B', []),
            rally,
            new Ability('Research Defend', 'btndefend', 'rhde', 'D', []),
            new Ability('Research Long Rifles', 'btndwarvenlongrifle', 'rhri', 'L', []),
            new Ability('Research Animal War Training', 'btnanimalwartraining', 'rhan', 'A', [])
            ])),
        new Building('Lumber Mill', 'btnhumanlumbermill',
            buildingWithCancel([
                new Ability('Upgrade Lumber Harvesting', 'btnhumanlumberupgrade1', 'rhlh', 'L', []),
                new Ability('Upgrade Masonry', 'btnstonearchitecture', 'rhac', 'M', []),
                ...Ability.Defaults(9),
            ])),
        new Building('Blacksmith', 'btnblacksmith',
            buildingWithCancel([
                new Ability('Upgrade Forged Swords', 'btnsteelmelee', 'rhme', 'S', []),
                new Ability('Upgrade Gunpowder', 'btnhumanmissileupone', 'rhra', 'G', []),
                ...Ability.Defaults(2),
                new Ability('Upgrade Plating', 'btnhumanarmorupone', 'rhar', 'P', []),
                new Ability('Upgrade Leather Armor', 'btnleatherupgradeone', 'rhla', 'A', []),
                ...Ability.Defaults(5),
            ])),
        new Building('Altar of Kings', 'btnaltarofkings',
            defaultAltar([
                new Ability('Summon Blood Mage', 'btnherobloodelfprince', 'hblm', 'B', []),
                new Ability('Summon Archmage', 'btnheroarchmage', 'hamg', 'A', []),
                new Ability('Summon Mountain King', 'btnheromountainking', 'hmkg', 'M', []),
                new Ability('Summon Paladin', 'btnheropaladin', 'hpal', 'L', []),
            ])),
        new Building('Arcane Sanctum', 'btnarcanesanctum',
            buildingWithCancel([
                new Ability('Train Sorceress', 'btnsorceress', 'hsor', 'S', []),
                new Ability('Train Priest', 'btnpriest', 'hmpr', 'P', []),
                new Ability('Train Spell Breaker', 'btnspellbreaker', 'hspt', 'B', []),
                ...Ability.Defaults(3),
                new Ability('Research Control Magic', 'btncontrolmagic', 'rhss', 'G', []),
                rally,
                new Ability('Sorceress Training', 'btnsorceressadept', 'rhst', 'O', []),
                new Ability('Priest Training', 'btnpriestadept', 'rhpt', 'T', []),
                new Ability('Research Magic Sentry', 'btnmagicalsentry', 'rhse', 'M', []),
            ])),
        new Building('Workshop', 'btnworkshop',
            buildingWithCancel([
                new Ability('Train Flying Machine', 'btnflyingmachine', 'hgyr', 'F', []),
                new Ability('Train Mortar Team', 'btnmortarteam', 'hmtm', 'M', []),
                Ability.DoubleHotkey('Train Siege Engine', 'btnseigeengine', 'hmtt', 'E', [], 'hrtt'),
                ...Ability.Defaults(1),
                new Ability('Research Flying Machine Bombs', 'btnhumanartilleryupone', 'rhgb', 'B', []),
                new Ability('Research Fragmentation Shards', 'btnfragmentationbombs', 'rhfs', 'S', []),
                new Ability('Research Barrage', 'btnscatterrockets', 'rhrt', 'G', []),
                rally,
                new Ability('Research Flak Cannons', 'btnflakcannons', 'rhfc', 'C', []),
                new Ability('Research Flare', 'btnflare', 'rhfl', 'R', []),
                ...Ability.Defaults(1),
            ])),
        new Building('Scout Tower', 'btnhumanwatchtower',
            buildingWithCancel([
                ...Ability.Defaults(8),
                new Ability('Upgrade to Guard Tower', 'btnguardtower', 'hgtw', 'G', [
                    ...Ability.Defaults(1),
                    new Ability('Stop', 'btnstop', 'cmdstop', 'S', []),
                    ...Ability.Defaults(1),
                    new Ability('Attack', 'btnattack', 'cmdattack', 'A', [])               
                ]),
                new Ability('Upgrade to Cannon Tower', 'btncannontower', 'hctw', 'C', [
                    ...Ability.Defaults(1),
                    new Ability('Stop', 'btnstop', 'cmdstop', 'S', []),
                    ...Ability.Defaults(1),
                    new Ability('Attack', 'btnattack', 'cmdattack', 'A', []),
                    ...Ability.Defaults(3),
                    new Ability('Attack Ground', 'btnattackground', 'cmdattackground', 'G', []),
                ]),
                new Ability('Upgrade to Arcane Tower', 'btnhumanarcanetower', 'hatw', 'N', [
                    ...Ability.Defaults(1),
                    new Ability('Stop', 'btnstop', 'cmdstop', 'S', []),
                    ...Ability.Defaults(1),
                    new Ability('Attack', 'btnattack', 'cmdattack', 'A', []),
                    ...Ability.Defaults(4),
                    new Ability('Reveal', 'btnreveal', 'ahta', 'R', []),
                ]),
            ])),
        new Building('Gryphon Aviary', 'btngryphonaviary',
            buildingWithCancel([
                new Ability('Train Dragonhawk Rider', 'btndragonhawkrider', 'hdhw', 'D', []),
                new Ability('Train Gryphon Rider', 'btngryphonrider', 'hgry', 'G', []),
                ...Ability.Defaults(5),
                rally,
                new Ability('Research Cloud', 'btncloudoffog', 'rhcd', 'C', []),
                new Ability('Research Storm Hammers', 'btnstormhammer', 'rhhb', 'H', []),
                ...Ability.Defaults(1),
            ])),
        new Building('Arcane Vault', 'btnarcanevault',
            shop([
                new Ability('Purchase Scroll of Regeneration', 'btnscrollofregenerationgreen', 'sreg', 'R', []),
                new Ability('Purchase Lesser Clarity Potion', 'btnlesserclaritypotion', 'plcl', 'C', []),
                new Ability('Purchase Mechanical Critter', 'btnmechanicalcritter', 'mcri', 'E', []),
                Ability.Default()],
                [
                    new Ability('Purchase Ivory Tower', 'btnhumanwatchtower', 'tsct', 'V', []),
                    new Ability('Purchase Orb of Fire', 'btnorboffire', 'ofr2', 'F', []),
                    new Ability('Purchase Staff of Sanctuary', 'btnstaffofsanctuary', 'ssan', 'N', [])],
            )
        )

        


    ] as Unit[]

export default buildings;
