import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
//@ts-ignore
import Home from "@/views/Home.vue";
import Login from "@/components/custom/login/login.vue";
//@ts-ignore
import Overview from "@/views/Overview.vue";
import Settings from "@/views/settings.vue";
import Analytics from "@/views/Analytics.vue";
import Reports from "@/views/Reports.vue";
import GeneralSettings from "@/views/GeneralSettings.vue";
import PrivacySettings from "@/views/PrivacySettings.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/home",
    component: () => import("@/components/custom/layout/index.vue"),
    children: [
      {
        path: "/home",
        redirect: "/",
      },
      {
        path: "/",
        component: Home,
      },
      {
        path: "/overview",
        name: "Overview",
        component: Overview,
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
        children: [
          {
            path: "general",
            name: "GeneralSettings",
            component: GeneralSettings,
          },
          {
            path: "privacy",
            name: "PrivacySettings",
            component: PrivacySettings,
          },
        ],
      },
      {
        path: "reports",
        name: "Reports",
        component: Reports,
      },
      {
        path: "analytics",
        name: "Analytics",
        component: Analytics,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 100,
      };
    }
    return { top: 0 };
  },
});

export default router;
