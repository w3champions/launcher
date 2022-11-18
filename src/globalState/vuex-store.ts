import Vue from "vue";
import Vuex, {ActionContext} from "vuex";
import {createDirectStore} from "direct-vuex";
import {LoginGW, News, RootState, W3cToken} from "@/globalState/rootTypings";

import updateHandling from "../update-handling/updateStore";
import colorPicker from "../color-picker/colorSetStore";
import hotKeys from "../hot-keys/hotkeyStore";
import {UpdateService} from "@/update-handling/UpdateService";
import {UpdateHandlingState} from "@/update-handling/updateTypes";
import {VersionService} from "@/globalState/VersionService";
import {
  OAUTH_ENABLED,
} from "@/constants";
import {ItemHotkeyRegistrationService} from "@/hot-keys/ItemHotkeyRegistrationService";
import {FileService} from "@/update-handling/FileService";
import {AuthenticationService} from "@/globalState/AuthenticationService";
import logger from "@/logger";
import { ICurrentGameInfo, IFloWorkerEvent, IGameSlotClientStatusUpdate, IGameStatusUpdate, IPlayerSession, IPlayerSessionUpdate } from "@/flo-integration/flo-worker-messages";
import type { IEndpoint } from "@/background-thread/endpoint/endpoint.service";

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
    selectedEndpoint: null,
    news: [] as News[],
    newsLoading: false,
    w3cToken: null,
    selectedLoginGateway: LoginGW.none,
    floStatus: null,
  } as RootState,
  actions: {
    async init(context: ActionContext<unknown, RootState>, selectedEndpoint: IEndpoint) {
      const { commit } = moduleActionContext(context, mod);
      try {
        ipcRenderer.invoke('w3c-check-for-update', selectedEndpoint);
        commit.SET_ENDPOINT(selectedEndpoint);
      } catch (e) {
        logger.error(e);
      }
    },
    async loadNews(context: ActionContext<UpdateHandlingState, RootState>) {
      const { commit, state } = moduleActionContext(context, mod);

      commit.SET_NEWS_LOADING(true)

      try {
        const news = await (
            await fetch(`${state.selectedEndpoint?.newsUrl}api/admin/news`)
        ).json();

        commit.SET_NEWS(news);
      } catch (e) {
        commit.SET_NEWS([]);
        logger.error(e);
      }

      commit.SET_NEWS_LOADING(false)
    },
    async setTestMode(context: ActionContext<UpdateHandlingState, RootState>, mode: boolean) {
      const { commit, rootGetters, dispatch, state } = moduleActionContext(context, mod);

      rootGetters.versionService.switchToMode(mode);
      commit.SET_IS_TEST(mode);
      ipcRenderer.invoke('w3c-select-endpoint', mode);
      dispatch.resetAuthentication();
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

      const token = rootGetters.authService.loadAuthToken();
      const userInfo = rootGetters.authService.getUserInfo(token?.jwt ?? '')
      if (userInfo) {
        logger.info(`logged in as ${userInfo.battleTag}`)
        commit.SET_W3CAUTH_TOKEN(userInfo);
      }
    },
    async authorizeWithCode(
        context: ActionContext<UpdateHandlingState, RootState>,
        code: string
    ) {
      const { commit, rootGetters, dispatch, state } = moduleActionContext(context, mod);

      const token = await rootGetters.authService.authorize(code, state.selectedLoginGateway);
      if (token) {
        logger.info(`logged in as ${token.battleTag}`)
        commit.SET_W3CAUTH_TOKEN(token);
        await rootGetters.authService.saveAuthToken(token);
      }
      else {
        dispatch.resetAuthentication();
      }
    },
    setLoginGateway(
        context: ActionContext<UpdateHandlingState, RootState>,
        selectdGateway: LoginGW
    ) {
      const { commit } = moduleActionContext(context, mod);

      commit.SET_LOGIN_GW(selectdGateway);
    },
    resetAuthentication(
        context: ActionContext<UpdateHandlingState, RootState>,
        requestRelogin: boolean = true
    ) {
      const { commit, rootGetters, state } = moduleActionContext(context, mod);
      logger.info("reset auth token")

      commit.LOGOUT();
      rootGetters.authService.deleteAuthToken();
      if (requestRelogin && OAUTH_ENABLED) {
        ipcRenderer.send('oauth-requested', state.selectedLoginGateway);
      }
    },
    updateFloStatus(context: ActionContext<unknown, RootState>, msg: IFloWorkerEvent) {
      const { commit } = moduleActionContext(context, mod);
      commit.UPDATE_CURRENT_STATUS(msg);
    },
  },
  mutations: {
    SET_IS_TEST(state: RootState, test: boolean) {
      state.isTest = test;
    },
    SET_NEWS(state: RootState, news: News[]) {
      state.news = news;
    },
    SET_NEWS_LOADING(state: RootState, value: boolean) {
      state.newsLoading = value;
    },
    SET_OS(state: RootState, isWindows: boolean) {
      state.isWindows = isWindows;
    },
    SET_W3CAUTH_TOKEN(state: RootState, w3cToken: W3cToken | null) {
      state.w3cToken = w3cToken;
    },
    SET_LOGIN_GW(state: RootState, loginGateway: LoginGW) {
      state.selectedLoginGateway = loginGateway;
    },
    LOGOUT(state: RootState) {
      state.w3cToken = null;
    },
    UPDATE_CURRENT_STATUS(state: RootState, msg: IFloWorkerEvent) {
      switch (msg.type) {
        case 'PlayerSession': {
          const typed = msg as IPlayerSession
          state.floStatus = {
            ...(state.floStatus ? state.floStatus : {
              game: null,
              player_slot_status_map: {}
            }),
            player_id: typed.player?.id,
            name: typed.player?.name,
          }
          break
        }
        case 'PlayerSessionUpdate': {
          const typed = msg as IPlayerSessionUpdate
          if (!typed.game_id) {
            if (state.floStatus) {
              // state.floStatus.game = null
            }
          }
          break
        }
        case 'CurrentGameInfo': {
          if (state.floStatus) {
            state.floStatus.game = msg as ICurrentGameInfo
          }
          break
        }
        case 'GameStatusUpdate': {
          if (state.floStatus) {
            const typed = msg as IGameStatusUpdate
            if (typed.game_id === state.floStatus.game?.id) {
              state.floStatus.game.status = typed.status;
              for (const [player_id, status] of Object.entries(typed.updated_player_game_client_status_map)) {
                const slot = state.floStatus.game.slots.find(s => String(s.player?.id) === player_id)
                if (slot) {
                  slot.client_status = status
                }
              }
            }
          }
          break
        }
        case 'GameSlotClientStatusUpdate': {
          if (state.floStatus) {
            const typed = msg as IGameSlotClientStatusUpdate;
            if (typed.game_id === state.floStatus.game?.id) {
              state.floStatus.game.status = typed.status;
              const slot = state.floStatus.game.slots.find(s => s.player?.id === typed.player_id)
              if (slot) {
                slot.client_status = typed.status
              }
            }
          }
          break
        }
      }
    },
    SET_ENDPOINT(state: RootState, selected: IEndpoint) {
      state.selectedEndpoint = selected
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
    selectedEndpoint(state: RootState) {
      if (!state.selectedEndpoint) {
        throw new Error(`Endpoint not selected`)
      }
      return state.selectedEndpoint
    }
  },
} as const;

const { store, rootActionContext, moduleActionContext } = createDirectStore(
  mod
);

store.getters.fileService.initialize(store);

export default store;

export { rootActionContext, moduleActionContext };

export type AppStore = typeof store;

declare module "vuex" {
  interface Store<S> {
    direct: AppStore;
  }
}
