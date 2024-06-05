import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    attack,
    buildingWithCancel,
    defaultAltar,
    defaultMainBuilding,
    rally, shop, stop,
    tier2Items
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const buildings =
    [
        new Building('Great Hall', 'btngreathall',
            buildingWithCancel([
                Ability.Create('Train Peon', 'btnpeon', 'opeo', 'P', []),
                ...defaultMainBuilding(Ability.Create('Research Pillage', 'btnpillage', 'ropg', 'G', []), 'ropm'),
                Ability.MultiHotkey('Upgrade to Stronghold/Fortress', 'btnfortress', 'ostr', 'U', [], ['ofrt']),
            ])),

        new Building('Barracks', 'btnbarracks',
            buildingWithCancel([
                Ability.Create('Train Grunt', 'btngrunt', 'ogru', 'G', []),
                Ability.MultiHotkey('Train Troll Headhunter', 'btnheadhunter', 'ohun', 'T', [], ['otbk']),
                Ability.Create('Train Demolisher', 'btndemolisher', 'ocat', 'D', []),
                ...Ability.Defaults(2),
                Ability.Create('Berserker Upgrade', 'btnberserkfortrolls', 'robk', 'E', []),
                Ability.Create('Burning Oil', 'btnfirerocks', 'robf', 'N', []),
                rally,
                Ability.Create('Research Brute Strength', 'btnberserk', 'robs', 'B', []),
                Ability.Create('Research Troll Regeneration', 'btnregenerate', 'rotr', 'R', []),
                Ability.Default()]
            )),

        new Building('War Mill', 'btnforge',
            buildingWithCancel([
                Ability.StagedUpgrade('Upgrade Melee Weapons', 'btnorcmeleeupone', 'rome', 'M', []),
                Ability.StagedUpgrade('Upgrade Ranged Weapons', 'btnsteelranged', 'rora', 'R', []),
                Ability.StagedUpgrade('Upgrade Barricades', 'btnspikedbarricades', 'rosp', 'S', []),
                Ability.Default(),
                Ability.StagedUpgrade('Upgrade Armor', 'btnsteelarmor', 'roar', 'A', []),
                Ability.Default(),
                Ability.Create('Reinforced Defenses', 'btnreinforcedburrows', 'rorb', 'D', []),
                ...Ability.Defaults(4)]
            )),

        new Building('Burrow', 'btntrollburrow',
            buildingWithCancel([
                ...Ability.Defaults(8),
                Ability.Create('Battle Stations', 'btnbattlestations', 'abtl', 'B', []),
                Ability.Create('Stand Down', 'btnbacktowork', 'astd', 'D', []),
                Ability.Default()]
            )),

        new Building('Watch Tower', 'btnorctower',
            buildingWithCancel([
                ...Ability.Defaults(1),
                stop,
                ...Ability.Defaults(1),
                attack,
                ...Ability.Defaults(7)
            ])),

        new Building('Altar of Storms', 'btnaltarofstorms',
            defaultAltar([
                Ability.Create('Summon Shadow Hunter', 'btnshadowhunter', 'oshd', 'H', []),
                Ability.Create('Summon Blademaster', 'btnheroblademaster', 'obla', 'B', []),
                Ability.Create('Summon Far Seer', 'btnherofarseer', 'ofar', 'F', []),
                Ability.Create('Summon Tauren Chieftain', 'btnherotaurenchieftain', 'otch', 'T', []),
            ])
        ),

        new Building('Spirit Lodge', 'btnspiritlodge',
            buildingWithCancel([
                Ability.Create('Train Shaman', 'btnshaman', 'oshm', 'S', []),
                Ability.Create('Train Witch Doctor', 'btnwitchdoctor', 'odoc', 'W', []),
                ...Ability.Defaults(5),
                rally,
                Ability.StagedUpgrade('Shaman Training', 'btnshamanadept', 'rost', 'M', []),
                Ability.StagedUpgrade('Witch Doctor Training', 'btnwitchdoctoradept', 'rowd', 'D', []),
                Ability.Default(),
            ])
        ),
        new Building('Beastiary', 'btnbeastiary',
            buildingWithCancel([
                Ability.Create('Train Raider', 'btnraider', 'orai', 'R', []),
                Ability.Create('Train Wind Rider', 'btnwyvernrider', 'owyv', 'W', []),
                Ability.Create('Train Kodo Beast', 'btnkodobeast', 'okod', 'K', []),
                Ability.Create('Train Troll Batrider', 'btntrollbatrider', 'otbr', 'B', []),
                ...Ability.Defaults(2),
                Ability.Create('Research Liquid Fire', 'btnliquidfire', 'rolf', 'L', []),
                rally,
                Ability.Create('Research Ensnare', 'btnensnare', 'roen', 'N', []),
                Ability.Create('Research Envenomed Spears', 'btnenvenomedspear', 'rovs', 'E', []),
                Ability.Create('Upgrade War Drums', 'btndrum', 'rwdm', 'D', [])
            ])
        ),
        new Building('Tauren Totem', 'btntaurentotem',
            buildingWithCancel([
                Ability.Create('Train Spirit Walker', 'btnetherealformon', 'ospm', 'W', []),
                Ability.Create('Train Tauren', 'btntauren', 'otau', 'T', []),
                ...Ability.Defaults(5),
                rally,
                Ability.StagedUpgrade('Spirit Walker Training', 'btnspiritwalkeradepttraining', 'rowt', 'R', []),
                Ability.Create('Upgrade Pulverize', 'btnsmash', 'rows', 'P', []),
                Ability.Default(),
            ])
        ),

        new Building('Voodoo Lounge', 'btnvoodoolounge',
            shop(
                [
                    Ability.Create('Purchase Purchase Healing Salve', 'btnhealingsalve', 'hslv', 'H', []),
                    Ability.Create('Purchase Lesser Clarity Potion', 'btnlesserclaritypotion', 'plcl', 'C', []),
                    Ability.Create('Purchase Scroll of Speed', 'btnscrollofhaste', 'shas', 'S', []),
                    Ability.Default(),
                ],
                tier2Items,
                [
                    ...Ability.Defaults(1),
                    Ability.Create('Purchase Orb of Lightning', 'btnorboflightning', 'oli2', 'L', []),
                    Ability.Create('Purchase Tiny Great Hall', 'btngreathall', 'tgrh', 'G', []),
                    ...Ability.Defaults(1)
                ],
            )
        )
    ] as Unit[]

export default buildings;
