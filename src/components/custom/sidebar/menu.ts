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
    name: "InventoryIn",
    to: "/inventory-in",
    childrenVisible: false,
    children: [],
    icon: Package2,
  },
  {
    name: "Overview",
    to: "/overview",
    childrenVisible: false,
    children: [],
    icon: Package,
  },
];
