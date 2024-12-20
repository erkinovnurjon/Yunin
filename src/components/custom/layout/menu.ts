import { type Menu } from "@/modules/basics";
import { Home, Package, Package2 } from "lucide-vue-next";

export const menus: Menu[] = [
  {
    name: "Home",
    to: "/home",
    childrenVisible: false,
    children: [],
    icon: Home,
  },
  {
    name: "Products",
    to: "/products",
    childrenVisible: false,
    children: [],
    icon: Package2,
  },
  {
    name: "Inventory In",
    to: "/inventory-in",
    childrenVisible: false,
    children: [],
    icon: Package2,
  },
  {
    name: "Inventory Out",
    to: "/inventory-out",
    childrenVisible: false,
    children: [],
    icon: Package,
  },
  {
    name: "Financial Transaction",
    to: "/financial-transaction",
    childrenVisible: false,
    children: [],
    icon: Package,
  },
];
