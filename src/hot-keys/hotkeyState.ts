import {HotKeyState} from "@/hot-keys/ItemHotkeys/HotKeyStateMachine";
import {HotkeyMappingPerRace, RaceHotKey} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import {ClickCombination, HotKey} from "@/hot-keys/ItemHotkeys/hotkeyState";

export interface HotKeyModifierState {
  itemHotKeys: HotKey[],
  raceHotkeyData: HotkeyMappingPerRace[],
  raceHotkeys: RaceHotKey[],
  hotKeyStateMachine: HotKeyState,
  toggleButton: ClickCombination,
  lastW3cPort: string,
  isShowHotkeyIndicator: boolean,
}
