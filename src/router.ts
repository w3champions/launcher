import Vue from "vue";
import VueRouter from "vue-router";
import UpdateSettingsScreen from "@/update-handling/UpdateSettingsScreen.vue";
import HotKeySetupScreen from "@/hot-keys/HotKeySetupScreen.vue";
import HomeScreen from "@/home/HomeScreen.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeScreen,
    },
    {
        path: "/HotKeys",
        name: "HotKeys",
        component: HotKeySetupScreen,
    },
    {
        path: "/Settings",
        name: "Settings",
        component: UpdateSettingsScreen,
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

router.replace('/');

export default router;
