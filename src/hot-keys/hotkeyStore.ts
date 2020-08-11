import {moduleActionContext} from "@/globalState/vuex-store";
import {ActionContext} from "vuex";
import {RootState} from "@/globalState/rootTypings";
import {ClickCombination, HotKey, HotKeyModifierState, ModifierKey} from "@/hot-keys/hotkeyTypes";
import {NotInGameState} from "@/hot-keys/HotKeyStateMachine";

const mod = {
  namespaced: true,
  state: {
    hotKeys: [] as HotKey[],
    hotKeyStateMachine: new NotInGameState(),
    lastW3cPort: "",
    toggleButton: { modifier: ModifierKey.CommandOrControl, hotKey: "f4" }
  } as HotKeyModifierState,
  actions: {
    addHotKey(context: ActionContext<HotKeyModifierState, RootState>, hotKey: HotKey) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);
      const allKeys = state.hotKeys.filter(h => h.key !== hotKey.key);
      const newHotKeys = [...allKeys, hotKey];
      rootGetters.itemHotkeyService.saveHotKeys(newHotKeys);
      commit.SET_HOTKEYS(newHotKeys);
    },
    removeHotKey(context: ActionContext<HotKeyModifierState, RootState>, hotKey: string) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);

      const keyToUnregister = state.hotKeys.filter(h => h.key === hotKey)[0];
      if (keyToUnregister) {
        rootGetters.itemHotkeyService.unregister(keyToUnregister.combo);
        const allKeys = state.hotKeys.filter(h => h.key !== hotKey);
        const newHotKeys = [...allKeys];
        rootGetters.itemHotkeyService.saveHotKeys(newHotKeys);
        commit.SET_HOTKEYS(newHotKeys);
      }
    },
    setToggleKey(context: ActionContext<HotKeyModifierState, RootState>, combo: ClickCombination) {
      const { rootGetters, commit, state } = moduleActionContext(context, mod);

      rootGetters.itemHotkeyService.removeToggleOnOff(state.toggleButton);
      rootGetters.itemHotkeyService.toggleOnOff(combo);
      commit.SET_TOGGLE_KEY(combo);
    },
    enableHotKeys(context: ActionContext<HotKeyModifierState, RootState>) {
      const { rootGetters } = moduleActionContext(context, mod);
      rootGetters.itemHotkeyService.enableHotKeys();
    },
    disbleHotKeys(context: ActionContext<HotKeyModifierState, RootState>) {
      const { rootGetters } = moduleActionContext(context, mod);
      rootGetters.itemHotkeyService.disableHotKeys();
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
      const { commit, dispatch } = moduleActionContext(context, mod);

      commit.HOTKEY_STATE_EXITED_GAME();
      dispatch.disbleHotKeys();
    },
    enterGame(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit, dispatch } = moduleActionContext(context, mod);

      commit.HOTKEY_STATE_INGAME();
      dispatch.enableHotKeys();
    }
  },
  mutations: {
    SET_HOTKEYS(state: HotKeyModifierState, hotKeys: HotKey[]) {
      state.hotKeys = hotKeys;
    },
    TOGGLE_HOTKEYS(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.toggle();
    },
    HOTKEY_STATE_INGAME(state: HotKeyModifierState) {
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
