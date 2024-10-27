<template>
  <Card>
    <CardHeader>
      <slot name="header"></slot>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
    <CardFooter>
      <slot name="footer"></slot>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
</script>

<style scoped></style>
