import {moduleActionContext} from "..";
import {ActionContext} from "vuex";
import {RootState} from "@/store/typings";
import {UpdateHandlingState} from "@/store/update-handling/types";

const mod = {
  namespaced: true,
  state: {
    bnetPath: "",
    w3Path: "",
    w3cVersion: "",
  } as UpdateHandlingState,
  actions: {
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
    }
  },
} as const;

export default mod;
