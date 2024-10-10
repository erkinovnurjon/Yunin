<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Theme from "@/components/theme/theme.vue";
</script>

<template>
  <div class="h-full">
    <h1>Home</h1>
    <Button @click="$router.push({ name: 'Login' })">login</Button>
    <Theme />
  </div>
</template>

<style scoped></style>
