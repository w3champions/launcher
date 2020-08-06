import Vue from "vue";
import Vuex from "vuex";
import {createDirectStore} from "direct-vuex";
import {RootState} from "@/store/typings";

import updateHandling from "./update-handling/index";
import {UpdateService} from "@/update-handling/updateService";
import {UpdateHandlingState} from "@/store/update-handling/types";

Vue.use(Vuex);

const services = {
  updateService: new UpdateService(),
};

const mod = {
  modules: {
    updateHandling,
  },
  state: {
    isTest: false,
  } as RootState,
  actions: {},
  mutations: {
      SET_IS_TEST(state: RootState, test: boolean) {
        state.isTest = test;
      }
  },
  getters: {
    updateService() {
      return services.updateService;
    },
  },
} as const;

const { store, rootActionContext, moduleActionContext } = createDirectStore(
  mod
);

export default store;

export { rootActionContext, moduleActionContext };

export type AppStore = typeof store;

declare module "vuex" {
  interface Store<S> {
    direct: AppStore;
  }
}
