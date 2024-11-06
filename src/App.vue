<template>
  <div>
    <router-view />
    <Toaster />
    <Loader v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useLoading } from "./composibles/useLoading";
import { useRouter } from "vue-router";
import Loader from "./components/widgets/Loader.vue";

const { isLoading, startLoading, stopLoading } = useLoading();
const router = useRouter();

router.beforeEach((to, from) => {
  startLoading();
});

router.afterEach(() => {
  stopLoading();
});
</script>
