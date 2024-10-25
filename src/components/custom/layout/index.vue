<template>
  <div>
    <sidebar>
      <router-view v-slot="{ Component }">
        <Transition name="fade" made="out-in">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </sidebar>
  </div>
</template>

<script setup lang="ts">
import sidebar from "@/components/custom/sidebar/sidebar.vue";
</script>

<style scoped></style>
