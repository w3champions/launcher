import Vue from "vue";
import VueRouter from "vue-router";
import UpdateScreen from "@/update-handling/UpdateScreen.vue";
import HotKeySetupScreen from "@/hot-keys/HotKeySetupScreen.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: UpdateScreen,
    },
    {
        path: "/HotKeys",
        name: "HotKeys",
        component: HotKeySetupScreen,
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
