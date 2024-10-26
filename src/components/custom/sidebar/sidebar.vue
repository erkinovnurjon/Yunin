<template>
  <div class="w-full flex items-center">
    <navbar class="shadow-md w-full py-1 flex items-center justify-between">
      <div class="flex items-center justify-start">
        <div class="flex items-center">
          <img :src="Logo" alt="Yunin Logo" class="h-8 w-8 mr-2" />
          <h1 class="text-3xl font-bold">Yunin</h1>
        </div>
        <Button
          @click="toggleSidebar"
          class="text-gray-800 material-icons hover:bg-slate-400 animate-in transition-all bg-transparent focus:outline-none"
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
        </Button>
      </div>
      <div>Bankai</div>
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
import Button from "@/components/ui/button/Button.vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import Logo from "@/assets/images/logo/Logo.jpg";
import { menus } from "./menu.ts";

const routes = ref(menus);

const isSidebarOpen = ref(true);

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
</style>
