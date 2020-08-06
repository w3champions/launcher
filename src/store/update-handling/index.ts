import {moduleActionContext} from "..";
import {ActionContext} from "vuex";
import {RootState} from "@/store/typings";
import {UpdateHandlingState} from "@/store/update-handling/types";
import {versionSwitcher} from "@/VersionSwitcher";

const { remote } = window.require("electron");

const mod = {
  namespaced: true,
  state: {
    bnetPath: "",
    w3Path: "",
    w3cVersion: "",
    onlineW3cVersion: "",
    currentW3cVersion: "",
    onlineLauncherVersion: "",
    currentLauncherVersion: "",
  } as UpdateHandlingState,
  actions: {
    async loadOnlineLauncherVersion(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit } = moduleActionContext(context, mod);

      const version = await (
          await fetch(`${versionSwitcher.UpdateUrl}api/launcher-version`)
      ).json();

      commit.SET_ONLINE_LAUNCHER_VERSION(version.version);
    },
    loadCurrentLauncherVersion(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit } = moduleActionContext(context, mod);

      commit.SET_CURRENT_LAUNCHER_VERSION(remote.app.getVersion());
    },
    async loadOnlineW3CVersion(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit } = moduleActionContext(context, mod);

      const version = await (
          await fetch(`${versionSwitcher.UpdateUrl}api/launcher-version`)
      ).json();

      commit.SET_ONLINE_LAUNCHER_VERSION(version.version);
    },
    loadAllPaths(context: ActionContext<UpdateHandlingState, RootState>) {
      const { rootGetters, commit } = moduleActionContext(context, mod);
      commit.SET_BNET_PATH(rootGetters.updateService.loadBnetPath());
      commit.SET_MAPS_PATH(rootGetters.updateService.loadMapsPath());
      commit.SET_W3_PATH(rootGetters.updateService.loadW3Path());
      commit.SET_W3C_VERSION(rootGetters.updateService.loadW3CVersion());
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
    SET_W3C_VERSION(state: UpdateHandlingState, version: string) {
      state.w3cVersion = version;
    },
    RESET_PATHS(state: UpdateHandlingState) {
      state.bnetPath = ""
      state.mapsPath = ""
      state.w3Path = ""
      state.w3cVersion = ""
    },
    SET_ONLINE_LAUNCHER_VERSION(state: UpdateHandlingState, version: string) {
      state.onlineLauncherVersion = version;
    },
    SET_CURRENT_LAUNCHER_VERSION(state: UpdateHandlingState, version: string) {
      state.currentLauncherVersion = version;
    },
    SET_ONLINE_W3C_VERSION(state: UpdateHandlingState, version: string) {
      state.onlineW3cVersion = version;
    }
  },
} as const;

export default mod;