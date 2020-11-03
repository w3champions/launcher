// Explanation:
// the Ability class is the hotkey, that you can alter in the ui. Example:
// new Ability("Move", "btnmove", "cmdmove", "M", "M", [])
// Where the most Parameters are as follow:
// new Ability(<Name in the UI>, <name of the icon>, <name of the hotkey command>, <default hotkey>, <current hootkey (is always the same as default, for the data file here>, [])
// the [] on the end is and array of "Extended Abilities" that open up, when you select the ability. You can see it as sub hotkeys.
// An example is the peasent build hotkey, which is on B, but if you enter that menu, you get more options on what buildings you can build, which also have hotkeys.
// The same goes for hero ability selections for example.
// To add extended abilities, do something like that
// new Ability('Build', 'btnhumanbuild', 'cmdbuildhuman', 'B', 'B', [
//     new Ability('Build Townhall', 'btntownhall', 'htow', 'H', 'H', []),
//     new Ability('Build Arcane Vault', 'btnarcanevault', 'hvlt', 'V', 'V', [])
// ]),

import {
    HotkeyMappingPerRace,
} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import humans from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/human";
import orcs from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/orcs";
import undeads from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/undeads";
import nightelfs from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/nightelfs";
import neutral from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/neutral";

const defaultHotkeyData = [
  humans,
  orcs,
  undeads,
  nightelfs,
  neutral,
] as HotkeyMappingPerRace[]

export default defaultHotkeyData;
