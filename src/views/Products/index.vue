<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ITableHeader } from "@/modules/basics";
import { ProductService } from "@/service/Products/products.service";
const Fields = ref<ITableHeader[]>([
  { key: "id", label: "Id", tClass: "" },
  { key: "title", label: "Title", tClass: "" },
  { key: "acquiredPrice", label: "Acquired Price", tClass: "", isAmount: true },
  { key: "salePrice", label: "Sale Price", tClass: "", isAmount: true },
  { key: "contragent", label: "contragent", tClass: "" },
  { key: "productColour", label: "Product Colour", tClass: "" },
  { key: "productModel", label: "Product Model", tClass: "" },
  { key: "size", label: "Size", tClass: "" },
  { key: "description", label: "description", tClass: "" },
  { key: "status", label: "status", tClass: "" },
]);

const router = useRouter();

const data = ref(null);
ProductService.GetList({}).then((res: any) => {
  data.value = res.data.rows;
});

const goPage = () => {
  router.push("/products/edit/0");
};
</script>

<template>
  <page-wrapper class="flex flex-col w-full py-6">
    <template #header>
      <div class="flex justify-between items-center px-6">
        <span class="text-3xl font-medium">Products</span>
        <y-button @click="goPage">Qo'shish</y-button>
      </div>
    </template>
    <y-table class="mt-6" :Fields :data="data"> </y-table>
  </page-wrapper>
</template>
