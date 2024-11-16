export const FinancialTransaction = [
  {
    name: "FinancialTransaction",
    path: "/financial-transaction",
    component: () => import("@/views/FinancialTransaction/index.vue"),
    meta: {
      pageTitle: "FinancialTransaction",
      breadcrumbs: [
        {
          title: "Home",
          disabled: false,
          href: "/home",
        },
        {
          title: "Financial Transaction",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/financial-transaction/edit/:id",
    name: "FinancialTransactionEdit",
    component: () => import("@/views/FinancialTransaction/Edit/index.vue"),
    meta: {
      pageTitle: "Financial Transaction Edit",
      breadcrumbs: [
        {
          title: "Home",
          disabled: false,
          href: "/home",
        },
        {
          title: "Financial Transaction",
          disabled: false,
          href: "/financial-transaction",
        },
        {
          title: "Financial Transaction Edit",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/financial-transaction/view/:id",
    name: "FinancialTransactionView",
    component: () => import("@/views/FinancialTransaction/View/index.vue"),
    meta: {
      pageTitle: "Financial Transaction View",
      breadcrumbs: [
        {
          title: "Home",
          disabled: false,
          href: "/home",
        },
        {
          title: "Financial Transaction",
          disabled: false,
          href: "/financial-transaction",
        },
        {
          title: "Financial Transaction View",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
];
