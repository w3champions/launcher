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
        new Building('Necropolis', 'btnnecropolis',
            buildingWithCancel([
                Ability.Create('Train Acolyte', 'btnacolyte', 'uaco', 'C', []),
                ...defaultMainBuilding(Ability.Default(), 'rupm'),
                Ability.MultiHotkey('Upgrade to Halls of the Dead/Black Citadel', 'btnblackcitadel', 'unp1', 'U', [], ['unp2']),
                ...Ability.Defaults(2)
        ])),

        new Building('Crypt', 'btncrypt',
            buildingWithCancel([
                Ability.Create('Train Ghoul', 'btnghoul', 'ugho', 'G', []),
                Ability.Create('Train Crypt Fiend', 'btncryptfiend', 'ucry', 'F', []),
                Ability.Create('Train Gargoyle', 'btngargoyle', 'ugar', 'A', []),
                Ability.Default(),

                Ability.Create('Research Ghoul Frenzy', 'btnghoulfrenzy', 'rugf', 'Z', []),
                Ability.Create('Research Burrow', 'btncryptfiendburrow', 'rubu', 'B', []),
                Ability.Create('Research Stone Form', 'btnstoneform', 'rusf', 'S', []),
                rally,

                Ability.Create('Research Cannibalize', 'btncannibalize', 'ruac', 'C', []),
                Ability.Create('Research Web', 'btnweboff', 'ruwb', 'W', []),
                Ability.Default()]
            )),

        new Building('Graveyard', 'btngraveyard',
            buildingWithCancel([Ability.Create('Upgrade Unholy Strength', 'btnunholystrength', 'rume', 'S', []),
                Ability.StagedUpgrade('Upgrade Creature Attack', 'btncreatureattack', 'rura', 'A', []),
                ...Ability.Defaults(2),

                Ability.StagedUpgrade('Upgrade Unholy Armor', 'btnunholyarmor', 'ruar', 'U', []),
                Ability.StagedUpgrade('Upgrade Creature Carapace', 'btncreaturecarapace', 'rucr', 'C', []),
                ...Ability.Defaults(5)])),

        new Building('Ziggurat', 'btnziggurat',
            buildingWithCancel([
                ...Ability.Defaults(8),
                Ability.Create('Upgrade to Spirit Tower', 'btnzigguratupgrade', 'uzg1', 'T', []),
                Ability.Create('Upgrade to Nerubian Tower', 'btnfrosttower', 'uzg2', 'N', []),
                Ability.Default()])),

        new Building('Altar of Darkness', 'btnaltarofdarkness',
            defaultAltar([
                Ability.Create('Summon Crypt Lord', 'btnherocryptlord', 'ucrl', 'C', []),
                Ability.Create('Summon Death Knight', 'btnherodeathknight', 'udea', 'D', []),
                Ability.Create('Summon Dreadlord', 'btnherodreadlord', 'udre', 'E', []),
                Ability.Create('Summon Lich', 'btnlichversion2', 'ulic', 'L', []),
            ])
        ),

        new Building('Temple of the Damned', 'btntempleofthedamned',
            buildingWithCancel([
                Ability.Create('Train Necromancer', 'btnnecromancer', 'unec', 'N', []),
                Ability.Create('Train Banshee', 'btnbanshee', 'uban', 'B', []),
                ...Ability.Defaults(2),
                Ability.Create('Research Skeletal Mastery', 'btnskeletonmage', 'rusm', 'M', []),
                ...Ability.Defaults(2),
                rally,
                Ability.StagedUpgrade('Necromancer Training', 'btnnecromanceradept', 'rune', 'E', []),
                Ability.StagedUpgrade('Banshee Training', 'btnbansheeadept', 'ruba', 'A', []),
                Ability.Default(),
            ])
        ),

        new Building('Slaughterhouse', 'btnslaughterhouse',
            buildingWithCancel([
                Ability.Create('Train Meat Wagon', 'btnmeatwagon', 'umtw', 'M', []),
                Ability.Create('Train Abomination', 'btnabomination', 'uabo', 'A', []),
                Ability.Create('Train Obsidian Statue', 'btnobsidianstatue', 'uobs', 'O', []),
                ...Ability.Defaults(4),
                rally,
                Ability.Create('Research Exhume Corpsesg', 'btnexhumecorpses', 'ruex', 'E', []),
                Ability.Create('Research Disease Cloud', 'btnplaguecloud', 'rupc', 'D', []),
                Ability.Create('Research Destroyer Form', 'btndestroyer', 'rusp', 'T', []),
            ])
        ),

        new Building('Sacrificial Pit', 'btnsacrificialpit',
            buildingWithCancel([
                Ability.Create('Sacrifice', 'btnsacrifice', 'asac', 'C', []),
                ...Ability.Defaults(6),
                rally,
                ...Ability.Defaults(3),
            ])
        ),

        new Building('Boneyard', 'btnboneyard',
            buildingWithCancel([
                Ability.Create('Train Frost Wyrm', 'btnfrostwyrm', 'ufro', 'F', []),
                ...Ability.Defaults(6),
                rally,
                Ability.Create('Research Freezing Breath', 'btnfreezingbreath', 'rufb', 'B', []),
                ...Ability.Defaults(2),
            ])
        ),

        new Building('Tomb of Relics', 'btntombofrelics',
            shop([
                Ability.Create('Purchase Rod of Necromancy', 'btnrodofnecromancy', 'rnec', 'R', []),
                Ability.Create('Purchase Ritual Dagger', 'btnsacrificialdagger', 'ritd', 'A', []),
                Ability.Create('Purchase Sacrificial Skull', 'btnsacrificialskull', 'skul', 'K', []),
                Ability.Create('Purchase Dust of Appearance', 'btndustofappearance', 'dust', 'D', [])],
                [
                ...Ability.Defaults(1),
                Ability.Create('Purchase Orb of Corruption', 'btnorbofcorruption', 'ocor', 'B', []),
                Ability.Create('Purchase Scroll of Healing', 'btnscrolloftownportal', 'shea', 'H', []),
                ...Ability.Defaults(1)],
            )
        )
    ] as Unit[]

export default buildings;
