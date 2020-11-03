import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {
    buildingWithCancel,
    defaultAltar,
    defaultMainBuilding,
    rally, shop, t2Shop
} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const buildings =
    [
        new Building('Necropolis', 'btnnecropolis',
            buildingWithCancel([
                new Ability('Train Acolyte', 'btnacolyte', 'uaco', 'C', []),
                ...defaultMainBuilding,
                new Ability('Upgrade to Halls of the Dead', 'btnhallofthedead', 'unp1', 'U', []),
                ...Ability.Defaults(2)
        ])),

        new Building('Halls of the Dead', 'btnhallofthedead',
            buildingWithCancel(
                [new Ability('Train Acolyte', 'btnacolyte', 'uaco', 'C', []),
                ...defaultMainBuilding,
                new Ability('Upgrade to Black Citadel ', 'btnblackcitadel', 'unp2', 'U', []),
                ...Ability.Defaults(2)])
        ),

        new Building('Crypt', 'btncrypt',
            buildingWithCancel([
                new Ability('Train Ghoul', 'btnghoul', 'ugho', 'G', []),
                new Ability('Train Crypt Fiend', 'btncryptfiend', 'ucry', 'F', []),
                new Ability('Train Gargoyle', 'btngargoyle', 'ugar', 'A', []),
                Ability.Default(),

                new Ability('Research Ghoul Frenzy', 'btnghoulfrenzy', 'rugf', 'Z', []),
                new Ability('Research Burrow', 'btncryptfiendburrow', 'rubu', 'B', []),
                new Ability('Research Stone Form', 'btnstoneform', 'rusf', 'S', []),
                rally,

                new Ability('Research Cannibalize', 'btncannibalize', 'ruac', 'C', []),
                new Ability('Research Web', 'btnweboff', 'ruwb', 'W', []),
                Ability.Default()]
            )),

        new Building('Graveyard', 'btngraveyard',
            buildingWithCancel([new Ability('Upgrade Unholy Strength', 'btnunholystrength', 'rume', 'S', []),
                new Ability('Upgrade Creature Attack', 'btncreatureattack', 'rura', 'A', []),
                ...Ability.Defaults(2),

                new Ability('Upgrade Unholy Armo', 'btnunholyarmor', 'ruar', 'U', []),
                new Ability('Upgrade Creature Carapace', 'btncreaturecarapace', 'rucr', 'C', []),
                ...Ability.Defaults(5)])),

        new Building('Ziggurat', 'btnziggurat',
            buildingWithCancel([
                ...Ability.Defaults(8),
                new Ability('Upgrade to Spirit Tower', 'btnzigguratupgrade', 'uzg1', 'T', []),
                new Ability('Upgrade to Nerubian Tower', 'btnfrosttower', 'uzg2', 'N', []),
                Ability.Default()])),

        new Building('Altar of Darkness', 'btnaltarofdarkness',
            defaultAltar([
                new Ability('Summon Crypt Lord', 'btnherocryptlord', 'ucrl', 'C', []),
                new Ability('Summon Death Knigh', 'btnherodeathknight', 'udea', 'D', []),
                new Ability('Summon Dreadlord', 'btnherodreadlord', 'udre', 'E', []),
                new Ability('Summon Lich', 'btnlichversion2', 'ulic', 'L', []),
            ])
        ),

        new Building('Temple of the Damned', 'btntempleofthedamned',
            buildingWithCancel([
                new Ability('Train Necromancer', 'btnnecromancer', 'unec', 'N', []),
                new Ability('Train Banshee', 'btnbanshee', 'uban', 'B', []),
                ...Ability.Defaults(2),
                new Ability('Research Skeletal Mastery', 'btnskeletonmage', 'rusm', 'M', []),
                ...Ability.Defaults(2),
                rally,
                new Ability('Necromancer Training', 'btnnecromanceradept', 'rune', 'E', []),
                new Ability('Banshee Training', 'btnbansheeadept', 'ruba', 'A', []),
                Ability.Default(),
            ])
        ),

        new Building('Slaughterhouse', 'btnslaughterhouse',
            buildingWithCancel([
                new Ability('Train Meat Wagon', 'btnmeatwagon', 'umtw', 'M', []),
                new Ability('Train Abomination', 'btnabomination', 'uabo', 'A', []),
                new Ability('Train Obsidian Statue', 'btnobsidianstatue', 'uobs', 'O', []),
                ...Ability.Defaults(4),
                rally,
                new Ability('Research Exhume Corpsesg', 'btnexhumecorpses', 'ruex', 'E', []),
                new Ability('Research Disease Cloud', 'btnplaguecloud', 'rupc', 'D', []),
                new Ability('Research Destroyer Form', 'btndestroyer', 'rusp', 'T', []),
            ])
        ),

        new Building('Sacrificial Pit', 'btnsacrificialpit',
            buildingWithCancel([
                new Ability('Sacrifice', 'btnsacrifice', 'asac', 'C', []),
                ...Ability.Defaults(6),
                rally,
                ...Ability.Defaults(3),
            ])
        ),

        new Building('Boneyard', 'btnboneyard',
            buildingWithCancel([
                new Ability('Train Frost Wyrm', 'btnfrostwyrm', 'ufro', 'F', []),
                ...Ability.Defaults(6),
                rally,
                new Ability('Research Freezing Breath', 'btnfreezingbreath', 'rufb', 'B', []),
                ...Ability.Defaults(2),
            ])
        ),

        new Building('Tomb of Relics', 'btntombofrelics',
            shop([
                new Ability('Purchase Rod of Necromancy', 'btnrodofnecromancy', 'rnec', 'R', []),
                new Ability('Purchase Ritual Dagger', 'btnsacrificialdagger', 'ritd', 'A', []),
                new Ability('Purchase Sacrificial Skull', 'btnsacrificialskull', 'skul', 'K', []),
                new Ability('Purchase Dust of Appearance', 'btndustofappearance', 'dust', 'D', []),
                ...t2Shop,
                new Ability('Purchase Orb of Corruption', 'btnorbofcorruption', 'ocor', 'B', []),
                new Ability('Purchase Scroll of Healing', 'btnscrolloftownportal', 'shea', 'H', []),
                Ability.Default(),
            ])
        )
    ] as Unit[]

export default buildings;
