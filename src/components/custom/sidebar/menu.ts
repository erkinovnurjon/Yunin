import { type Menu } from "@/modules/basics";

import {
  Bell,
  CircleUser,
  Home,
  Package,
  Package2,
  Search,
} from "lucide-vue-next";
export const menus: Menu[] = [
  {
    name: "Products",
    to: "/products",
    childrenVisible: false,
    children: [],
    icon: "Home",
  },
  {
    name: "Overview",
    to: "/overview",
    childrenVisible: false,
    children: [],
    icon: "",
  },
];
