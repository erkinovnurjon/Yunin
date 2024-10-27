<template>
  <div class="flex justify-start items-center">
    <y-button variant="outline" size="xs">
      <ChevronLeft />
    </y-button>
    <h1 class="font-medium ml-4">Product Controller</h1>
  </div>
  <main class="flex flex-col md:flex-row justify-between mt-6 gap-10">
    <div class="w-full md:w-8/12">
      <page-wrapper>
        <CardHeader class="px-0">
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Enter Product name and description.</CardDescription>
        </CardHeader>
        <div class="grid w-full items-center gap-1.5">
          <Label for="title">Product name</Label>
          <Input id="title" type="text" v-model="product.title" />
        </div>
        <div class="grid w-full gap-1.5 mt-4">
          <Label for="description">Product description</Label>
          <Textarea id="description" placeholder="Product description" />
        </div>
      </page-wrapper>
      <page-wrapper class="mt-6">
        <CardHeader class="px-0">
          <CardTitle>Stock</CardTitle>
          <CardDescription>Enter product price and size.</CardDescription>
        </CardHeader>
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col w-full md:w-[30%] items-start gap-1.5">
            <Label for="acquiredPrice">Acquired Price</Label>
            <Input
              id="acquiredPrice"
              type="number"
              v-model="product.acquiredPrice"
            />
          </div>
          <div
            class="flex flex-col w-full md:w-[30%] items-start gap-1.5 md:mt-0 mt-4"
          >
            <Label for="salePrice">Sale Price</Label>
            <Input id="salePrice" type="number" v-model="product.salePrice" />
          </div>
          <div
            class="flex flex-col w-full md:w-[30%] items-start gap-1.5 md:mt-0 mt-4"
          >
            <Label for="size">Size</Label>
            <Input id="size" type="number" v-model="product.size" />
          </div>
        </div>
      </page-wrapper>
      <page-wrapper class="mt-6">
        {{ product }}
        <CardHeader class="px-0">
          <CardTitle>Stock</CardTitle>
          <CardDescription>Enter product price and size.</CardDescription>
        </CardHeader>
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col w-full md:w-[30%] items-start gap-1.5">
            <y-select v-model="product.contragentId" :data="contragentList" />
          </div>
          <div
            class="flex flex-col w-full md:w-[30%] items-start gap-1.5 md:mt-0 mt-4"
          >
            <Label for="salePrice">Sale Price</Label>
            <Input id="salePrice" type="number" v-model="product.salePrice" />
          </div>
          <div
            class="flex flex-col w-full md:w-[30%] items-start gap-1.5 md:mt-0 mt-4"
          >
            <Label for="salePrice">Sale Price</Label>
            <Input id="salePrice" type="number" v-model="product.salePrice" />
          </div>
        </div>
      </page-wrapper>
    </div>
    <div class="w-full md:w-4/12">
      <page-wrapper>Edit</page-wrapper>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ChevronLeft } from "lucide-vue-next";
import { IProduct, ISelect } from "@/modules/basics";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label/Label.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import { ManualService } from "@/service/Manual/manual.service";
import { AxiosResponse } from "axios";

const product = ref<IProduct>({
  title: "",
  description: "",
  thumbnailId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  size: null,
  acquiredPrice: null,
  salePrice: null,
  statusId: null,
  productModelId: null,
  productColourId: null,
  contragentId: null,
});
const contragentList = ref<ISelect[]>([]);
function GetContragentSelectList() {
  ManualService.GetContragentSelectList().then((res: AxiosResponse) => {
    contragentList.value = res.data;
  });
}
GetContragentSelectList();
const productModelList = ref<ISelect[]>([]);
function GetProductModelSelectList() {}
const productColourList = ref<ISelect[]>([]);
function GetProductColourSelectList() {}
</script>

<style scoped></style>
