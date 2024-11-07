export const InventoryOut = [
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
];
