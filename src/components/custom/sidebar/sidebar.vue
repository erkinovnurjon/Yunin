<script setup lang="ts">
// @ts-nocheck
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Bell, Package2, Menu as MenuIcon } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import Theme from "@/components/theme/theme.vue";
import { type Menu } from "@/modules/basics";
import { menus } from "./menu.ts";
import { ref, computed } from "vue";
import Profile from "./components/profile.vue";
import { useRoute } from "vue-router";

const routes = ref<Menu[]>(menus);
const sidebarOpen = ref<any>(true);
const mobileOpen = ref<boolean>(false);
const sidebarsettimout = ref<boolean>(true);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
  setTimeout(() => {
    sidebarsettimout.value = !sidebarsettimout.value;
  }, 300);
};

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value;
};

const toggleChildren = (name: string) => {
  const route = routes.value.find((item: any) => item.name === name);
  if (route) {
    route.childrenVisible = !route.childrenVisible;
  }
};

const route = useRoute();

const isCurrentRoute = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 z-50 flex flex-col transition-all duration-1000 ease-in-out',
        mobileOpen
          ? 'left-0 transition-all duration-1000 ease-in-out'
          : '-left-72',
        'md:left-0 md:w-64 lg:w-72',
        sidebarOpen ? 'md:w-64 lg:w-72' : 'md:w-16 lg:w-20',
      ]"
    >
      <div
        class="flex h-full flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <!-- Sidebar Header -->
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <router-link to="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span v-if="sidebarsettimout && (sidebarOpen || mobileOpen)"
              >Yunin</span
            >
          </router-link>
          <Button
            variant="outline"
            size="icon"
            class="ml-auto h-8 w-8"
            v-if="sidebarsettimout && (sidebarOpen || mobileOpen)"
          >
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
          <Button
            @click="toggleMobile"
            variant="ghost"
            size="icon"
            class="md:hidden"
          >
            <MenuIcon class="h-5 w-5" />
            <span class="sr-only">Toggle mobile menu</span>
          </Button>
        </div>

        <!-- Sidebar Navigation -->
        <div
          class="flex-1 overflow-auto px-3 py-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/25"
        >
          <nav class="grid gap-1">
            <template v-for="item in routes" :key="item.name">
              <router-link
                :to="item.to"
                @click.prevent="toggleChildren(item.name)"
                :class="[
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/50',
                  isCurrentRoute(item.to)
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground',
                ]"
              >
                <component :is="item.icon" class="h-4 w-4" />
                <span v-if="sidebarsettimout && (sidebarOpen || mobileOpen)">
                  {{ item.name }}
                </span>
              </router-link>

              <!-- Sub-menu items -->
              <div
                v-if="item.childrenVisible && item.children.length > 0"
                class="ml-4 grid gap-1"
              >
                <router-link
                  v-for="child in item.children"
                  :key="child.name"
                  :to="child.to"
                  :class="[
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted/50',
                    isCurrentRoute(child.to)
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground',
                  ]"
                >
                  <component :is="child.icon" class="h-4 w-4" />
                  <span
                    v-if="sidebarsettimout && (sidebarOpen || mobileOpen)"
                    >{{ child.name }}</span
                  >
                </router-link>
              </div>
            </template>
          </nav>
        </div>

        <!-- Theme and Profile for mobile/tablet -->
        <div v-if="mobileOpen" class="md:hidden p-4 border-t">
          <div class="flex items-center justify-between">
            <Theme />
            <Profile />
          </div>
        </div>

        <!-- Upgrade Card -->
        <div
          class="p-4 transition-all hidden md:block"
          v-if="sidebarsettimout && sidebarOpen"
        >
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
    </aside>

    <!-- Main Content -->
    <div
      class="flex flex-col flex-1 w-full transition-all duration-300 ease-in-out"
      :class="[sidebarOpen ? 'md:pl-64 lg:pl-72' : 'md:pl-16 lg:pl-20']"
    >
      <header
        class="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:h-[60px] lg:px-6"
      >
        <!-- Mobile Menu Button -->
        <Button
          @click="toggleMobile"
          variant="ghost"
          size="icon"
          class="md:hidden"
        >
          <MenuIcon class="h-5 w-5" />
          <span class="sr-only">Toggle mobile menu</span>
        </Button>

        <!-- Sidebar Toggle Button - Visible on desktop -->
        <Button
          @click="toggleSidebar"
          variant="ghost"
          size="icon"
          class="hidden md:flex"
        >
          <MenuIcon class="h-5 w-5" />
          <span class="sr-only">Toggle sidebar</span>
        </Button>

        <div class="flex-1">
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
        <!-- Theme and Profile for desktop -->
        <div class="hidden md:flex gap-2">
          <Theme />
          <Profile />
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto bg-muted/50">
        <div class="container mx-auto p-4 lg:p-6">
          <div
            v-if="route.meta.pageTitle || route.meta.breadcrumbs"
            class="flex items-center space-x-2 text-sm text-muted-foreground mb-4"
          >
            <div
              v-for="(breadcrumb, index) in route.meta.breadcrumbs"
              :key="index"
              class="flex items-center"
            >
              <div v-if="!breadcrumb.disabled">
                <router-link
                  :to="breadcrumb.href"
                  class="hover:text-primary"
                  v-text="breadcrumb.title"
                />
              </div>
              <div v-else class="text-muted" v-text="breadcrumb.title"></div>
              <span
                v-if="index < route.meta.breadcrumbs.length - 1"
                class="mx-1 text-muted-foreground"
                >/</span
              >
            </div>
          </div>
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar styles */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-muted-foreground\/20 {
  scrollbar-color: rgba(var(--muted-foreground), 0.2) transparent;
}

.scrollbar-thumb-muted-foreground\/25:hover {
  scrollbar-color: rgba(var(--muted-foreground), 0.25) transparent;
}
</style>
