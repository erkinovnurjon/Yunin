<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import Label from "@/components/ui/label/Label.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISelect } from "@/modules/basics";

interface IProps {
  data: ISelect[];
  label?: string;
  placeholder?: string;
  itemTitle?: string;
  itemValue?: string;
  disabled?: boolean;
  required?: boolean;
  modelValue?: string | number | null;
  rules?: any;
}

const props = withDefaults(defineProps<IProps>(), {
  label: "Select List",
  placeholder: "Choose Below",
  itemTitle: "text",
  itemValue: "value",
  disabled: false,
  required: false,
  rules: null,
});

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
}>();

const model = computed({
  get(): string | number | null {
    return props.modelValue || null;
  },
  set(newValue: string | number | null) {
    emits("update:modelValue", newValue);
  },
});

const customRules = ref<any>([]);
const setRules = () => {
  if (props.required) {
    customRules.value = props.rules || [
      (value: any) => !!value || "Field cannot be empty",
    ];
  } else {
    customRules.value = [];
  }
};

watch([() => props.required, () => props.rules], setRules, { immediate: true });
</script>

<template>
  <Label :for="label">{{ label }}</Label>
  <!-- @vue-ignore -->
  <Select :id="label" v-model="model">
    <SelectTrigger :disabled="props.disabled" class="w-full">
      <SelectValue :placeholder="props.placeholder" />
    </SelectTrigger>
    <SelectContent>
      <!-- @vue-ignore -->
      <SelectItem
        v-for="item in props.data"
        :key="item[props.itemValue]"
        :value="item[props.itemValue]"
      >
        <!-- @vue-ignore -->
        {{ item[props.itemTitle] }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
