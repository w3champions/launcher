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
            new Ability('Summon Naga Sea Witch', 'btnnagaseawitch', 'nngs', 'G', []),
            new Ability('Summon Dark Ranger', 'btnbansheeranger', 'nbrn', 'R', []),
            new Ability('Summon Pandaren Brewmaster', 'btnpandarenbrewmaster', 'npbm', 'N', []),
            new Ability('Summon Firelord', 'btnheroavatarofflame', 'nfir', 'O', []),
            new Ability('Summon Pit Lord', 'btnpitlord', 'nplh', 'I', []),
            new Ability('Summon Beastmaster', 'btnbeastmaster', 'nbst', 'S', []),
            new Ability('Summon Tinker', 'btnherotinker', 'ntin', 'Z', []),
            new Ability('Summon Alchemist', 'btnheroalchemist', 'nalc', 'X', []),
        ]),

        new Building('Goblin Laboratory', 'btnammodump', [
            new Ability('Hire Goblin Sapper', 'btngoblinsapper', 'ngsp', 'S', []),
            new Ability('Hire Goblin Zeppelin', 'btngoblinzeppelin', 'nzep', 'Z', []),
            new Ability('Hire Goblin Shredder', 'btnjunkgolem', 'ngir', 'G', []),
            new Ability('Reveal', 'btnreveal', 'andt', 'R', []),
        ]),

        new Building('Mercenary Camp', 'btnmercenarycamp', [
            new Ability('Hire Forest Troll Shadow Priest', 'btnforesttrollshadowpriest', 'nfsp', 'P', []),
            new Ability('Hire Forest Troll Berserker', 'btnforesttrollberserker', 'nftb', 'B', []),
            new Ability('Summon Mud Golemr', 'btnmudgolem', 'ngrk', 'U', []),
            new Ability('Hire Ogre Mauler', 'btnogremauler', 'nogm', 'M', []),
        ]),

        new Building('Goblin Merchant', 'btnmerchant', [
            new Ability('Purchase Boots of Speed', 'btnbootsofspeed', 'bspd', 'S', []),
            new Ability('Purchase Periapt of Vitality', 'btnperiapt', 'prvt', 'V', []),
            new Ability('Purchase Circlet of Nobility', 'btncirclet', 'cnob', 'C', []),
            new Ability('Purchase Dust of Appearance', 'btndustofappearance', 'dust', 'D', []),

            new Ability('Purchase Scroll of Protection', 'btnscroll', 'spro', 'R', []),
            new Ability('Purchase Potion of Invisibility', 'btnlesserinvisibility', 'pinv', 'I', []),
            new Ability('Purchase Scroll of Town Portal', 'btnscrolluber', 'stwp', 'T', []),
            new Ability('Purchase Staff of Teleportationd', 'btnstaffofteleportation', 'stel', 'E', []),

            new Ability('Purchase Tome of Retraining', 'btntomeofretraining', 'tret', 'O', []),
            new Ability('Purchase Scroll of Healing', 'btnscrolloftownportal', 'shea', 'H', []),
            new Ability('Purchase Potion of Lesser Invulnerability', 'btnlesserinvulneralbility', 'pnvl', 'N', []),
            selectUser
        ]),
    ] as Unit[]

export default buildings;
