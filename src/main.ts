import Vue from 'vue'
import App from './App.vue'
import store from './globalState/vuex-store'
import router from "./router";
import {IngameBridge} from "@/hot-keys/ItemHotkeys/IngameBridge";
import { FloWorkerService } from './flo-integration/flo-worker.service';

Vue.config.productionTip = false

new Vue({
  store: store.original,
  router,
  render: h => h(App),
}).$mount('#app')

const bridge = new IngameBridge();
console.log(bridge);

new FloWorkerService(bridge);
