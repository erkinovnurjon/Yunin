<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-vue-next";

import { Input } from "@/components/ui/input";
import Theme from "@/components/theme/theme.vue";
import { Bell, Package2 } from "lucide-vue-next";
import { type Menu } from "@/modules/basics";
import { menus } from "./menu.ts";
import { ref } from "vue";
import Profile from "./components/profile.vue";

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
          <router-link to="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="">Yunin</span>
          </router-link>
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
              <component :is="item.icon" class="h-4 w-4" />
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
        <div class="flex gap-2">
          <Theme />
          <Profile />
        </div>
      </header>
      <main class="lex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
