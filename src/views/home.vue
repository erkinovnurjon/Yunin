<script setup lang="ts">
import { ref } from "vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-vue-next";
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
  <div class="flex min-h-screen w-full flex-col">
    <main class="grid flex-1 items-start gap-4 p-4">
      <page-wrapper>
        <y-table :Fields :data="data"> </y-table>
      </page-wrapper>
    </main>
  </div>
</template>
