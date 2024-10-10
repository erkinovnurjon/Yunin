<script setup lang="ts">
import * as z from "zod";
import { h } from "vue";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { AutoForm, AutoFormField } from "@/components/ui/auto-form";
import { useRouter } from "vue-router";

const router = useRouter();

const schema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(4, {
      message: "Username must be at least 4 characters.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),

  acceptTerms: z.boolean().refine((value) => value, {
    message: "You must accept the terms and conditions.",
    path: ["acceptTerms"],
  }),
});

function onSubmit(values: Record<string, any>) {
  if (values.username === "admin" && values.password == "qwerty#123") {
    router.push("/");
    return;
  }
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
}
</script>

<template>
  <AutoForm
    class="space-y-6 w-2/3"
    :schema="schema"
    :field-config="{
      password: {
        label: 'Your secure password',
        inputProps: {
          type: 'password',
          placeholder: '••••••••',
        },
      },
    }"
    @submit="onSubmit"
  >
    <template #acceptTerms="slotProps">
      <AutoFormField v-bind="slotProps" />
      <div class="!mt-2 text-sm">
        I agree to the
        <button class="text-primary underline">terms and conditions</button>.
      </div>
    </template>

    <Button type="submit"> Submit </Button>
  </AutoForm>
</template>
