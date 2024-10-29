// menu.ts
import { type Menu } from "@/modules/basics";
import { Bell, CircleUser, Home, Package } from "lucide-vue-next";

export const menus: Menu[] = [
  {
    name: "Products",
    to: "/products",
    childrenVisible: false,
    children: [],
    icon: Package,
  },
  {
    name: "Overview",
    to: "/overview",
    childrenVisible: false,
    children: [],
    icon: Home,
  },
];
