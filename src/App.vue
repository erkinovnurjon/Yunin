<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
//@ts-ignore
import Sidebar from "./components/custom/sidebar/sidebar.vue";
</script>

<template>
  <div id="App">
    <Sidebar>
      <router-view />
      <Toaster />
    </Sidebar>
  </div>
</template>
