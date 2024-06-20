
import UpdateSettingsScreen from "@/update-handling/UpdateSettingsScreen.vue";
import HotKeySetupScreen from "@/hot-keys/HotKeySetupScreen.vue";
import HomeScreen from "@/home/HomeScreen.vue";
import StatusScreen from "@/status/StatusScreen.vue";
import { createRouter } from "vue-router";
import { createMemoryHistory } from "vue-router";

const routes: any[] = [ // any[] for jest... I don't like this
    {
        path: "/",
        name: "Home",
        component: HomeScreen
    },
    {
        path: "/HotKeys/:tab",
        name: "HotKeys",
        component: HotKeySetupScreen,
        props: (route: any) => {
            return {
                tab: parseInt(route.params.tab)
            }
        }
    },
    {
        path: "/Status",
        name: "Status",
        component: StatusScreen,
    },
    {
        path: "/Settings",
        name: "Settings",
        component: UpdateSettingsScreen,
    }
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

router.replace('/');

export default router;
