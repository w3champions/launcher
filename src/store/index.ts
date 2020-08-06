import Vue from "vue";
import Vuex, {ActionContext} from "vuex";
import {createDirectStore} from "direct-vuex";
import {News, RootState} from "@/store/typings";

import updateHandling from "./update-handling/index";
import {UpdateService} from "@/update-handling/updateService";
import {UpdateHandlingState} from "@/store/update-handling/types";
import {versionSwitcher} from "@/VersionSwitcher";

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
    news: [] as News[],
  } as RootState,
  actions: {
    async loadNews(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit } = moduleActionContext(context, mod);

      const news = await (
          await fetch(`${versionSwitcher.NewsUrl}api/admin/news`)
      ).json();

      commit.SET_NEWS(news);
    },
  },
  mutations: {
    SET_IS_TEST(state: RootState, test: boolean) {
      state.isTest = test;
    },
    SET_NEWS(state: RootState, news: News[]) {
      state.news = news;
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
