import {
    Ability,
    Building,
    Unit,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {selectUser} from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/commonHotkeys";

const buildings =
    [
        new Building('Tavern', 'btntavern', [
            ...Ability.Defaults(4),
            Ability.Create('Summon Naga Sea Witch', 'btnnagaseawitch', 'nngs', 'G', []),
            Ability.Create('Summon Dark Ranger', 'btnbansheeranger', 'nbrn', 'R', []),
            Ability.Create('Summon Pandaren Brewmaster', 'btnpandarenbrewmaster', 'npbm', 'N', []),
            Ability.Create('Summon Firelord', 'btnheroavatarofflame', 'nfir', 'O', []),
            Ability.Create('Summon Pit Lord', 'btnpitlord', 'nplh', 'I', []),
            Ability.Create('Summon Beastmaster', 'btnbeastmaster', 'nbst', 'S', []),
            Ability.Create('Summon Tinker', 'btnherotinker', 'ntin', 'Z', []),
            Ability.Create('Summon Alchemist', 'btnheroalchemist', 'nalc', 'X', []),
        ]),

        new Building('Goblin Laboratory', 'btnammodump', [
            Ability.Create('Hire Goblin Sapper', 'btngoblinsapper', 'ngsp', 'S', []),
            Ability.Create('Hire Goblin Zeppelin', 'btngoblinzeppelin', 'nzep', 'Z', []),
            Ability.Create('Hire Goblin Shredder', 'btnjunkgolem', 'ngir', 'G', []),
            Ability.Create('Reveal', 'btnreveal', 'andt', 'R', []),
        ]),

        new Building('Mercenary Camp', 'btnmercenarycamp', [
            Ability.Create('Hire Forest Troll Shadow Priest', 'btnforesttrollshadowpriest', 'nfsp', 'P', []),
            Ability.Create('Hire Forest Troll Berserker', 'btnforesttrollberserker', 'nftb', 'B', []),
            Ability.Create('Hire Ogre Mauler', 'btnogremauler', 'nogm', 'M', []),
            Ability.Create('Summon Mud Golem', 'btnmudgolem', 'ngrk', 'U', []),
        ]),

        new Building('Goblin Merchant', 'btnmerchant', [
            Ability.Create('Purchase Boots of Speed', 'btnbootsofspeed', 'bspd', 'S', []),
            Ability.Create('Purchase Periapt of Vitality', 'btnperiapt', 'prvt', 'V', []),
            Ability.Create('Purchase Circlet of Nobility', 'btncirclet', 'cnob', 'C', []),
            Ability.Create('Purchase Dust of Appearance', 'btndustofappearance', 'dust', 'D', []),

            Ability.Create('Purchase Scroll of Protection', 'btnscroll', 'spro', 'R', []),
            Ability.Create('Purchase Potion of Invisibility', 'btnlesserinvisibility', 'pinv', 'I', []),
            Ability.Create('Purchase Scroll of Town Portal', 'btnscrolluber', 'stwp', 'T', []),
            Ability.Create('Purchase Staff of Teleportation', 'btnstaffofteleportation', 'stel', 'E', []),

            Ability.Create('Purchase Tome of Retraining', 'btntomeofretraining', 'tret', 'O', []),
            Ability.Create('Purchase Scroll of Healing', 'btnscrolloftownportal', 'shea', 'H', []),
            Ability.Create('Purchase Potion of Lesser Invulnerability', 'btnlesserinvulneralbility', 'pnvl', 'N', []),
            selectUser
        ]),
    ] as Unit[]

export default buildings;
