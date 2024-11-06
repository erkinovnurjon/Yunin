<template>
  <LoaderIcon :class="computedClass" />
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { Loader2 as LoaderIcon } from "lucide-vue-next";

const sizeClasses = {
  default: "h-4 w-4",
  sm: "h-2 w-2",
  lg: "h-6 w-6",
  xl: "h-10 w-10",
} as const;

const props = defineProps<{
  size?: keyof typeof sizeClasses;
}>();

const computedClass = computed(() => {
  return `text-muted-foreground animate-spin ${
    sizeClasses[props.size ?? "default"]
  }`;
});
</script>
