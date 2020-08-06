import Vue from "vue";
import Vuex, {ActionContext} from "vuex";
import {createDirectStore} from "direct-vuex";
import {News, RootState} from "@/store/typings";

import updateHandling from "./update-handling/index";
import {UpdateService} from "@/update-handling/UpdateService";
import {UpdateHandlingState} from "@/store/update-handling/types";
import {VersionService} from "@/VersionService";
import {NEWS_URL_PROD, NEWS_URL_TEST, UPDATE_URL_PROD, UPDATE_URL_TEST} from "@/constants";

Vue.use(Vuex);

const services = {
  updateService: new UpdateService(),
  versionService: new VersionService(),
};

const mod = {
  modules: {
    updateHandling,
  },
  state: {
    isTest: false,
    updateUrl: UPDATE_URL_PROD,
    newsUrl: NEWS_URL_PROD,
    news: [] as News[],
  } as RootState,
  actions: {
    async loadNews(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit, state } = moduleActionContext(context, mod);

      const news = await (
          await fetch(`${state.newsUrl}api/admin/news`)
      ).json();

      commit.SET_NEWS(news);
    },
    setTestMode(context: ActionContext<UpdateHandlingState, RootState>, mode: boolean) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      rootGetters.versionService.switchToMode(mode);
      commit.SET_IS_TEST(mode);
      commit.SET_UPDATE_URL(mode ? UPDATE_URL_TEST : UPDATE_URL_PROD);
      commit.SET_NEWS_URL(mode ? NEWS_URL_TEST : NEWS_URL_PROD);
    },
    loadTestMode(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const mode = rootGetters.versionService.loadMode();
      commit.SET_IS_TEST(mode);
      commit.SET_UPDATE_URL(mode ? UPDATE_URL_TEST : UPDATE_URL_PROD);
      commit.SET_NEWS_URL(mode ? NEWS_URL_TEST : NEWS_URL_PROD);
    }
  },
  mutations: {
    SET_IS_TEST(state: RootState, test: boolean) {
      state.isTest = test;
    },
    SET_UPDATE_URL(state: RootState, url: string) {
      state.updateUrl = url;
    },
    SET_NEWS_URL(state: RootState, url: string) {
      state.newsUrl = url;
    },
    SET_NEWS(state: RootState, news: News[]) {
      state.news = news;
    }
  },
  getters: {
    updateService() {
      return services.updateService;
    },
    versionService() {
      return services.versionService;
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
