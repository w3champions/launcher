import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    attack,
    cancelBuild, defaultAltar,
    defaultFighterAbilities,
    defaultMainBuilding, rally, shop, stop
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";
const uproot = Ability.Create('Uproot', 'btnuproot', 'aro1', 'R', [])

const buildings =
    [
        new Building('Tree of Life', 'btntreeoflife', [
            Ability.Create('Train Wisp', 'btnwisp', 'ewsp', 'W', []),
            ...defaultMainBuilding(
                Ability.Create('Research Nature’s Blessing', 'btnnaturesblessing', 'renb', 'N', []),
                'repm'
            ),
            Ability.MultiHotkey('Upgrade to Tree of Ages/Eternity', 'btntreeofeternity', 'etoa', 'U', [], ['etoe']),
            Ability.Create('Entangle Gold Mine', 'btngoldmine', 'aent', 'G', []),
            uproot,
            cancelBuild
        ]),

        new Building('Entangled Gold Mine', 'btngoldmine', [
            ...Ability.Defaults(9),
            Ability.Create('Load Wisp', 'btnload', 'slo2', 'L', []),
            Ability.Create('Unload All', 'btnunload', 'adri', 'U', [])
        ]),

        new Building('Uprooted Ancient', 'btnuproot', [
            ...defaultFighterAbilities,
            Ability.Create('Eat Tree', 'btneattree', 'aeat', 'E', []),
            ...Ability.Defaults(2),
            uproot
        ]),

        new Building('Ancient of War', 'btnancientoftheearth', [
            Ability.Create('Train Archer', 'btnarcher', 'earc', 'A', []),
            Ability.Create('Train Huntress', 'btnhuntress', 'esen', 'H', []),
            Ability.Create('Train Glaive Thrower', 'btnglaivethrower', 'ebal', 'T', []),
            Ability.Default(),
            Ability.Create('Research Marksmanship', 'btnmarksmanship', 'remk', 'M', []),
            Ability.Create('Research Moon Glaive', 'btnupgrademoonglaive', 'remg', 'G', []),
            Ability.Default(),
            rally,
            Ability.Create('Research Improved Bows', 'btnimprovedbows', 'reib', 'I', []),
            Ability.Create('Research Sentinel', 'btnsentinel', 'resc', 'S', []),
            Ability.Create('Research Vorpal Blades', 'btnvorpalblades', 'repb', 'P', []),
            uproot
        ]),

        new Building('Hunter’s Hall', 'btnhuntershall', [
            Ability.StagedUpgrade('Upgrade Strength of the Moon', 'btnstrengthofthemoon', 'resm', 'M', []),
            Ability.StagedUpgrade('Upgrade Strength of the Wild', 'btnstrengthofthewild', 'resw', 'W', []),
            Ability.Create('Research Ultravision', 'btnultravision', 'reuv', 'U', []),
            Ability.Create('Research Well Spring', 'btnwellspring', 'rews', 'E', []),
            Ability.StagedUpgrade('Upgrade Moon Armor', 'btnmoonarmor', 'rema', 'A', []),
            Ability.StagedUpgrade('Upgrade Reinforced Hides', 'btnreinforcedhides', 'rerh', 'R', []),
            ...Ability.Defaults(5),
            cancelBuild
        ]),

        new Building('Ancient Protector', 'btntreant', [
            ...Ability.Defaults(1),
            stop,
            ...Ability.Defaults(1),
            attack,
            ...Ability.Defaults(7),
            uproot
        ]),

        new Building('Moon Well', 'btnmoonwell', [
            ...Ability.Defaults(1),
            Ability.Create('Replenish Mana and Life', 'btnmanarechargeoff', 'ambt', 'R', []),
        ]),

        new Building('Altar of Elders', 'btnaltarofelders', [
            ...defaultAltar([
                Ability.Create('Summon Warden', 'btnherowarden', 'ewar', 'W', []),
                Ability.Create('Summon Demon Hunter', 'btnherodemonhunter', 'edem', 'D', []),
                Ability.Create('Summon Keeper of the Grove', 'btnkeeperofthegrove', 'ekee', 'K', []),
                Ability.Create('Summon Priestess of the Moon', 'btnpriestessofthemoon', 'emoo', 'P', []),
            ])
        ]),

        new Building('Ancient of Lore', 'btnancientoflore', [
            Ability.Create('Train Dryad', 'btndryad', 'edry', 'D', []),
            Ability.Create('Train Druid of the Claw', 'btndruidoftheclaw', 'edoc', 'C', []),
            Ability.Create('Train Mountain Giant', 'btnmountaingiant', 'emtg', 'G', []),
            cancelBuild,
            ...Ability.Defaults(1),
            Ability.Create('Research Mark of the Claw', 'btnenchantedbears', 'reeb', 'M', []),
            Ability.Create('Research Hardened Skin', 'btnhardenedskin', 'rehs', 'H', []),
            rally,
            Ability.Create('Research Abolish Magic', 'btndryaddispelmagic', 'resi', 'A', []),
            Ability.StagedUpgrade('Druid of the Claw Training', 'btndocadepttraining', 'redc', 'L', []),
            Ability.Create('Research Resistant Skin', 'btnhardenedskin', 'rers', 'T', []),
            uproot,
        ]),

        new Building('Ancient of Wind', 'btnancientofthemoon', [
            Ability.Create('Train Hippogryph', 'btnhippogriff', 'ehip', 'H', []),
            Ability.Create('Train Druid of the Talon', 'btndruidofthetalon', 'edot', 'T', []),
            Ability.Create('Train Faerie Dragon', 'btnfaeriedragon', 'efdr', 'F', []),
            ...Ability.Defaults(2),
            Ability.Create('Research Mark of the Talon', 'btnenchantedcrows', 'reec', 'M', []),
            ...Ability.Defaults(1),
            rally,
            ...Ability.Defaults(1),
            Ability.StagedUpgrade('Druid of the Talon Training', 'btndotadepttraining', 'redt', 'A ', []),
            cancelBuild,
            uproot,
        ]),

        new Building('Chimaera Roost', 'btnchimaeraroost', [
            Ability.Create('Train Chimaera', 'btnchimaera', 'echm', 'C', []),
            ...Ability.Defaults(6),
            rally,
            Ability.Create('Research Corrosive Breath', 'btncorrosivebreath', 'recb', 'B', []),
            ...Ability.Defaults(2),
            cancelBuild,
        ]),

        new Building('Ancient of Wonders', 'btnancientofwonders', [
            ...shop([
                Ability.Create('Purchase Moonstone', 'btnmoonstone', 'moon', 'N', []),
                Ability.Create('Purchase Lesser Clarity Potion', 'btnlesserclaritypotion', 'plcl', 'C', []),
                Ability.Default(),
                Ability.Create('Purchase Dust of Appearance', 'btndustofappearance', 'dust', 'D', []),
            ],[
                Ability.Create('Purchase Staff of Preservation', 'btnstaffofpreservation', 'spre', 'E', []),
                Ability.Create('Purchase Orb of Venom', 'btnorbofvenom', 'oven', 'V', []),
                Ability.Create('Purchase Anti-magic Potion', 'btnsnazzypotion', 'pams', 'A', []),
                uproot
            ])
        ])
    ] as Unit[]

export default buildings;
