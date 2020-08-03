import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

export const BASE_UPDATE_URL = process.env.IS_TEST
    ? "https://update-service.test.w3champions.com/"
    : "https://update-service.prod.test.w3champions.com/";

export const BASE_NEWS_URL = process.env.IS_TEST
    ? "https://statistic-service-test.w3champions.com/"
    : "https://statistic-service.w3champions.com/";

new Vue({
  render: h => h(App),
}).$mount('#app')
