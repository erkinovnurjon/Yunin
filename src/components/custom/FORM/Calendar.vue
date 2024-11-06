<script setup lang="ts">
// @ts-nocheck
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { ref, computed, defineProps, defineEmits, watch } from "vue";

// Props for placeholder, label, maxDate, minDate, and initial date value
const props = defineProps({
  placeholder: {
    type: String,
    default: "Pick a date",
  },
  label: {
    type: String,
    default: "Date of birth",
  },
  value: {
    type: String,
    default: "",
  },
  minDate: {
    type: String,
    default: "",
  },
  maxDate: {
    type: String,
    default: "",
  },
});

// Emit for updating value on date selection
const emit = defineEmits(["update:value"]);

// Internal placeholder and selected date ref
const selectedDate = ref<any>(props.value);

// Computed date formatter to display date as "dd.MM.yyyy"
const formattedDate = computed(() => {
  if (!selectedDate.value) return "";
  const date = new Date(selectedDate.value);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
});

// Watch for prop changes to sync internal state
watch(
  () => props.value,
  (newVal) => {
    selectedDate.value = newVal;
  }
);

// Handler for date selection to emit updates
const handleDateChange = (date: string | undefined) => {
  selectedDate.value = date || "";
  console.log(selectedDate.value?.day);

  emit(
    "update:value",
    `${
      selectedDate.value?.day < 10
        ? "0" + selectedDate.value?.day
        : selectedDate.value?.day
    }.${selectedDate.value?.month}.${selectedDate.value?.year}`
  );
};
</script>

<template>
  <Popover class="max-w-[120px]">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="[
          'w-[240px] ps-3 text-start font-normal',
          !selectedDate && 'text-muted-foreground',
        ]"
      >
        <span>{{ selectedDate ? formattedDate : placeholder }}</span>
        <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        v-model="selectedDate"
        :min="props.minDate"
        :max="props.maxDate"
        calendar-label="label"
        initial-focus
        @update:model-value="handleDateChange"
      />
    </PopoverContent>
  </Popover>
</template>
