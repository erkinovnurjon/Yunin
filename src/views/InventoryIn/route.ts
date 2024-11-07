export const InventoryIn = [
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
];
