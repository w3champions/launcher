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
            Ability.Create('Train Peasant', 'btnpeasant', 'hpea', 'P', []),
            ...defaultMainBuilding(Ability.Default(), 'rhpm'),
            Ability.MultiHotkey('Upgrade to Keep/Castle', 'btncastle', 'hkee', 'U', [], ['hcas']),
            Ability.UnhotkeyAbility('Call to Arms', 'btncalltoarms', 'amic', 'C', 'W'),
            Ability.Default()
            ])),
        new Building('Barracks', 'btnhumanbarracks',
            buildingWithCancel([
            Ability.Create('Train Footman', 'btnfootman', 'hfoo', 'F', []),
            Ability.Create('Train Rifleman', 'btnrifleman', 'hrif', 'R', []),
            Ability.Create('Train Knight', 'btnknight', 'hkni', 'K', []),
            ...Ability.Defaults(3),
            Ability.Create('Research Sundering Blades', 'btnsunderingblades', 'rhsb', 'B', []),
            rally,
            Ability.Create('Research Defend', 'btndefend', 'rhde', 'D', []),
            Ability.Create('Research Long Rifles', 'btndwarvenlongrifle', 'rhri', 'L', []),
            Ability.Create('Research Animal War Training', 'btnanimalwartraining', 'rhan', 'A', [])
            ])),
        new Building('Lumber Mill', 'btnhumanlumbermill',
            buildingWithCancel([
                Ability.StagedUpgrade('Upgrade Lumber Harvesting', 'btnhumanlumberupgrade1', 'rhlh', 'L', []),
                Ability.StagedUpgrade('Upgrade Masonry', 'btnstonearchitecture', 'rhac', 'M', []),
                ...Ability.Defaults(9),
            ])),
        new Building('Blacksmith', 'btnblacksmith',
            buildingWithCancel([
                Ability.StagedUpgrade('Upgrade Forged Swords', 'btnsteelmelee', 'rhme', 'S', []),
                Ability.StagedUpgrade('Upgrade Gunpowder', 'btnhumanmissileupone', 'rhra', 'G', []),
                ...Ability.Defaults(2),
                Ability.StagedUpgrade('Upgrade Plating', 'btnhumanarmorupone', 'rhar', 'P', []),
                Ability.StagedUpgrade('Upgrade Leather Armor', 'btnleatherupgradeone', 'rhla', 'A', []),
                ...Ability.Defaults(5),
            ])),
        new Building('Altar of Kings', 'btnaltarofkings',
            defaultAltar([
                Ability.Create('Summon Blood Mage', 'btnherobloodelfprince', 'hblm', 'B', []),
                Ability.Create('Summon Archmage', 'btnheroarchmage', 'hamg', 'A', []),
                Ability.Create('Summon Mountain King', 'btnheromountainking', 'hmkg', 'M', []),
                Ability.Create('Summon Paladin', 'btnheropaladin', 'hpal', 'L', []),
            ])),
        new Building('Arcane Sanctum', 'btnarcanesanctum',
            buildingWithCancel([
                Ability.Create('Train Sorceress', 'btnsorceress', 'hsor', 'S', []),
                Ability.Create('Train Priest', 'btnpriest', 'hmpr', 'P', []),
                Ability.Create('Train Spell Breaker', 'btnspellbreaker', 'hspt', 'B', []),
                ...Ability.Defaults(3),
                Ability.Create('Research Control Magic', 'btncontrolmagic', 'rhss', 'G', []),
                rally,
                Ability.StagedUpgrade('Sorceress Training', 'btnsorceressadept', 'rhst', 'O', []),
                Ability.StagedUpgrade('Priest Training', 'btnpriestadept', 'rhpt', 'T', []),
                Ability.Create('Research Magic Sentry', 'btnmagicalsentry', 'rhse', 'M', []),
            ])),
        new Building('Workshop', 'btnworkshop',
            buildingWithCancel([
                Ability.Create('Train Flying Machine', 'btnflyingmachine', 'hgyr', 'F', []),
                Ability.Create('Train Mortar Team', 'btnmortarteam', 'hmtm', 'M', []),
                Ability.MultiHotkey('Train Siege Engine', 'btnseigeengine', 'hmtt', 'E', [], ['hrtt']),
                ...Ability.Defaults(1),
                Ability.Create('Research Flying Machine Bombs', 'btnhumanartilleryupone', 'rhgb', 'B', []),
                Ability.Create('Research Fragmentation Shards', 'btnfragmentationbombs', 'rhfs', 'S', []),
                Ability.Create('Research Barrage', 'btnscatterrockets', 'rhrt', 'G', []),
                rally,
                Ability.Create('Research Flak Cannons', 'btnflakcannons', 'rhfc', 'C', []),
                Ability.Create('Research Flare', 'btnflare', 'rhfl', 'R', []),
                ...Ability.Defaults(1),
            ])),
        new Building('Scout Tower', 'btnhumanwatchtower',
            buildingWithCancel([
                ...Ability.Defaults(8),
                Ability.Create('Upgrade to Guard Tower', 'btnguardtower', 'hgtw', 'G', [
                    ...Ability.Defaults(1),
                    Ability.Create('Stop', 'btnstop', 'cmdstop', 'S', []),
                    ...Ability.Defaults(1),
                    Ability.Create('Attack', 'btnattack', 'cmdattack', 'A', [])
                ]),
                Ability.Create('Upgrade to Cannon Tower', 'btncannontower', 'hctw', 'C', [
                    ...Ability.Defaults(1),
                    Ability.Create('Stop', 'btnstop', 'cmdstop', 'S', []),
                    ...Ability.Defaults(1),
                    Ability.Create('Attack', 'btnattack', 'cmdattack', 'A', []),
                    ...Ability.Defaults(3),
                    Ability.Create('Attack Ground', 'btnattackground', 'cmdattackground', 'G', []),
                ]),
                Ability.Create('Upgrade to Arcane Tower', 'btnhumanarcanetower', 'hatw', 'N', [
                    ...Ability.Defaults(1),
                    Ability.Create('Stop', 'btnstop', 'cmdstop', 'S', []),
                    ...Ability.Defaults(1),
                    Ability.Create('Attack', 'btnattack', 'cmdattack', 'A', []),
                    ...Ability.Defaults(4),
                    Ability.Create('Reveal', 'btnreveal', 'ahta', 'R', []),
                ]),
            ])),
        new Building('Gryphon Aviary', 'btngryphonaviary',
            buildingWithCancel([
                Ability.Create('Train Dragonhawk Rider', 'btndragonhawkrider', 'hdhw', 'D', []),
                Ability.Create('Train Gryphon Rider', 'btngryphonrider', 'hgry', 'G', []),
                ...Ability.Defaults(5),
                rally,
                Ability.Create('Research Cloud', 'btncloudoffog', 'rhcd', 'C', []),
                Ability.Create('Research Storm Hammers', 'btnstormhammer', 'rhhb', 'H', []),
                ...Ability.Defaults(1),
            ])),
        new Building('Arcane Vault', 'btnarcanevault',
            shop([
                Ability.Create('Purchase Scroll of Regeneration', 'btnscrollofregenerationgreen', 'sreg', 'R', []),
                Ability.Create('Purchase Lesser Clarity Potion', 'btnlesserclaritypotion', 'plcl', 'C', []),
                Ability.Create('Purchase Mechanical Critter', 'btnmechanicalcritter', 'mcri', 'E', []),
                Ability.Default()],
                [
                    Ability.Create('Purchase Ivory Tower', 'btnhumanwatchtower', 'tsct', 'V', []),
                    Ability.Create('Purchase Orb of Fire', 'btnorboffire', 'ofr2', 'F', []),
                    Ability.Create('Purchase Staff of Sanctuary', 'btnstaffofsanctuary', 'ssan', 'N', []),
                    Ability.Default()],
            )
        )




    ] as Unit[]

export default buildings;
