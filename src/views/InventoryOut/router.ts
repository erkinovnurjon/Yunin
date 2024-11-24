export const InventoryOut = [
  {
    name: "InventoryOut",
    path: "/inventory-out",
    component: () => import("@/views/InventoryOut/index.vue"),
    meta: {
      pageTitle: "InventoryOut",
      transition: "slide-left",
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
      transition: "slide-left",
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
    path: "/inventory-out/view/:id",
    name: "InventoryOutView",
    component: () => import("@/views/InventoryOut/View/index.vue"),
    meta: {
      pageTitle: "Inventory Out View",
      transition: "slide-left",
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
          title: "Inventory Out View",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
];
