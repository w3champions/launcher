import {moduleActionContext} from "@/globalState/vuex-store";
import {ActionContext} from "vuex";
import {RootState} from "@/globalState/rootTypings";
import {UpdateHandlingState} from "@/update-handling/updateTypes";

const { remote } = window.require("electron");

const mod = {
  namespaced: true,
  state: {
    bnetPath: "",
    w3Path: "",
    mapsPath: "",
    localW3cVersion: "",
    onlineW3cVersion: "",
    localLauncherVersion: "",
    isUpdatingMaps: false,
    isUpdatingWebUI: false,
    w3PathIsInvalid: false,
    bnetPathIsInvalid: false,
    isTeamColorsEnabled: false,
    ownColor: "01",
    enemyColor: "00",
    allyColor: "02",
  } as UpdateHandlingState,
  actions: {
    loadIsTeamColorsEnabled(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      commit.SET_TEAM_COLORS_ENABLED(rootGetters.fileService.loadIsTeamColorsEnabled());
    },
    loadColors(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      commit.SET_OWN_COLOR(rootGetters.fileService.loadColor("01") ?? "01");
      commit.SET_ENEMY_COLOR(rootGetters.fileService.loadColor("00") ?? "00");
      commit.SET_ALLIES_COLOR(rootGetters.fileService.loadColor("02") ?? "02");
    },
    switchOwnColor(context: ActionContext<UpdateHandlingState, RootState>, newColor: string) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);

      rootGetters.fileService.switchColor("01", newColor, state.w3Path);
      rootGetters.fileService.saveColor("01", newColor);
      commit.SET_OWN_COLOR(newColor);
    },
    switchAlliesColor(context: ActionContext<UpdateHandlingState, RootState>, newColor: string) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);

      rootGetters.fileService.switchColor("02", newColor, state.w3Path);
      rootGetters.fileService.saveColor("02", newColor);
      commit.SET_ALLIES_COLOR(newColor);
    },
    switchEnemyColor(context: ActionContext<UpdateHandlingState, RootState>, newColor: string) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);

      rootGetters.fileService.switchColor("00", newColor, state.w3Path);
      rootGetters.fileService.saveColor("00", newColor);
      commit.SET_ENEMY_COLOR(newColor);
    },
    saveIsTeamColorsEnabled(context: ActionContext<UpdateHandlingState, RootState>, enabled: boolean) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);

      if (!enabled) {
        rootGetters.fileService.resetTeamColorFiles(state.w3Path);

        rootGetters.fileService.saveColor("00", "00");
        rootGetters.fileService.saveColor("01", "01");
        rootGetters.fileService.saveColor("02", "02");

        commit.SET_OWN_COLOR("01");
        commit.SET_ENEMY_COLOR("00");
        commit.SET_ALLIES_COLOR("02");
      }

      rootGetters.fileService.saveIsTeamColorsEnabled(enabled);

      commit.SET_TEAM_COLORS_ENABLED(enabled);
    },
    loadCurrentLauncherVersion(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      commit.SET_CURRENT_LAUNCHER_VERSION(rootGetters.updateService.loadW3CVersion());
    },
    saveLocalW3CVersion(context: ActionContext<UpdateHandlingState, RootState>, version: string) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      rootGetters.updateService.saveLocalW3CVersion(version);

      commit.SET_LOCAL_W3C_VERSION(version);
    },
    saveW3Path(context: ActionContext<UpdateHandlingState, RootState>, version: string) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      rootGetters.updateService.saveW3Path(version);

      commit.SET_W3_PATH(version);
    },
    saveMapPath(context: ActionContext<UpdateHandlingState, RootState>, version: string) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      rootGetters.updateService.saveMapPath(version);

      commit.SET_MAPS_PATH(version);
    },
    saveBnetPath(context: ActionContext<UpdateHandlingState, RootState>, version: string) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      rootGetters.updateService.saveBnetPath(version);

      commit.SET_BNET_PATH(version);
    },
    loadCurrentW3CVersion(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit } = moduleActionContext(context, mod);

      commit.SET_CURRENT_LAUNCHER_VERSION(remote.app.getVersion());
    },
    async loadOnlineW3CVersion(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit, rootState } = moduleActionContext(context, mod);

      const result = await fetch(`${rootState.updateUrl}api/client-version`);
      const version = await result.json();
      commit.SET_ONLINE_W3C_VERSION(version.version);
    },
    loadAllPaths(context: ActionContext<UpdateHandlingState, RootState>) {
      const { rootGetters, commit } = moduleActionContext(context, mod);
      commit.SET_BNET_PATH(rootGetters.updateService.loadBnetPath());
      commit.SET_MAPS_PATH(rootGetters.updateService.loadMapsPath());
      commit.SET_W3_PATH(rootGetters.updateService.loadW3Path());
      commit.SET_LOCAL_W3C_VERSION(rootGetters.updateService.loadW3CVersion());
    },
    resetPaths(context: ActionContext<UpdateHandlingState, RootState>) {
      const { rootGetters, commit } = moduleActionContext(context, mod);

      rootGetters.updateService.saveBnetPath("");
      rootGetters.updateService.saveMapPath("");
      rootGetters.updateService.saveW3Path("");
      rootGetters.updateService.saveLocalW3CVersion("");

      commit.BNET_PATH_IS_INVALID(false);
      commit.W3_PATH_IS_INVALID(false);
      commit.SET_BNET_PATH("");
      commit.SET_BNET_PATH("");
      commit.SET_MAPS_PATH("");
      commit.SET_W3_PATH("");
      commit.SET_LOCAL_W3C_VERSION("");
    },
    sudoCopyFromTo: function (context: ActionContext<UpdateHandlingState, RootState>, obj: { from: string, to: string }) {
      const {rootGetters} = moduleActionContext(context, mod);
      rootGetters.fileService.sudoCopyFromTo(obj.from, obj.to);
    }
  },
  mutations: {
    SET_TEAM_COLORS_ENABLED(state: UpdateHandlingState, enabled: boolean) {
      state.isTeamColorsEnabled = enabled;
    },
    SET_BNET_PATH(state: UpdateHandlingState, path: string) {
      state.bnetPath = path;
    },
    SET_MAPS_PATH(state: UpdateHandlingState, path: string) {
      state.mapsPath = path;
    },
    SET_W3_PATH(state: UpdateHandlingState, path: string) {
      state.w3Path = path;
    },
    SET_LOCAL_W3C_VERSION(state: UpdateHandlingState, version: string) {
      state.localW3cVersion = version;
    },
    SET_CURRENT_LAUNCHER_VERSION(state: UpdateHandlingState, version: string) {
      state.localLauncherVersion = version;
    },
    SET_ONLINE_W3C_VERSION(state: UpdateHandlingState, version: string) {
      state.onlineW3cVersion = version;
    },
    FINISH_WEBUI_DL(state: UpdateHandlingState) {
      state.isUpdatingWebUI = false;
    },
    START_DLS(state: UpdateHandlingState) {
      state.isUpdatingMaps = true;
      state.isUpdatingWebUI = true;
    },
    FINISH_DLS(state: UpdateHandlingState) {
      state.isUpdatingMaps = false;
      state.isUpdatingWebUI = false;
    },
    FINISH_MAPS_DL(state: UpdateHandlingState) {
      state.isUpdatingMaps = false;
    },
    BNET_PATH_IS_INVALID(state: UpdateHandlingState, value: boolean) {
      state.bnetPathIsInvalid = value;
    },
    W3_PATH_IS_INVALID(state: UpdateHandlingState, value: boolean) {
      state.w3PathIsInvalid = value;
    },
    SET_ALLIES_COLOR(state: UpdateHandlingState, value: string) {
      state.allyColor = value;
    },
    SET_ENEMY_COLOR(state: UpdateHandlingState, value: string) {
      state.enemyColor = value;
    },
    SET_OWN_COLOR(state: UpdateHandlingState, value: string) {
      state.ownColor = value;
    }
  },
} as const;

export default mod;
