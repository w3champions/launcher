import Vue from 'vue'
import App from './App.vue'
import store from './globalState/vuex-store'
import {IngameBridge} from "@/hot-keys/IngameBridge";

Vue.config.productionTip = false

new Vue({
  store: store.original,
  render: h => h(App),
}).$mount('#app')

const bridge = new IngameBridge();
console.log(bridge);
