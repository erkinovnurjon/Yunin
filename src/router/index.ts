import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
//@ts-ignore
import Products from "@/views/Products/index.vue";
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
    path: "/",
    component: () => import("@/components/custom/layout/index.vue"),
    children: [
      {
        path: "/",
        redirect: "/products",
      },
      {
        path: "/products",
        component: Products,
      },
      {
        path: "/products/edit/:id",
        name: "ProductEdit",
        component: () => import("@/views/Products/Edit/id.vue"),
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
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
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
