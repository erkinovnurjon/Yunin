<template>
  <Button :variant="variant" :size="size">
    <slot name="right-icon">{{ icon }}</slot>
    <slot>{{ label }}</slot>
    <slot name="left-icon">{{ icon }}</slot>
  </Button>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { IButton } from "@/modules/basics";
withDefaults(defineProps<IButton>(), {
  label: "Click Me",
  size: "default",
  variant: "default",
});
</script>

<style scoped></style>
