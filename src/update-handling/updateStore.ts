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
    onlineLauncherVersion: "",
    localLauncherVersion: "",
    isUpdatingMaps: false,
    isUpdatingWebUI: false,
  } as UpdateHandlingState,
  actions: {
    async loadOnlineLauncherVersion(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit, rootState } = moduleActionContext(context, mod);

      const version = await (
          await fetch(`${rootState.updateUrl}api/launcher-version`)
      ).json();

      commit.SET_ONLINE_LAUNCHER_VERSION(version.version);
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

      const version = await (
          await fetch(`${rootState.updateUrl}api/client-version`)
      ).json();

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

      commit.SET_BNET_PATH("");
      commit.SET_MAPS_PATH("");
      commit.SET_W3_PATH("");
      commit.SET_LOCAL_W3C_VERSION("");
    }
  },
  mutations: {
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
    SET_ONLINE_LAUNCHER_VERSION(state: UpdateHandlingState, version: string) {
      state.onlineLauncherVersion = version;
    },
    SET_CURRENT_LAUNCHER_VERSION(state: UpdateHandlingState, version: string) {
      state.localLauncherVersion = version;
    },
    SET_ONLINE_W3C_VERSION(state: UpdateHandlingState, version: string) {
      state.onlineW3cVersion = version;
    },
    START_WEBUI_DL(state: UpdateHandlingState) {
      state.isUpdatingWebUI = true;
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
    }
  },
} as const;

export default mod;
