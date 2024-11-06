import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Products from "@/views/Products/index.vue";
import Login from "@/components/custom/login/login.vue";
import Settings from "@/views/settings.vue";
import Home from "@/views/home.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/components/custom/layout/index.vue"),
    children: [
      {
        name: "Home",
        path: "/home",
        component: Home,
      },
      {
        name: "Products",
        path: "/products",
        component: Products,
        meta: {
          pageTitle: "Products",
          breadcrumbs: [
            {
              title: "Home",
              disabled: false,
              href: "/home",
            },
            {
              title: "Products",
              disabled: true,
              href: "#",
            },
          ],
        },
      },
      {
        path: "/products/edit/:id",
        name: "ProductEdit",
        component: () => import("@/views/Products/Edit/id.vue"),
        meta: {
          pageTitle: "Product Edit",
          breadcrumbs: [
            {
              title: "Home",
              disabled: false,
              href: "/home",
            },
            {
              title: "Products",
              disabled: false,
              href: "/products",
            },
            {
              title: "Product Edit",
              disabled: true,
              href: "#",
            },
          ],
        },
      },
      {
        name: "InventoryIn",
        path: "/inventory-in",
        component: () => import("@/views/InventoryIn/index.vue"),
        meta: {
          pageTitle: "InventoryIn",
          breadcrumbs: [
            {
              title: "Home",
              disabled: false,
              href: "/home",
            },
            {
              title: "Inventory In",
              disabled: true,
              href: "#",
            },
          ],
        },
      },
      {
        path: "/inventory-in/edit/:id",
        name: "InventoryInEdit",
        component: () => import("@/views/InventoryIn/Edit/index.vue"),
        meta: {
          pageTitle: "Inventory In Edit",
          breadcrumbs: [
            {
              title: "Home",
              disabled: false,
              href: "/home",
            },
            {
              title: "Inventory In",
              disabled: false,
              href: "/inventory-in",
            },
            {
              title: "Inventory In Edit",
              disabled: true,
              href: "#",
            },
          ],
        },
      },
      {
        name: "InventoryOut",
        path: "/inventory-out",
        component: () => import("@/views/InventoryOut/index.vue"),
        meta: {
          pageTitle: "InventoryOut",
          breadcrumbs: [
            {
              title: "Home",
              disabled: false,
              href: "/home",
            },
            {
              title: "Inventory Out",
              disabled: true,
              href: "#",
            },
          ],
        },
      },
      {
        path: "/inventory-out/edit/:id",
        name: "InventoryOutEdit",
        component: () => import("@/views/InventoryOut/Edit/index.vue"),
        meta: {
          pageTitle: "Inventory Out Edit",
          breadcrumbs: [
            {
              title: "Home",
              disabled: false,
              href: "/home",
            },
            {
              title: "Inventory Out",
              disabled: false,
              href: "/inventory-out",
            },
            {
              title: "Inventory Out Edit",
              disabled: true,
              href: "#",
            },
          ],
        },
      },
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
