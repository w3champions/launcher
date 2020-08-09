import {moduleActionContext} from "@/globalState/vuex-store";
import {ActionContext} from "vuex";
import {RootState} from "@/globalState/rootTypings";
import {HotKey, HotKeyModifierState, ModifierKey} from "@/hot-keys/hotkeyTypes";
import {NotInGameState} from "@/hot-keys/HotKeyStateMachine";

const mod = {
  namespaced: true,
  state: {
    hotKeys: [] as HotKey[],
    hotKeyStateMachine: new NotInGameState(),
    lastW3cPort: ""
  } as HotKeyModifierState,
  actions: {
    async addHotkey(context: ActionContext<HotKeyModifierState, RootState>, hotKey: HotKey) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);
      commit.ADD_HOTKEY(hotKey);
      rootGetters.itemHotkeyService.saveHotKeys(state.hotKeys);
    },
    async loadHotKeys(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const hotKeys = rootGetters.itemHotkeyService.loadHotKeys()
      commit.SET_HOTKEYS(hotKeys);
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
    async exitGame(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit } = moduleActionContext(context, mod);

      commit.HOTKEY_STATE_EXITED_GAME();
    },
    async enterGame(context: ActionContext<HotKeyModifierState, RootState>) {
      const { commit } = moduleActionContext(context, mod);

      commit.HOTKEY_STATE_INGAME();
    },
    async setHotkeys(context: ActionContext<HotKeyModifierState, RootState>) {
      const { rootGetters } = moduleActionContext(context, mod);

      rootGetters.itemHotkeyService.itemTopLeft({ modifier: ModifierKey.None, hotKey: "q" })
      rootGetters.itemHotkeyService.itemMiddleLeft({ modifier: ModifierKey.None, hotKey: "a" })
      rootGetters.itemHotkeyService.itemBottomLeft({ modifier: ModifierKey.None, hotKey: "z" })
      rootGetters.itemHotkeyService.itemTopRight({ modifier: ModifierKey.None, hotKey: "w" })
      rootGetters.itemHotkeyService.itemMiddleRight({ modifier: ModifierKey.None, hotKey: "s" })
      rootGetters.itemHotkeyService.itemBottomRight({ modifier: ModifierKey.None, hotKey: "x" })

      rootGetters.itemHotkeyService.f1({ modifier: ModifierKey.None, hotKey: "h" })
      rootGetters.itemHotkeyService.f2({ modifier: ModifierKey.None, hotKey: "j" })
      rootGetters.itemHotkeyService.f3({ modifier: ModifierKey.None, hotKey: "k" })

      rootGetters.itemHotkeyService.space({ modifier: ModifierKey.None, hotKey: "u" })
    }
  },
  mutations: {
    ADD_HOTKEY(state: HotKeyModifierState, hotKey: HotKey) {
      const allKeys = state.hotKeys.filter(h => h.key !== hotKey.key);
      state.hotKeys = [...allKeys, hotKey];
    },
    SET_HOTKEYS(state: HotKeyModifierState, hotKeys: HotKey[]) {
      state.hotKeys = hotKeys;
    },
    RESET_HOTKEY_STATE(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.reset();
    },
    HOTKEY_STATE_INGAME(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.enterGame();
    },
    HOTKEY_STATE_EXITED_GAME(state: HotKeyModifierState) {
      state.hotKeyStateMachine = state.hotKeyStateMachine.exitGame();
    },
    SET_LAST_W3C_PORT(state: HotKeyModifierState, port: string) {
      state.lastW3cPort = port;
    }
  },
} as const;

export default mod;
