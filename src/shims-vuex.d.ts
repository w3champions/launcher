import { Store } from 'src/globalState/vuex-store';
import VueRouter from 'vue-router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
    $router: VueRouter;
  }
}