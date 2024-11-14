import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Login from "@/components/custom/login/login.vue";
import Settings from "@/views/settings.vue";
import { ProductRoutes } from "@/views/Products/router";
import { InventoryOut } from "@/views/InventoryOut/route";
import { InventoryIn } from "@/views/InventoryIn/route";
import { FinancialTransaction } from "@/views/FinancialTransaction/route";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/components/custom/layout/index.vue"),
    children: [
      {
        name: "Home",
        path: "/home",
        component: () => import("@/views/home.vue"),
      },
      ...ProductRoutes,
      ...InventoryIn,
      ...InventoryOut,
      ...FinancialTransaction,
      {
        path: "settings",
        name: "Settings",
        component: Settings,
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
