<template>
  <div class="w-64">
    <label
      for="date-picker"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        type="text"
        id="date-picker"
        :value="formattedDate"
        readonly
        @click="toggleCalendar"
        class="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        :placeholder="placeholder"
      />
      <button
        @click="toggleCalendar"
        class="absolute inset-y-0 right-0 flex items-center px-2"
      >
        <svg
          class="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
    <div
      v-if="isCalendarVisible"
      class="absolute mt-1 w-64 bg-white shadow-lg rounded-md overflow-hidden z-10"
    >
      <div class="p-2">
        <div class="flex justify-between items-center mb-2">
          <button
            @click="previousMonth"
            class="text-gray-600 hover:text-gray-800"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span class="text-sm font-semibold">{{ currentMonthYear }}</span>
          <button @click="nextMonth" class="text-gray-600 hover:text-gray-800">
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-7 gap-1 text-center">
          <span
            v-for="day in weekDays"
            :key="day"
            class="text-xs font-medium text-gray-500"
          >
            {{ day }}
          </span>
        </div>
        <div class="grid grid-cols-7 gap-1 mt-1">
          <button
            v-for="{ date, isCurrentMonth, isToday } in calendarDays"
            :key="date.toISOString()"
            @click="selectDate(date)"
            :class="[
              'w-8 h-8 text-sm rounded-full focus:outline-none',
              isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
              isToday ? 'bg-blue-100' : '',
              date.toDateString() ===
              (selectedDate.value
                ? new Date(
                    selectedDate.value.split('.').reverse().join('-')
                  ).toDateString()
                : '')
                ? 'bg-blue-500 text-white'
                : '',
            ]"
            :disabled="!isCurrentMonth"
          >
            {{ date.getDate() }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  label: { type: String },
  placeholder: { type: String, default: "Pick a date" },
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const isCalendarVisible = ref(false);
const currentMonth = ref(new Date());
const selectedDate = ref(props.modelValue);

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const toggleCalendar = () => {
  isCalendarVisible.value = !isCalendarVisible.value;
};

const formattedDate = computed(() => {
  return selectedDate.value || "";
});

const currentMonthYear = computed(() => {
  return currentMonth.value.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
});

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear();
  const month = currentMonth.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  const today = new Date();

  for (let i = 0; i < startingDayOfWeek; i++) {
    const date = new Date(year, month, -startingDayOfWeek + i + 1);
    days.push({ date, isCurrentMonth: false, isToday: false });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString(),
    });
  }

  const remainingDays = 7 - (days.length % 7);
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false, isToday: false });
    }
  }

  return days;
});

const selectDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  selectedDate.value = `${day}.${month}.${year}`;
  emit("update:modelValue", selectedDate.value);
  isCalendarVisible.value = false;
};

const previousMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() + 1,
    1
  );
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedDate.value = newValue;
  }
);
</script>
