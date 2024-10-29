<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { ref } from "vue";

// Define props for title and labels
const props = defineProps({
  title: {
    type: String,
    default: "Are you sure?",
  },
  closeLabel: {
    type: String,
    default: "Cancel",
  },
  submitLabel: {
    type: String,
    default: "Submit",
  },
});

// Emit close and submit actions
const emit = defineEmits(["close", "submit"]);

// Control dialog state
const open = ref(false);

// Async submit action (for demo purposes)
const handleSubmit = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate a delay
  emit("submit");
  open.value = false;
};

const handleClose = () => {
  emit("close");
  open.value = false;
};
</script>

<template>
  <Dialog v-model:open="open">
    <!-- Portal for rendering overlay and content -->
    <DialogContent>
      <!-- Title and Description -->
      <DialogTitle>{{ title }}</DialogTitle>
      <DialogDescription>
        <slot name="body">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </slot>
      </DialogDescription>

      <!-- Footer with cancel and submit actions -->
      <DialogFooter class="flex justify-end space-x-2 mt-4">
        <y-button
          variant="destructive"
          @click="handleClose"
          type="button"
          class="btn"
        >
          {{ closeLabel }}
        </y-button>
        <y-button type="button" class="btn btn-primary" @click="handleSubmit">
          {{ submitLabel }}
        </y-button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
/* Basic styles for buttons and layout */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
}

.fixed.inset-0 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.bg-black {
  background-color: rgba(0, 0, 0, 0.5);
}

.bg-white {
  background-color: white;
}
</style>
