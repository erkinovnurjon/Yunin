<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { computed } from "vue";

const mode = useColorMode();

const backgroundClass = computed(() => {
  if (mode.value === "light") {
    return "bg-black text-white";
  } else if (mode.value === "dark") {
    return "bg-white text-black";
  }
  return "";
});
</script>

<template>
  <div :class="['w-full h-full', backgroundClass]" class="min-h-max ml-10">
    <h1>Seamless Success with Yunin Systems</h1>
  </div>
</template>

<style scoped>
.bg-black {
  background-color: black;
}

.bg-white {
  background-color: white;
}
</style>
