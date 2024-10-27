<template>
  <Card>
    <slot name="header"> </slot>
    <CardContent>
      <slot />
    </CardContent>
    <slot name="footer"></slot>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
</script>

<style scoped></style>
