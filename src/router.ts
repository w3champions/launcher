import Vue from "vue";
import VueRouter, {Route} from "vue-router";
import UpdateSettingsScreen from "@/update-handling/UpdateSettingsScreen.vue";
import HotKeySetupScreen from "@/hot-keys/views/HotKeySetupScreen.vue";
import HomeScreen from "@/home/HomeScreen.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeScreen,
    },
    {
        path: "/HotKeys/:tab",
        name: "HotKeys",
        component: HotKeySetupScreen,
        props: (route: Route) => {
            return {
                tab: parseInt(route.params.tab)
            }
        }
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
