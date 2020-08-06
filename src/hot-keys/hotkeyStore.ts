import {moduleActionContext} from "../globalState/vuex-store";
import {ActionContext} from "vuex";
import {RootState} from "@/globalState/rootTypings";
import {HotKey, HotKeyModifierState} from "@/hot-keys/hotkeyTypes";

const mod = {
  namespaced: true,
  state: {
    hotKeys: [] as HotKey[]
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
    }
  },
  mutations: {
    ADD_HOTKEY(state: HotKeyModifierState, hotKey: HotKey) {
      const allKeys = state.hotKeys.filter(h => h.key !== hotKey.key);
      state.hotKeys = [...allKeys, hotKey];
    },
    SET_HOTKEYS(state: HotKeyModifierState, hotKeys: HotKey[]) {
      state.hotKeys = hotKeys;
    }
  },
} as const;

export default mod;
