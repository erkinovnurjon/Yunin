import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
//@ts-ignore
import Home from "@/views/Home.vue";
import Login from "@/components/custom/login/login.vue";
//@ts-ignore
import Dashboard from "@/views/Dashboard.vue";
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
    meta: {
      sidebar: true,
    },
    children: [
      {
        path: "/home",
        redirect: "/",
        meta: { title: "Home", sidebar: true, icon: "home" },
      },
      {
        path: "/",
        component: Home,
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { title: "Dashboard", sidebar: true, icon: "dashboard" },
        children: [
          {
            path: "overview",
            name: "Overview",
            component: Overview,
            meta: { title: "Overview", sidebar: true, icon: "visibility" },
          },
          {
            path: "settings",
            name: "Settings",
            component: Settings,
            meta: { title: "Settings", sidebar: true, icon: "settings" },
            children: [
              {
                path: "general",
                name: "GeneralSettings",
                component: GeneralSettings,
                meta: { title: "General", sidebar: true, icon: "settings" },
              },
              {
                path: "privacy",
                name: "PrivacySettings",
                component: PrivacySettings,
                meta: { title: "Privacy", sidebar: true, icon: "privacy_tip" },
              },
            ],
          },
          {
            path: "reports",
            name: "Reports",
            component: Reports,
            meta: { title: "Reports", sidebar: true, icon: "assessment" },
          },
          {
            path: "analytics",
            name: "Analytics",
            component: Analytics,
            meta: { title: "Analytics", sidebar: true, icon: "show_chart" },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { sidebar: false },
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

export function getSidebarRoutes() {
  if (routes.length > 0) {
    let routesChild = routes[0].children;
    if (routesChild) {
      return routesChild
        .filter((route) => route.meta?.sidebar)
        .map((route) => ({
          path: route.path,
          name: route.name,
          title: route.meta?.title,
          icon: route.meta?.icon,
          children: (route.children || [])
            .filter((child) => child.meta?.sidebar)
            .map((child) => ({
              path: `${route.path}/${child.path}`,
              name: child.name,
              title: child.meta?.title,
            })),
        }));
    }
  }
  return [];
}

export default router;
