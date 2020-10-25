import {HotKeyState} from "@/hot-keys/ItemHotkeys/HotKeyStateMachine";
import {HotkeyMappingPerRace} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {ClickCombination, HotKey} from "@/hot-keys/ItemHotkeys/hotkeyState";

export interface HotKeyModifierState {
  itemHotKeys: HotKey[],
  customHotkeys: HotkeyMappingPerRace[],
  hotKeyStateMachine: HotKeyState,
  toggleButton: ClickCombination,
  lastW3cPort: string,
}
