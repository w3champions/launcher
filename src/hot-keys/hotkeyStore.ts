import {moduleActionContext} from "@/globalState/vuex-store";
import {ActionContext} from "vuex";
import {RootState} from "@/globalState/rootTypings";
import {NotInGameState} from "@/hot-keys/ItemHotkeys/HotKeyStateMachine";
import defaultHotkeyData from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/defaultHotkeyData";
import {ClickCombination, HotKey, ModifierKey} from "@/hot-keys/ItemHotkeys/hotkeyState";
import {HotKeyModifierState} from "@/hot-keys/hotkeyState";
import {Ability, HotkeyMappingPerRace, RaceHotKey} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import logger from "@/logger";

function getDuplicateHotkeys(abilities: Ability[]) {
  const allBilitiesSorted = abilities.map(a => a.currentHotkey).sort();
  const results = [] as string[];
  for (let i = 0; i < allBilitiesSorted.length - 1; i++) {
    if (allBilitiesSorted[i + 1] == allBilitiesSorted[i]) {
      results.push(allBilitiesSorted[i]);
    }
  }
  return results;
}

function mergeHotkeyDataAndSelectedHotkeys(
    raceHotkeyData: HotkeyMappingPerRace[],
    hotkeysLoaded: RaceHotKey[]
) {
  const hotkeys = [...raceHotkeyData]
  hotkeysLoaded.forEach(hotKey =>
    hotkeys.forEach(h =>
      h.units.forEach(h => {
        h.abilities.forEach(a => {
          a.hasConflict = false;

          a.abilities.forEach(a2 => {
            a2.hasConflict = false;

            if (a2.hotkeyIdentifier === hotKey.hotkeyCommand) {
              a2.currentHotkey = hotKey.hotKey;
              if (a2.isUnhotkey && hotKey.unHotkey){
                a2.unHotkey = hotKey.unHotkey;
              }

              if (hotKey.researchHotkey){
                a2.researchHotkey = hotKey.researchHotkey;
              }

              a2.currentGrid = hotKey.grid;
            }
          })

          if (a.hotkeyIdentifier === hotKey.hotkeyCommand) {
              a.currentHotkey = hotKey.hotKey;
              if (a.isUnhotkey && hotKey.unHotkey) {
                a.unHotkey = hotKey.unHotkey;
              }

              if (hotKey.researchHotkey){
                a.researchHotkey = hotKey.researchHotkey;
              }

              a.currentGrid = hotKey.grid;
          }

          const resultsInner = getDuplicateHotkeys(a.abilities);
          a.abilities.forEach(a => {
            if (resultsInner.includes(a.currentHotkey)) {
              a.hasConflict = true;
            }
          })
        })

        const resultsOuter = getDuplicateHotkeys(h.abilities);
        h.abilities.forEach(a => {
          if (resultsOuter.includes(a.currentHotkey)) {
            a.hasConflict = true;
          }
        })
      })
    ))
  return hotkeys;
}

const mod = {
  namespaced: true,
  state: {
    itemHotKeys: [] as HotKey[],
    hotKeyStateMachine: new NotInGameState(),
    raceHotkeyData: defaultHotkeyData,
    raceHotkeys: [] as RaceHotKey[],
    lastW3cPort: "",
    toggleButton: { modifier: ModifierKey.Shift, hotKey: {key: "f4", uiDisplay: "f4"}}
  } as HotKeyModifierState,
  actions: {
    setRaceHotkey(context: ActionContext<HotKeyModifierState, RootState>, hotKey: RaceHotKey) {
      const {commit, state} = moduleActionContext(context, mod);

      const newHotkeys = [...state.raceHotkeys.filter(r =>
          r.hotkeyCommand !== hotKey.hotkeyCommand
      ), hotKey]

      const hotkeys = mergeHotkeyDataAndSelectedHotkeys(state.raceHotkeyData, newHotkeys);

      commit.SET_RACE_HOTKEY_DATA(hotkeys);
      commit.SET_RACE_HOTKEYS(newHotkeys);
    },
    async saveRaceHotkeyToFile(context: ActionContext<HotKeyModifierState, RootState>) {
      const {rootGetters, state} = moduleActionContext(context, mod);

      rootGetters.itemHotkeyService.saveRaceHotKeys(state.raceHotkeys);
      await rootGetters.fileService.saveHotkeysToHotkeyFile(state.raceHotkeys);
      await rootGetters.fileService.enableCustomHotkeys();
    },
    createBackupOfHotkeyFile(context: ActionContext<HotKeyModifierState, RootState>) {
      const {rootGetters} = moduleActionContext(context, mod);

      rootGetters.fileService.createBackupOfHotkeyFile();
    },
    async importHotkeysFromFile(context: ActionContext<HotKeyModifierState, RootState>) {
      const {rootGetters, state, commit } = moduleActionContext(context, mod);

      const newHotkeys = await rootGetters.fileService.importHotkeys();

      const hotkeys = mergeHotkeyDataAndSelectedHotkeys(state.raceHotkeyData, newHotkeys);
      commit.SET_RACE_HOTKEY_DATA(hotkeys);

      newHotkeys.forEach(hk => {
        hotkeys.forEach(h => {
          h.units.forEach(u => {
            u.abilities.forEach(a => {
              if (a.hotkeyIdentifier === hk.hotkeyCommand) {
                hk.isW3cSupportedKey = true;
                hk.hotkeyName = a.name;
              }

              a.abilities.forEach(ea => {
                if (ea.hotkeyIdentifier === hk.hotkeyCommand) {
                  hk.isW3cSupportedKey = true;
                  hk.hotkeyName = ea.name;
                }
              })
            })
          })
        })
      })

      const filter = newHotkeys.filter(n => n.isW3cSupportedKey);
      logger.info(`only put ${filter.length} into state`)
      commit.SET_RACE_HOTKEYS(filter);
      rootGetters.itemHotkeyService.saveRaceHotKeys(state.raceHotkeys);
      await rootGetters.fileService.enableCustomHotkeys();
    },
    loadRaceHotkeys(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);

      const hotkeysLoaded = rootGetters.itemHotkeyService.loadRaceHotKeys();
      const hotkeys = mergeHotkeyDataAndSelectedHotkeys(state.raceHotkeyData, hotkeysLoaded);
      commit.SET_RACE_HOTKEY_DATA(hotkeys);
      commit.SET_RACE_HOTKEYS(hotkeysLoaded);
    },
    addHotKey(context: ActionContext<HotKeyModifierState, RootState>, hotKey: HotKey) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);

      const allKeys = state.itemHotKeys.filter(h => h.key !== hotKey.key);
      const newHotKeys = [...allKeys, hotKey];
      rootGetters.itemHotkeyService.saveHotKeys(newHotKeys);
      commit.SET_HOTKEYS(newHotKeys);
    },
    toggleManualMode(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);

      commit.TOGGLE_HOTKEYS_MANUAL_MODE();
      rootGetters.itemHotkeyService.saveManualMode(state.hotKeyStateMachine.isManual());
    },
    loadManualMode(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);

      const manualMode = rootGetters.itemHotkeyService.loadManualMode();
      if (manualMode !== state.hotKeyStateMachine.isManual()) {
        commit.TOGGLE_HOTKEYS_MANUAL_MODE();
      }
    },
    removeHotKey(context: ActionContext<HotKeyModifierState, RootState>, hotKey: string) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);

      const keyToUnregister = state.itemHotKeys.filter(h => h.key === hotKey)[0];
      if (keyToUnregister) {
        rootGetters.itemHotkeyService.unregister(keyToUnregister.combo);
        const allKeys = state.itemHotKeys.filter(h => h.key !== hotKey);
        const newHotKeys = [...allKeys];
        rootGetters.itemHotkeyService.saveHotKeys(newHotKeys);
        commit.SET_HOTKEYS(newHotKeys);
      }
    },
    setToggleKey(context: ActionContext<HotKeyModifierState, RootState>, combo: ClickCombination) {
      const { rootGetters, commit, state } = moduleActionContext(context, mod);

      rootGetters.itemHotkeyService.removeToggleOnOff(state.toggleButton);
      rootGetters.itemHotkeyService.toggleOnOff(combo, () => {
        commit.TOGGLE_HOTKEYS()
      });
      commit.SET_TOGGLE_KEY(combo);
    },
      enableHotKeys(context: ActionContext<HotKeyModifierState, RootState>) {
        const { rootGetters, state } = moduleActionContext(context, mod);

        rootGetters.itemHotkeyService.enableHotKeys(state.itemHotKeys);
      },
      disbleHotKeys(context: ActionContext<HotKeyModifierState, RootState>) {
        const { rootGetters, state  } = moduleActionContext(context, mod);

        rootGetters.itemHotkeyService.disableHotKeys(state.itemHotKeys);
      },
    loadHotKeys(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const hotKeys = rootGetters.itemHotkeyService.loadHotKeys()
      commit.SET_HOTKEYS(hotKeys);
    },
    loadToggleKey(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const hotKey = rootGetters.itemHotkeyService.loadToggleKey()
      commit.SET_TOGGLE_KEY(hotKey);
    },
    saveLastW3cPort(context: ActionContext<HotKeyModifierState, RootState>, port: string) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      rootGetters.itemHotkeyService.saveLastW3cPort(port)
      commit.SET_LAST_W3C_PORT(port);
    },
    loadLastW3cPort(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const port = rootGetters.itemHotkeyService.loadLastW3cPort()
      commit.SET_LAST_W3C_PORT(port);
    },
    exitGame(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit } = moduleActionContext(context, mod);

      commit.HOTKEY_STATE_EXITED_GAME();
    },
    enterGame(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit } = moduleActionContext(context, mod);

      commit.HOTKEY_STATE_ENTER_GAME();
    }
  },
  mutations: {
    SET_RACE_HOTKEY_DATA(state: HotKeyModifierState, hotKeys: HotkeyMappingPerRace[]) {
      state.raceHotkeyData = hotKeys;
    },
    SET_RACE_HOTKEYS(state: HotKeyModifierState, hotKeys: RaceHotKey[]) {
      state.raceHotkeys = hotKeys;
    },
    SET_HOTKEYS(state: HotKeyModifierState, hotKeys: HotKey[]) {
      state.itemHotKeys = hotKeys;
    },
    TOGGLE_HOTKEYS_MANUAL_MODE(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.toggleManualMode();
    },
    TOGGLE_HOTKEYS(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.toggle();
    },
    HOTKEY_STATE_ENTER_GAME(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.enterGame();
    },
    HOTKEY_STATE_EXITED_GAME(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.exitGame();
    },
    HOTKEY_STATE_PRESS_ENTER(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.pressEnter();
    },
    HOTKEY_STATE_PRESS_ESCAPE(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.pressEscape();
    },
    HOTKEY_STATE_PRESS_F10(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.pressF10();
    },
    HOTKEY_STATE_PRESS_F12(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.pressF12();
    },
    SET_TOGGLE_KEY(state: HotKeyModifierState, combo: ClickCombination) {
      if (combo) {
        state.toggleButton = combo;
      }
    },
    SET_LAST_W3C_PORT(state: HotKeyModifierState, port: string) {
      state.lastW3cPort = port;
    }
  },
} as const;

export default mod;
