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
  <div :class="['w-full  ', backgroundClass]" class="py-48 ml-10">
    <h1 class="text-[120px] leading-[120px] font-bold ml-20 text-clip">
      Seamless
    </h1>
    <h1 class="text-[120px] leading-[120px] font-bold ml-20 text-clip">
      Success
    </h1>
    <h1 class="text-[120px] leading-[120px] font-bold ml-20 text-clip">with</h1>
    <h1 class="text-[120px] leading-[120px] font-bold ml-20 text-clip">
      Yunin
    </h1>
    <h1 class="text-[120px] leading-[120px] font-bold ml-20 text-clip">
      Systems
    </h1>
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
