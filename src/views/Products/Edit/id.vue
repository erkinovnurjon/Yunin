<template>
  <div class="flex justify-between items-center">
    <div class="flex justify-start items-center">
      <y-button @click="() => router.back()" variant="outline" size="xs">
        <ChevronLeft />
      </y-button>
      <h1 class="font-medium ml-4">Product Controller</h1>
    </div>
    <div>
      <y-button size="sm" @click="SaveProduct"> Save Product </y-button>
    </div>
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
          <Textarea
            id="description"
            placeholder="Product description"
            v-model="product.description"
          />
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
        <CardHeader class="px-0">
          <CardTitle>Stock</CardTitle>
          <CardDescription>Enter product price and size.</CardDescription>
        </CardHeader>
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col w-full md:w-[30%] items-start gap-1.5">
            <y-select
              label="Contragent"
              v-model="product.contragentId"
              :data="contragentList"
            />
          </div>
          <div
            class="flex flex-col w-full md:w-[30%] items-start gap-1.5 md:mt-0 mt-4"
          >
            <y-select
              label="Product Model"
              v-model="product.productModelId"
              :data="productModelList"
            />
          </div>
          <div
            class="flex flex-col w-full md:w-[30%] items-start gap-1.5 md:mt-0 mt-4"
          >
            <y-select
              label="Product Colour"
              v-model="product.productColourId"
              :data="productColourList"
            />
          </div>
        </div>
      </page-wrapper>
    </div>
    <div class="w-full md:w-4/12">
      <page-wrapper class="overflow-hidden">
        <CardHeader class="px-0">
          <CardTitle>Product image</CardTitle>
          <CardDescription> Click to Upload Image </CardDescription>
        </CardHeader>
        <div class="flex relative">
          <!-- Display the selected or placeholder image -->
          <img
            alt="Product image"
            class="aspect-square w-full rounded-md object-cover"
            height="300"
            :src="
              product.id
                ? baseURL + `Product/DownloadFile/${product.thumbnailId}`
                : imageSrc
            "
            ref="imageSrc"
            width="300"
          />
          <!-- Hidden file input for image upload -->
          <input
            type="file"
            accept="image/*"
            ref="fileInput"
            @change="onFileChange"
            style="visibility: hidden; position: absolute"
          />
          <!-- Overlay to trigger file upload on click -->
          <div
            class="absolute inset-0 cursor-pointer bg-transparent"
            @click="triggerFileInput"
          ></div>
        </div>
      </page-wrapper>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import { ChevronLeft } from "lucide-vue-next";
import { IProduct, ISelect } from "@/modules/basics";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label/Label.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import { ManualService } from "@/service/Manual/manual.service";
import { ProductService } from "@/service/Products/products.service";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@/components/ui/toast/use-toast";
import placeholderImage from "../../../assets/images/placeholder.svg";
import { useRoute, useRouter } from "vue-router";

const baseURL = import.meta.env.VITE_BASE_API_URL;
const { toast } = useToast();
const router = useRouter();
const route = useRoute();
const product = ref<IProduct>({
  id: null,
  title: "",
  description: "",
  thumbnailId: "",
  size: null,
  acquiredPrice: null,
  salePrice: null,
  statusId: 1,
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
function GetProductModelSelectList() {
  ManualService.GetProductModelSelectList().then((res: AxiosResponse) => {
    productModelList.value = res.data;
  });
}
GetProductModelSelectList();
const productColourList = ref<ISelect[]>([]);
function GetProductColourSelectList() {
  ManualService.GetProductColourSelectList().then((res: AxiosResponse) => {
    productColourList.value = res.data;
  });
}
GetProductColourSelectList();

/**
 * Block For Uploading Image
 */
const selectedFile = ref<File | null>(null);
const fileInputRef = useTemplateRef("fileInput");
const triggerFileInput = () => {
  const fileInput = fileInputRef.value;
  if (fileInput) {
    fileInput.click();
  }
};

const imageSrc = computed(() => {
  return selectedFile.value
    ? URL.createObjectURL(selectedFile.value)
    : placeholderImage;
});

const onFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  selectedFile.value = file;

  if (file) {
    await uploadImage(file);
  }
};

async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await ProductService.UploadFile(formData);
    if (res.data.fileId) {
      product.value.thumbnailId = res.data.fileId;
    }
  } catch (error) {
    console.error("Image upload failed", error);
  }
}
// Save Product Function
function SaveProduct() {
  if (
    product.value.title &&
    product.value.description &&
    product.value.thumbnailId
  ) {
    ProductService.Update(product.value).then((res: AxiosResponse) => {
      toast({
        title: "Successfully Saved",
        variant: "default",
        duration: 1000,
      });
      router.push("/products");
    });
  } else {
    toast({
      title: "Fill the requered fields",
      description: "Title, Description, Image",
      variant: "destructive",
    });
  }
}

if (+route.params.id > 0) {
  ProductService.Get(+route.params.id)
    .then((res: AxiosResponse) => {
      product.value = res.data;
    })
    .catch((e: AxiosError) => {
      toast({
        title: `Error GetRequest`,
        description: `${e}`,
        variant: "destructive",
      });
    });
}
</script>

<style scoped></style>
