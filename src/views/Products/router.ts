import { type RouteRecordRaw } from "vue-router";
export const ProductRoutes: RouteRecordRaw[] = [
  {
    name: "Products",
    path: "/products",
    component: () => import("./index.vue"),
    meta: {
      pageTitle: "Products",
      transition: "slide-left",
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
      transition: "slide-left",
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
];
