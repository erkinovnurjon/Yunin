<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ITableHeader } from "@/modules/basics";
import { ProductService } from "@/service/Products/products.service";
import { Edit, Trash } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import { AxiosError } from "axios";

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
  { key: "actions", label: "actions", tClass: "" },
]);

const { toast } = useToast();
const router = useRouter();

const data = ref(null);
const filter = ref({
  page: 1,
  pageSize: 20,
  search: "",
});
const totalRows = ref<number>(0);
const Refresh = (page: number = 1) => {
  filter.value.page = page;
  ProductService.GetList(filter.value).then((res: any) => {
    data.value = res.data.rows;
    totalRows.value = res.data.total;
  });
};
Refresh();
const goPage = (id: number | string = 0) => {
  router.push(`/products/edit/${id}`);
};

const deleteDialog = ref<boolean>(false);
const deleteItem = ref<number | string | null>(null);
const openDeleteModal = (id: number) => {
  deleteItem.value = id;
  deleteDialog.value = true;
};

const onDialogClose = () => {
  deleteItem.value = null;
  deleteDialog.value = false;
};

const onDialogSubmit = () => {
  if (deleteItem.value) {
    ProductService.Delete(deleteItem.value)
      .then(() => {
        toast({
          title: "Successfully Saved",
          variant: "default",
          duration: 1000,
        });
        Refresh();
        onDialogClose();
      })
      .catch((error: AxiosError) => {
        toast({
          title: "Error on delete",
          description: `${error}`,
          variant: "destructive",
          duration: 1000,
        });
      });
  }
};
</script>

<template>
  <page-wrapper class="flex flex-col w-full py-6">
    <template #header>
      <div class="flex justify-between items-center px-6">
        <span class="text-3xl font-medium">Products</span>
        <y-button @click="goPage(0)">Qo'shish</y-button>
      </div>
    </template>
    <y-table
      class="mt-6"
      :Fields
      :data="data"
      :totalRows
      :page="filter.page"
      :pageSize="filter.pageSize"
      @refresh="Refresh"
    >
      <template #item-actions="{ item }">
        <div class="flex justify-center">
          <Edit @click="goPage(item.id)" class="cursor-pointer" :size="16" />
          <Trash
            @click="openDeleteModal(item.id)"
            class="cursor-pointer ml-2"
            :size="16"
          />
        </div>
      </template>
    </y-table>
    <y-dialog
      title="Delete Account"
      closeLabel="Cancel"
      submitLabel="Delete"
      v-model:open="deleteDialog"
      @close="onDialogClose"
      @submit="onDialogSubmit"
    >
      <template #body>
        do you want to delete product {{ deleteItem }}
      </template>
    </y-dialog>
  </page-wrapper>
</template>
