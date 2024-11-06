<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Search, Bell, Package2 } from "lucide-vue-next";

import { Input } from "@/components/ui/input";
import Theme from "@/components/theme/theme.vue";
import { type Menu } from "@/modules/basics";
import { menus } from "./menu.ts";
import { ref, computed } from "vue";
import Profile from "./components/profile.vue";
import { useRoute } from "vue-router";

const routes = ref<Menu[]>(menus);

const sidebarOpen = ref(true);
const sidebarsettimout = ref(true);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
  setTimeout(() => {
    sidebarsettimout.value = !sidebarsettimout.value;
  }, 300);
};

const toggleChildren = (name: string) => {
  const route = routes.value.find((item: any) => item.name === name);
  if (route) {
    route.childrenVisible = !route.childrenVisible;
  }
};

// Access the current route
const route = useRoute();

// Compute breadcrumbs based on the matched route records
const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched.map((routeRecord) => ({
    name: routeRecord.name,
    path: routeRecord.path,
  }));

  // Ensure "Home" is always the first breadcrumb
  if (matchedRoutes.length === 0 || matchedRoutes[0].name !== "Home") {
    matchedRoutes.unshift({
      name: "Home",
      path: "/",
    });
  }

  console.log("Breadcrumbs:", matchedRoutes); // Konsolga chiqarish
  return matchedRoutes;
});
</script>

<template>
  <div
    class="grid h-screen w-full transition-all ease-in duration-300"
    :class="
      sidebarOpen
        ? 'md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'
        : 'md:grid-cols-[50px_1fr] lg:grid-cols-[80px_1fr]'
    "
  >
    <Button
      @click="toggleSidebar"
      :class="sidebarOpen ? 'left-64' : 'left-14'"
      class="z-10 absolute rounded-full transition-all ease-in duration-300 top-[650px]"
      size="icon"
    >
      <span class="material-icons" style="font-size: 20px">
        {{ sidebarOpen ? "chevron_left" : "chevron_right" }}
      </span>
    </Button>
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <router-link to="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span v-if="sidebarsettimout && sidebarOpen">Yunin</span>
          </router-link>
          <Button
            variant="outline"
            size="icon"
            class="ml-auto h-8 w-8"
            v-if="sidebarsettimout && sidebarOpen"
          >
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="flex-1 overflow-auto">
          <nav
            v-for="item in routes"
            :key="item.name"
            class="grid items-start px-2 text-sm font-medium lg:px-4"
          >
            <router-link
              :to="item.to"
              @click.prevent="toggleChildren(item.name)"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <component :is="item.icon" class="h-5 w-5" />
              <span v-if="sidebarsettimout && sidebarOpen">
                {{ item.name }}
              </span>
            </router-link>
            <!-- Sub-menyularni ko'rsatish -->
            <div
              v-if="item.childrenVisible && item.children.length > 0"
              class="ml-4"
            >
              <router-link
                v-for="child in item.children"
                :key="child.name"
                :to="child.to"
                class="flex items-center gap-2 rounded px-2 py-1 text-muted-foreground transition-all hover:text-primary"
              >
                <component :is="child.icon" class="h-4 w-4" />
                <span>{{ child.name }}</span>
              </router-link>
            </div>
          </nav>
        </div>
        <div class="p-4 transition-all" v-if="sidebarsettimout && sidebarOpen">
          <Card>
            <CardHeader class="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent class="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" class="w-full"> Upgrade </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <div class="flex flex-col transition-all ease-in duration-300">
      <header
        class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
      >
        <div class="w-full flex-1">
          <form>
            <div class="relative">
              <Search
                class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search products..."
                class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        <div class="flex gap-2">
          <Theme />
          <Profile />
        </div>
      </header>
      <main
        class="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#FBFBFB] dark:bg-[#161514] overflow-y-auto"
        style="height: calc(100vh - 60px)"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem
              v-for="(breadcrumb, index) in breadcrumbs"
              :key="index"
            >
              <BreadcrumbLink :href="breadcrumb.path">
                {{ breadcrumb.name }}
              </BreadcrumbLink>
              <BreadcrumbSeparator v-if="index < breadcrumbs.length - 2" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <slot></slot>
      </main>
    </div>
  </div>
</template>
