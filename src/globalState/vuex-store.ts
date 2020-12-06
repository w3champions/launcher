import Vue from "vue";
import Vuex, {ActionContext} from "vuex";
import {createDirectStore} from "direct-vuex";
import {News, RootState} from "@/globalState/rootTypings";

import updateHandling from "../update-handling/updateStore";
import colorPicker from "../color-picker/colorSetStore";
import hotKeys from "../hot-keys/hotkeyStore";
import {UpdateService} from "@/update-handling/UpdateService";
import {UpdateHandlingState} from "@/update-handling/updateTypes";
import {VersionService} from "@/globalState/VersionService";
import {
  IDENTIFICATION_URL_PROD,
  IDENTIFICATION_URL_TEST,
  NEWS_URL_PROD,
  NEWS_URL_TEST,
  UPDATE_URL_PROD,
  UPDATE_URL_TEST
} from "@/constants";
import {ItemHotkeyRegistrationService} from "@/hot-keys/ItemHotkeyRegistrationService";
import {FileService} from "@/update-handling/FileService";
import {AuthenticationService} from "@/globalState/AuthenticationService";
const { ipcRenderer } = window.require("electron");

Vue.use(Vuex);

const services = {
  updateService: new UpdateService(),
  versionService: new VersionService(),
  fileService: new FileService(),
  itemHotkeyService: new ItemHotkeyRegistrationService(),
  authService: new AuthenticationService(),
};

const mod = {
  modules: {
    updateHandling,
    hotKeys,
    colorPicker,
  },
  state: {
    isTest: false,
    updateUrl: UPDATE_URL_PROD,
    newsUrl: NEWS_URL_PROD,
    identificationUrl: IDENTIFICATION_URL_PROD,
    news: [] as News[],
    isWindows: false,
    blizzardVerifiedName: '',
    blizzardVerifiedBtag: '',
    w3cToken: ''
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
    },
    loadIsTestMode(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const mode = rootGetters.versionService.loadMode();

      commit.SET_IS_TEST(mode);
    },
    loadOsMode(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      commit.SET_OS(rootGetters.fileService.isWindows());
    },
    loadAuthToken(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      commit.SET_W3CAUTH_TOKEN(rootGetters.authService.loadAuthToken());
    },
    async authorizeWithCode(
        context: ActionContext<UpdateHandlingState, RootState>,
        code: string
    ) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const bearer = await rootGetters.authService.authorize(code);
      if (bearer) {
        commit.SET_BEARER(bearer.token);

        const profile = await rootGetters.authService.getProfile(
            bearer.token
        );

        if (profile) {
          commit.SET_PROFILE_NAME(profile.battleTag);
          commit.SET_IS_ADMIN(profile.isAdmin);
          await rootGetters.authService.saveAuthToken(bearer);
        }
      }
      else {
        ipcRenderer.send('oauth-requested');
      }
    },
    async loadProfile(
        context: ActionContext<UpdateHandlingState, RootState>
    ) {
      const { commit, rootState, rootGetters } = moduleActionContext(context, mod);

      const profile = await rootGetters.authService.getProfile(
          rootState.w3cToken
      );

      if (profile) {
        commit.SET_PROFILE_NAME(profile.name);
        commit.SET_PROFILE_BTAG(profile.battleTag);
        commit.SET_IS_ADMIN(profile.isAdmin);
      } else {
        commit.LOGOUT();
        await rootGetters.authService.deleteAuthToken();
        ipcRenderer.send('oauth-requested');
      }
    },
  },
  mutations: {
    SET_IS_TEST(state: RootState, test: boolean) {
      state.isTest = test;
      state.updateUrl = test ? UPDATE_URL_TEST : UPDATE_URL_PROD;
      state.newsUrl = test ? NEWS_URL_TEST : NEWS_URL_PROD;
      state.identificationUrl = test ? IDENTIFICATION_URL_TEST : IDENTIFICATION_URL_PROD;
    },
    SET_NEWS(state: RootState, news: News[]) {
      state.news = news;
    },
    SET_OS(state: RootState, isWindows: boolean) {
      state.isWindows = isWindows;
    },
    SET_W3CAUTH_TOKEN(state: RootState, w3cToken: string) {
      state.w3cToken = w3cToken;
    },
    SET_BEARER(state: RootState, token: string) {
      state.w3cToken = token;
    },
    SET_PROFILE_NAME(state: RootState, name: string) {
      state.blizzardVerifiedName = name;
    },
    SET_PROFILE_BTAG(state: RootState, btag: string) {
      state.blizzardVerifiedBtag = btag;
    },
    SET_IS_ADMIN(state: RootState, isAdmin: boolean) {
      state.isAdmin = isAdmin;
    },
    LOGOUT(state: RootState) {
      state.isAdmin = false;
      state.w3cToken = '';
      state.blizzardVerifiedBtag = '';
      state.blizzardVerifiedName = '';
    },
  },
  getters: {
    updateService() {
      return services.updateService;
    },
    versionService() {
      return services.versionService;
    },
    itemHotkeyService() {
      return services.itemHotkeyService;
    },
    fileService() {
      return services.fileService;
    },
    authService() {
      return services.authService;
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
