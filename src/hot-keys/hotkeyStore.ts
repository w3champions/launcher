import store, {moduleActionContext} from "@/globalState/vuex-store";
import {ActionContext} from "vuex";
import {RootState} from "@/globalState/rootTypings";
import {NotInGameState} from "@/hot-keys/ItemHotkeys/HotKeyStateMachine";
import defaultHotkeyData from "@/hot-keys/RaceSpecificHotkeys/hotkeyData/defaultHotkeyData";
import {ClickCombination, HotKey, HotkeyButtonPosition, ModifierKey} from "@/hot-keys/ItemHotkeys/hotkeyState";
import {HotKeyModifierState} from "@/hot-keys/hotkeyState";
import {Ability, HotkeyMappingPerRace, RaceHotKey} from "@/hot-keys/RaceSpecificHotkeys/raceSpecificHotkeyTypes";
import { ELauncherMessageType, ingameBridge } from '@/game/ingame-bridge';
import logger from '@/logger';

const { ipcRenderer } = window.require('electron')

ipcRenderer.on('fab-dragged-forward', (wht: any, args: string) => {
  const strings = args.split("_");
  store.dispatch.hotKeys.saveHotkeyButtonPosition({x: parseInt(strings[0]), y: parseInt(strings[1])});
})

ingameBridge.on(ELauncherMessageType.START_GAME, () => {
  logger.info("User ENTERED game, turn on hotkeys");
  store.dispatch.hotKeys.enterGame();
});

ingameBridge.on(ELauncherMessageType.EXIT_GAME, () => {
  logger.info("User exited game, turn off hotkeys")
  store.dispatch.hotKeys.exitGame();
});

function setConflicts(abilities: Ability[], keyFunc: (a: Ability) => string) {
  const hotkeysCounts: {key: string, count: number}[] = []

  for (const ability of abilities) {
    let hotkeyCount = hotkeysCounts.find(x => x.key && x.key == keyFunc(ability));
    if (!hotkeyCount) {
      hotkeyCount = { key: keyFunc(ability), count: 0 };
      hotkeysCounts.push(hotkeyCount);
    }
    hotkeyCount.count++;
  }

  const conflicts = hotkeysCounts.filter(x => x.count > 1);
  const conflictingAbilities = abilities.filter(a => conflicts.find(c => keyFunc(a) == c.key));
  for (const conflictingAbility of conflictingAbilities) {
    conflictingAbility.hasConflict = true;
  }
}

function setHotkey(ability: Ability, hotKey: RaceHotKey) {
  ability.hasConflict = false;

  if (ability.hotkeyIdentifier === hotKey.hotkeyCommand) {
    ability.currentHotkey = hotKey.hotKey;

    if (ability.isUnhotkey || hotKey.unHotkey) {
      ability.unHotkey = hotKey.unHotkey;
    }
    if (ability.isResearchAbility || hotKey.researchHotkey) {
      ability.researchHotkey = hotKey.researchHotkey;
    }

    ability.currentGrid = hotKey.grid;
    ability.currentResearchGrid = hotKey.researchGrid;
    hotKey.hotkeyName = ability.name;
    hotKey.isResearchAbility = ability.isResearchAbility;
    hotKey.isUnhotkey = ability.isUnhotkey;
    hotKey.isStagedUpgrade = ability.isStagedUpgrade;
  }
}

function mergeHotkeyDataAndSelectedHotkeys(
    raceHotkeyData: HotkeyMappingPerRace[],
    hotkeysLoaded: RaceHotKey[]
) {
  const hotkeys = [...raceHotkeyData]
  hotkeysLoaded.forEach(hotKey =>
    hotkeys.forEach(h =>
      h.units.forEach(u => {
        u.abilities.forEach(a => {

          setHotkey(a, hotKey);
          // If ability opens another abilities e.g. research skills
          a.abilities.forEach(aInner => {
            setHotkey(aInner, hotKey);
          });
          setConflicts(a.abilities, (x) => x.researchHotkey);
        });

        setConflicts(u.abilities.filter(x => !x.isAura), (x) => x.currentHotkey);
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
    gridMode: false,
    isShowHotkeyIndicator: false,
    isClassicMode: false,
    toggleButton: { modifier: ModifierKey.Shift, hotKey: {key: "f4", uiDisplay: "f4"}}
  } as HotKeyModifierState,
  actions: {
    setRaceHotkey(context: ActionContext<HotKeyModifierState, RootState>, hotKey: RaceHotKey) {
      const {commit, state} = moduleActionContext(context, mod);

      const hotkeysData = mergeHotkeyDataAndSelectedHotkeys(state.raceHotkeyData, [hotKey]);

      commit.SET_RACE_HOTKEY_DATA(hotkeysData);

      const existingHotkeys = state.raceHotkeys.filter(r => r.hotkeyCommand !== hotKey.hotkeyCommand);

      commit.SET_RACE_HOTKEYS([...existingHotkeys, hotKey]);
    },
    setIsClassicIcons(context: ActionContext<HotKeyModifierState, RootState>, isClassic: boolean) {
      const {commit, rootGetters} = moduleActionContext(context, mod);

      rootGetters.updateService.saveIsClassicIcons(isClassic);
      commit.SET_IS_CLASSIC_MODE(isClassic);
    },
    loadIsClassicIcons(context: ActionContext<HotKeyModifierState, RootState>) {
      const {commit, rootGetters} = moduleActionContext(context, mod);

      const isClassic = rootGetters.updateService.loadIsClassicIcons();
      commit.SET_IS_CLASSIC_MODE(isClassic);
    },
    async saveRaceHotkeyToFile(context: ActionContext<HotKeyModifierState, RootState>) {
      const {rootGetters, state} = moduleActionContext(context, mod);

      await rootGetters.fileService.saveHotkeysToHotkeyFile(state.raceHotkeys);
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
      commit.SET_RACE_HOTKEYS(newHotkeys);
    },
    // Sets Grid or Custom based on store value
    async updateHotkeyMode(context: ActionContext<HotKeyModifierState, RootState>) {
      const {rootGetters, state } = moduleActionContext(context, mod);
      if(state.gridMode)
      {
        await rootGetters.fileService.enableGridHotkeys();
      }
      else{
        await rootGetters.fileService.enableCustomHotkeys();
      }
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
    toggleShowHotkeyIndicator(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit, rootGetters, state, dispatch } = moduleActionContext(context, mod);

      commit.TOGGLE_HOTKEY_INDICATOR(!state.isShowHotkeyIndicator);
      rootGetters.itemHotkeyService.saveShowHotkeyIndicator(state.isShowHotkeyIndicator);
      dispatch.loadHotkeyFabSettings();
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
      ipcRenderer.send('manual-hotkey', true);

      rootGetters.itemHotkeyService.enableHotKeys(state.itemHotKeys);
    },
    disbleHotKeys(context: ActionContext<HotKeyModifierState, RootState>) {
      const { rootGetters, state  } = moduleActionContext(context, mod);
      ipcRenderer.send('manual-hotkey', false);

      rootGetters.itemHotkeyService.disableHotKeys(state.itemHotKeys);
    },
    saveHotkeyButtonPosition(context: ActionContext<HotKeyModifierState, RootState>, position: HotkeyButtonPosition) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const hotKeys = rootGetters.itemHotkeyService.saveHotkeyButtonPosition(position)
      commit.SET_HOTKEYS(hotKeys);
    },
    loadHotkeyFabSettings(context: ActionContext<HotKeyModifierState, RootState>) {
      const { rootGetters, commit } = moduleActionContext(context, mod);
      const position = rootGetters.itemHotkeyService.loadHotkeyButtonPosition();
      const show = rootGetters.itemHotkeyService.loadShowHotkeyIndicator();
      commit.TOGGLE_HOTKEY_INDICATOR(show);
      if (show) {
        ipcRenderer.send('fab-options-loaded', position);
      } else {
        ipcRenderer.send('fab-disabled', position);
      }
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
    saveGridMode(context: ActionContext<HotKeyModifierState, RootState>, gm: boolean) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      rootGetters.itemHotkeyService.saveGridMode(gm)
      commit.SET_GRID_MODE(gm); //
    },
    loadGridMode(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      logger.info("HotkeySetupScreen")
      const gm = rootGetters.itemHotkeyService.loadGridMode()
      commit.SET_GRID_MODE(gm); //
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
    SET_IS_CLASSIC_MODE(state: HotKeyModifierState, isClassic: boolean) {
      state.isClassicMode = isClassic;
    },
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
    TOGGLE_HOTKEY_INDICATOR(state: HotKeyModifierState, isEnabled: boolean) {
      state.isShowHotkeyIndicator = isEnabled;
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
    SET_GRID_MODE(state: HotKeyModifierState, b: boolean) {
      state.gridMode = b;
    }
  },
} as const;

export default mod;
