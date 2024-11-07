import Products from "./index.vue";
export const ProductRoutes = [
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
];
