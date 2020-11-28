import Vue from 'vue'
import App from './App.vue'
import store from './globalState/vuex-store'
import router from "./router";
import {ingameBridge} from "@/ingame-bridge";
import { floWorkerService } from './flo-integration/flo-worker.service';

Vue.config.productionTip = false

new Vue({
  store: store.original,
  router,
  render: h => h(App),
}).$mount('#app')

ingameBridge.initialize();
floWorkerService.initialize();