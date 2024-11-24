<template>
  <header
    class="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm"
  >
    <!-- Sidebar Toggle Button -->
    <Button
      @click="toggleSidebar"
      variant="ghost"
      size="icon"
      :class="sidebarOpen ? 'ml-[256px]' : 'ml-[63px]'"
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

    <!-- Theme and Profile -->
    <div class="flex gap-2">
      <Theme />
      <Profile />
    </div>
  </header>
</template>
<script setup lang="ts">
import Theme from "@/components/theme/theme.vue";
import { inject } from "vue";
import Profile from "./components/profile.vue";
import Input from "@/components/ui/input/Input.vue";
import { MenuIcon, Search } from "lucide-vue-next";
import Button from "../FORM/Button.vue";
const { toggleSidebar, sidebarOpen } = inject<any>("layout");
</script>
<style lang="css" scoped>
* {
  transition: all 0.6s ease-out;
}
</style>
