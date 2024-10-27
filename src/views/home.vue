<script setup lang="ts">
import { ref } from "vue";
import { ITableHeader } from "@/modules/basics";
import { ProductService } from "@/service/Products/products.service";
const data = ref(null);
ProductService.GetList({}).then((res: any) => {
  data.value = res.data.rows;
});
const Fields = ref<ITableHeader[]>([
  { key: "id", label: "id", tClass: "" },
  { key: "acquiredPrice", label: "acquiredPrice", tClass: "", isAmount: true },
  { key: "contragent", label: "contragent", tClass: "" },
  { key: "contragentId", label: "contragentId", tClass: "" },
  { key: "description", label: "description", tClass: "" },
  { key: "productColour", label: "productColour", tClass: "" },
  { key: "productColourId", label: "productColourId", tClass: "" },
  { key: "productModel", label: "productModel", tClass: "" },
  { key: "productModelId", label: "productModelId", tClass: "" },
  { key: "salePrice", label: "salePrice", tClass: "", isAmount: true },
  { key: "size", label: "size", tClass: "" },
  { key: "status", label: "status", tClass: "" },
  { key: "statusId", label: "statusId", tClass: "" },
  { key: "thumbnailId", label: "thumbnailId", tClass: "" },
  { key: "title", label: "title", tClass: "" },
]);
</script>

<template>
  <page-wrapper class="flex flex-col w-full py-6">
    <template #header>
      <div class="flex gap-y-1.5 px-6">
        <y-button></y-button>asdasd <y-button></y-button>asdasd
        <y-button></y-button>asdasd <y-button></y-button>asdasd
      </div>
    </template>
    <y-table class="mt-6" :Fields :data="data"> </y-table>
  </page-wrapper>
</template>
