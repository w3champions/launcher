import Vue from "vue";
import VueRouter, {Route} from "vue-router";
import UpdateSettingsScreen from "@/update-handling/UpdateSettingsScreen.vue";
import HotKeySetupScreen from "@/hot-keys/HotKeySetupScreen.vue";
import HomeScreen from "@/home/HomeScreen.vue";
import LoginScreen from "@/home/LoginScreen.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeScreen
    },
    {
        path: "/login",
        name: "Login",
        component: LoginScreen,
        props: (route: { query: { code: string } }) => ({ code: route.query.code }),
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
