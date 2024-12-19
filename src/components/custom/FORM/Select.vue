<template>
  <div class="relative w-full" @keydown="handleKeyDown">
    <button
      type="button"
      @click="toggleDropdown"
      :id="id"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-labelledby="labelId"
      class="w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
      :class="{ 'text-gray-500': !modelValue }"
    >
      {{ displayText }}
      <span class="absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronDownIcon
          class="w-5 h-5 text-gray-400 transition-transform duration-200"
          :class="{ 'transform rotate-180': isOpen }"
        />
      </span>
    </button>

    <div
      v-if="isOpen"
      ref="dropdownRef"
      class="absolute z-10 w-full bg-white border rounded-md shadow-lg"
      :class="dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'"
    >
      <ul
        role="listbox"
        :aria-labelledby="labelId"
        tabindex="-1"
        class="py-1 max-h-60 overflow-auto"
      >
        <li
          v-for="(option, index) in data"
          :key="option.value"
          :id="`${id}-option-${index}`"
          role="option"
          :aria-selected="option.value === modelValue"
          @click="selectOption(option)"
          @mouseenter="activeIndex = index"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
          :class="{
            'bg-gray-50': option.value === modelValue,
            'bg-gray-100': activeIndex === index,
          }"
        >
          {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { ChevronDownIcon } from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
  data: {
    type: Array,
    default: () => [],
    validator: (value) => {
      return value.every((option) => "value" in option && "text" in option);
    },
  },
  placeholder: {
    type: String,
    default: "Choose Below",
  },
  id: {
    type: String,
    default: "custom-select",
  },
  labelId: {
    type: String,
    default: "custom-select-label",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const dropdownRef = ref(null);
const dropdownPosition = ref("bottom");
const activeIndex = ref(-1);

const displayText = computed(() => {
  const selectedOption = props.data.find(
    (option) => option.value === props.modelValue
  );
  return selectedOption ? selectedOption.text : props.placeholder;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      updateDropdownPosition();
      activeIndex.value = props.data.findIndex(
        (option) => option.value === props.modelValue
      );
    });
  }
};

const selectOption = (option) => {
  emit("update:modelValue", option.value);
  isOpen.value = false;
};

const updateDropdownPosition = () => {
  if (!dropdownRef.value) return;

  const rect = dropdownRef.value.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;

  dropdownPosition.value =
    spaceBelow < 100 && spaceAbove > spaceBelow ? "top" : "bottom";
};

const handleClickOutside = (event) => {
  if (!event.target.closest(`#${props.id}`)) {
    isOpen.value = false;
  }
};

const handleKeyDown = (event) => {
  if (!isOpen.value && event.key === "Enter") {
    toggleDropdown();
    return;
  }

  if (isOpen.value) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        activeIndex.value = (activeIndex.value + 1) % props.data.length;
        break;
      case "ArrowUp":
        event.preventDefault();
        activeIndex.value =
          (activeIndex.value - 1 + props.data.length) % props.data.length;
        break;
      case "Enter":
        event.preventDefault();
        if (activeIndex.value !== -1) {
          selectOption(props.data[activeIndex.value]);
        }
        break;
      case "Escape":
        isOpen.value = false;
        break;
    }
  }
};

watch(activeIndex, (newIndex) => {
  if (newIndex !== -1 && dropdownRef.value) {
    const activeElement = dropdownRef.value.querySelector(
      `#${props.id}-option-${newIndex}`
    );
    if (activeElement) {
      activeElement.scrollIntoView({ block: "nearest" });
    }
  }
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("resize", updateDropdownPosition);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", updateDropdownPosition);
});
</script>
