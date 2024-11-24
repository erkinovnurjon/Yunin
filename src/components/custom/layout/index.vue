<script setup lang="ts">
// @ts-nocheck
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import { provide, ref, watch } from "vue";
import type { Menu } from "@/modules/basics";
import { menus } from "./menu";
import { useRoute, RouterView } from "vue-router";

const route = useRoute();

const routes = ref<Menu[]>(menus);

const sidebarOpen = ref<boolean>(false);
const mobileOpen = ref<boolean>(false);
const isHovering = ref<boolean>(false);

const isDesktop = ref(window.innerWidth >= 1024);

const updateIsDesktop = () => {
  isDesktop.value = window.innerWidth >= 1024;
};

watch(sidebarOpen, (newValue) => {
  // Save sidebar state to localStorage
  localStorage.setItem("sidebarOpen", JSON.stringify(newValue));
});

const toggleSidebar = () => {
  if (isDesktop.value) {
    sidebarOpen.value = !sidebarOpen.value;
  } else {
    mobileOpen.value = !mobileOpen.value;
  }
};

const toggleChildren = (name: string) => {
  const route = routes.value.find((item) => item.name === name);
  if (route) {
    route.childrenVisible = !route.childrenVisible;
  }
};

const isCurrentRoute = (path: string) => route.path === path;

const handleMouseEnter = () => {
  if (isDesktop.value && !sidebarOpen.value) {
    isHovering.value = true;
  }
};

const handleMouseLeave = () => {
  if (isDesktop.value && !sidebarOpen.value) {
    isHovering.value = false;
  }
};

// Close sidebar when clicking outside on mobile/tablet
const handleOutsideClick = (event: MouseEvent) => {
  const sidebar = document.getElementById("sidebar");
  if (
    !isDesktop.value &&
    mobileOpen.value &&
    sidebar &&
    !sidebar.contains(event.target as Node)
  ) {
    mobileOpen.value = false;
  }
};

provide("layout", {
  sidebarOpen,
  mobileOpen,
  isHovering,
  isDesktop,
  routes,
  toggleSidebar,
  toggleChildren,
  isCurrentRoute,
  handleMouseEnter,
  handleMouseLeave,
  handleOutsideClick,
  updateIsDesktop,
});
const isVisible = ref(false);
</script>
<template>
  <div class="flex flex-col w-full">
    <Header />
    <Sidebar />
    <main
      :class="sidebarOpen ? 'ml-[256px]' : 'ml-[63px]'"
      class="overflow-y-auto bg-muted/50 p-4 h-screen"
    >
      <div
        v-if="route.meta.pageTitle || route.meta.breadcrumbs"
        class="flex items-center space-x-2 text-sm text-gray-600 mb-4"
      >
        <div
          v-for="(breadcrumb, index) in route.meta.breadcrumbs"
          :key="index"
          class="flex items-center"
        >
          <!-- Breadcrumb item as a link if not disabled, otherwise just text -->
          <div v-if="!breadcrumb.disabled">
            <router-link
              :to="breadcrumb.href"
              class="hover:text-blue-600"
              v-text="breadcrumb.title"
            />
          </div>
          <div v-else class="text-gray-400" v-text="breadcrumb.title"></div>
          <!-- Separator, not displayed after the last breadcrumb -->
          <span class="mx-1 text-gray-400">/</span>
        </div>
      </div>
      <router-view v-slot="{ Component, route }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
