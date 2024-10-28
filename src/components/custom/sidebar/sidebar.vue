<!-- <template>
  <div class="w-full flex items-center">
    <navbar class="shadow-md w-full py-1 flex items-center justify-between">
      <div class="flex relative items-center justify-start">
        <div class="flex items-center">
          <img :src="Logo" alt="Yunin Logo" class="h-8 w-8 mr-2" />
          <h1 class="text-3xl font-bold">Yunin</h1>
        </div>
        <div
          @click="toggleSidebar"
          class="text-gray-800 absolute material-icons left-60 top-10 bg-slate-400 animate-in transition-all bg-transparent focus:outline-none"
        >
          <Icon
            icon="radix-icons:moon"
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Icon
            icon="radix-icons:sun"
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="material-icons" style="font-size: 28px">
            {{ isSidebarOpen ? "chevron_left" : "chevron_right" }}
          </span>
        </div>
      </div>
      <div><Theme /></div>
    </navbar>
  </div>
  <div class="flex">
    <aside
      :class="[
        'bg-white shadow-md relative h-screen p-6 transition-all duration-300',
        isSidebarOpen ? 'w-64' : 'w-20',
      ]"
    >
      <ul class="space-y-4">
        <li v-for="item in routes" :key="item.name">
          <div class="flex items-center justify-between">
            <router-link
              :to="item.to"
              @click.prevent="toggleChildren(item.name)"
              class="flex items-center text-gray-800 hover:text-blue-500"
            >
              <span class="material-icons">{{ item.icon }}</span>
              <span v-if="isSidebarOpen" class="ml-2">{{ item.name }}</span>
            </router-link>
            <span
              v-if="item.children && item.children.length && isSidebarOpen"
              @click.prevent="toggleChildren(item.name)"
              class="material-icons text-gray-800 bg-transparent focus:outline-none cursor-pointer"
            >
              {{ item.childrenVisible ? "expand_less" : "expand_more" }}
            </span>
          </div>
          <ul
            v-if="item.childrenVisible && isSidebarOpen"
            class="ml-6 space-y-2 mt-2"
          >
            <li v-for="child in item.children" :key="child.name">
              <router-link
                :to="child.to"
                class="text-gray-600 hover:text-blue-500"
              >
                {{ child.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
    <main class="flex-1 p-6">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Logo from "@/assets/images/logo/Logo.jpg";
import { menus } from "./menu.ts";
import { type Menu } from "@/modules/basics";
import Theme from "@/components/theme/theme.vue";

const routes = ref<Menu[]>(menus);
const isSidebarOpen = ref<boolean>(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleChildren = (name: string) => {
  const route = routes.value.find((item: any) => item.name === name);
  if (route) {
    route.childrenVisible = !route.childrenVisible;
  }
};
</script>

<style scoped>
.transition-all {
  transition-property: all;
}
</style> -->

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Theme from "@/components/theme/theme.vue";

import { type Menu } from "@/modules/basics";
import { menus } from "./menu.ts";
import { ref } from "vue";

const routes = ref<Menu[]>(menus);

const toggleChildren = (name: string) => {
  const route = routes.value.find((item: any) => item.name === name);
  if (route) {
    route.childrenVisible = !route.childrenVisible;
  }
};
</script>

<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="">Yunin</span>
          </a>
          <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="flex-1">
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
              <Home class="h-4 w-4" />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
        <div class="mt-auto p-4">
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
    <div class="flex flex-col">
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
        <div>
          <Theme />
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="icon" class="rounded-full">
                <CircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main class="lex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
