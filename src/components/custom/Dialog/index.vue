<script setup lang="ts">
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "radix-vue";
import { ref, defineProps, defineEmits } from "vue";

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
  <AlertDialogRoot v-model:open="open">
    <!-- Portal for rendering overlay and content -->
    <AlertDialogPortal>
      <AlertDialogOverlay
        class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
      />
      <AlertDialogContent
        class="z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
      >
        <div>
          <!-- Title and Description -->
          <AlertDialogTitle>{{ title }}</AlertDialogTitle>
          <AlertDialogDescription>
            <slot name="body">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </slot>
          </AlertDialogDescription>

          <!-- Footer with cancel and submit actions -->
          <div class="flex justify-end space-x-2 mt-4">
            <AlertDialogCancel @click="handleClose">
              <button type="button" class="btn">{{ closeLabel }}</button>
            </AlertDialogCancel>
            <AlertDialogAction>
              <button
                type="button"
                class="btn btn-primary"
                @click="handleSubmit"
              >
                {{ submitLabel }}
              </button>
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
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
