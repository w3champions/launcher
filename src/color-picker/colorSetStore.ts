import {moduleActionContext} from "@/globalState/vuex-store";
import {ActionContext} from "vuex";
import {UpdateHandlingState} from "@/update-handling/updateTypes";
import {ColorPickState} from "@/color-picker/updateTypes";

const mod = {
  namespaced: true,
  state: {
    isTeamColorsEnabled: false,
    ownColor: "01",
    enemyColor: "00",
    allyColor: "02",
  } as UpdateHandlingState,
  actions: {
    loadIsTeamColorsEnabled(context: ActionContext<UpdateHandlingState, ColorPickState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      commit.SET_TEAM_COLORS_ENABLED(rootGetters.fileService.loadIsTeamColorsEnabled());
    },
    loadColors(context: ActionContext<UpdateHandlingState, ColorPickState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      commit.SET_OWN_COLOR(rootGetters.fileService.loadColor("01") ?? "01");
      commit.SET_ENEMY_COLOR(rootGetters.fileService.loadColor("00") ?? "00");
      commit.SET_ALLIES_COLOR(rootGetters.fileService.loadColor("02") ?? "02");
    },
    switchOwnColor(context: ActionContext<UpdateHandlingState, ColorPickState>, newColor: string) {
      const { commit, rootGetters, rootState } = moduleActionContext(context, mod);

      if (rootState.updateHandling.isBlizzardPTRKey) {
        rootGetters.fileService.switchColor("01", newColor, rootState.updateHandling.w3Path.replace("_retail_", "_ptr_"));
      }
      else {
        rootGetters.fileService.switchColor("01", newColor, rootState.updateHandling.w3Path);
      }

      rootGetters.fileService.saveColor("01", newColor);
      commit.SET_OWN_COLOR(newColor);
    },
    switchAlliesColor(context: ActionContext<UpdateHandlingState, ColorPickState>, newColor: string) {
      const { commit, rootGetters, rootState } = moduleActionContext(context, mod);

      if (rootState.updateHandling.isBlizzardPTRKey) {
        rootGetters.fileService.switchColor("02", newColor, rootState.updateHandling.w3Path.replace("_retail_", "_ptr_"));
      }
      else {
        rootGetters.fileService.switchColor("02", newColor, rootState.updateHandling.w3Path);
      }
      rootGetters.fileService.saveColor("02", newColor);
      commit.SET_ALLIES_COLOR(newColor);
    },
    switchEnemyColor(context: ActionContext<UpdateHandlingState, ColorPickState>, newColor: string) {
      const { commit, rootGetters, rootState } = moduleActionContext(context, mod);

      if (rootState.updateHandling.isBlizzardPTRKey) {
        rootGetters.fileService.switchColor("00", newColor, rootState.updateHandling.w3Path.replace("_retail_", "_ptr_"));
      }
      else {
        rootGetters.fileService.switchColor("00", newColor, rootState.updateHandling.w3Path);
      }
      rootGetters.fileService.saveColor("00", newColor);
      commit.SET_ENEMY_COLOR(newColor);
    },
    async saveIsTeamColorsEnabled(context: ActionContext<UpdateHandlingState, ColorPickState>, enabled: boolean) {
      const {commit, rootGetters, rootState} = moduleActionContext(context, mod);

      if (!enabled) {
        rootGetters.fileService.resetTeamColorFiles(rootState.updateHandling.w3Path);

        rootGetters.fileService.saveColor("00", "00");
        rootGetters.fileService.saveColor("01", "01");
        rootGetters.fileService.saveColor("02", "02");

        commit.SET_OWN_COLOR("01");
        commit.SET_ENEMY_COLOR("00");
        commit.SET_ALLIES_COLOR("02");
      }

      await rootGetters.fileService.saveIsTeamColorsEnabled(enabled);

      commit.SET_TEAM_COLORS_ENABLED(enabled);
    }
  },
  mutations: {
    SET_TEAM_COLORS_ENABLED(state: ColorPickState, enabled: boolean) {
      state.isTeamColorsEnabled = enabled;
    },
    SET_ALLIES_COLOR(state: ColorPickState, value: string) {
      state.allyColor = value;
    },
    SET_ENEMY_COLOR(state: ColorPickState, value: string) {
      state.enemyColor = value;
    },
    SET_OWN_COLOR(state: ColorPickState, value: string) {
      state.ownColor = value;
    }
  },
} as const;

export default mod;
