<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ITableHeader } from "@/modules/basics";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash, PlusCircle, File, ListFilter } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import { InventoryOutService } from "./inventoryout.service";
import { AxiosError } from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Fields = ref<ITableHeader[]>([
  { key: "id", label: "Id", tClass: "" },
  { key: "title", label: "Title", tClass: "" },
  { key: "outDate", label: "Out Date", tClass: "" },
  { key: "product", label: "Product", tClass: "" },
  { key: "inventoryIn", label: "Inventory In", tClass: "" },
  {
    key: "pricePerProduct",
    label: "Price Per Product",
    tClass: "",
    isAmount: true,
  },
  { key: "paymentType", label: "Payment Type", tClass: "" },
  { key: "quantitiy", label: "Quantitiy", tClass: "" },
  { key: "customer", label: "Customer", tClass: "" },
  { key: "description", label: "Description", tClass: "" },
  { key: "status", label: "Status", tClass: "" },
  { key: "actions", label: "Actions", tClass: "" },
]);

const { toast } = useToast();
const router = useRouter();

// Table data block
const data = ref(null);
const filter = ref({
  page: 1,
  pageSize: 20,
  search: "",
});
const totalRows = ref<number>(0);
const Refresh = (page: number = 1) => {
  filter.value.page = page;
  InventoryOutService.GetList(filter.value).then((res: any) => {
    data.value = res.data.rows;
    totalRows.value = res.data.total;
  });
};
Refresh();
const goPage = (id: number | string = 0) => {
  router.push(`/inventory-out/edit/${id}`);
};
// Table data block

// Dialog Block
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
    InventoryOutService.Delete(deleteItem.value)
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
// Dialog Block
// Tab Block
const tabValue = ref<number>(0);
</script>

<template>
  <div class="flex flex-col xl:flex-row xl:justify-between xl:items-center">
    <Tabs v-model="tabValue" :default-value="0">
      <TabsList>
        <TabsTrigger :value="0"> All </TabsTrigger>
        <TabsTrigger :value="1"> Active </TabsTrigger>
        <TabsTrigger :value="2"> Draft </TabsTrigger>
        <TabsTrigger :value="3"> Archived </TabsTrigger>
      </TabsList>
    </Tabs>
    <div class="flex gap-2 mt-4 xl:mt-0">
      <DropdownMenu class="mr-2">
        <DropdownMenuTrigger as-child>
          <y-button variant="outline" size="sm" class="h-7 gap-1">
            <ListFilter class="h-3.5 w-3.5" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Filter
            </span>
          </y-button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Active</DropdownMenuItem>
          <DropdownMenuItem>Draft</DropdownMenuItem>
          <DropdownMenuItem>Archived</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <y-button size="sm" class="h-7 gap-1">
        <File class="h-3.5 w-3.5" />Export</y-button
      >
    </div>
  </div>
  <page-wrapper class="flex flex-col w-full py-6 mt-4 h-full">
    <template #header>
      <div class="flex justify-between items-center px-6">
        <span class="text-3xl font-medium">Inventory Out</span>
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
      <template #body> Do you want to delete ID: {{ deleteItem }} </template>
    </y-dialog>
  </page-wrapper>
</template>
