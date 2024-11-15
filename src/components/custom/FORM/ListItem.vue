<template>
  <div class="info-item">
    <span class="label">{{ label }}</span>
    <span class="value">{{ formattedValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGlobal } from "@/composibles/useGlobale";
interface Props {
  label: string;
  value: string | number;
  isAmount?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isAmount: false,
});
const { parseNumber } = useGlobal();

const formattedValue = computed(() => {
  if (props.isAmount && typeof props.value === "number") {
    return parseNumber(props.value);
  }
  return props.value;
});
</script>

<style scoped>
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 1px solid #eee;
}

.label {
  color: #666;
  font-size: 0.95rem;
}

.value {
  color: #333;
  font-weight: 500;
  text-align: right;
}
</style>
