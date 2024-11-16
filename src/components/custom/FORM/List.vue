<template>
  <div class="info-list">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.info-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 1rem;
  margin-top: 1rem;
}
</style>
