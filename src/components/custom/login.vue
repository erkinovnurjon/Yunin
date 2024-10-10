<template>
  <div class="w-full flex h-full gap-20 justify-between">
    <div class="w-1/2">
      <login />
    </div>
    <div class="w-1/2">
      <rightbar />
    </div>
  </div>
</template>

<script setup lang="ts">
import login from "./widgets/login.vue";
import rightbar from "./widgets/rightbar.vue";
</script>
