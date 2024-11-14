<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ITableHeader } from "@/modules/basics";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  Trash,
  PlusCircle,
  File,
  ListFilter,
  FileInput,
  CheckCheck,
} from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import { InventoryInService } from "@/views/InventoryIn/inventoryin.service";
import { AxiosError } from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";

const Fields = ref<ITableHeader[]>([
  { key: "id", label: "Id", tClass: "" },
  { key: "title", label: "Title", tClass: "" },
  { key: "inDate", label: "In Date", tClass: "" },
  { key: "product", label: "Product", tClass: "" },
  {
    key: "pricePerProduct",
    label: "Price Per Product",
    tClass: "",
    isAmount: true,
  },
  { key: "quantitiy", label: "Quantitiy", tClass: "" },
  { key: "description", label: "description", tClass: "" },
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
  InventoryInService.GetList(filter.value).then((res: any) => {
    data.value = res.data.rows;
    totalRows.value = res.data.total;
  });
};
Refresh();
const goPage = (id: number | string = 0, isInventoryOut: boolean = false) => {
  if (!isInventoryOut) {
    router.push(`/inventory-in/edit/${id}`);
  } else {
    router.push(`/inventory-out/edit/0?inventory-in=${id}`);
  }
};
// Table data block

// Delete Dialog Block
const deleteDialog = ref<boolean>(false);
const deleteItem = ref<number | string | null>(null);
const openDeleteModal = (id: number) => {
  deleteItem.value = id;
  deleteDialog.value = true;
};

const onDeleteDialogClose = () => {
  deleteItem.value = null;
  deleteDialog.value = false;
};

const onDeleteDialogSubmit = () => {
  if (deleteItem.value) {
    InventoryInService.Delete(deleteItem.value)
      .then(() => {
        toast({
          title: "Successfully deleted",
          variant: "default",
          duration: 1000,
        });
        Refresh();
        onDeleteDialogClose();
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
// Delete Dialog Block
// Accept Dialog Block
const acceptDialog = ref<boolean>(false);
const acceptDialogLoading = ref<boolean>(false);
interface IAcceptItem {
  id: number | null;
  message: string;
}
const DEFAULT_VALUE = { id: null, message: "" };
const acceptItem = reactive<IAcceptItem>({ ...DEFAULT_VALUE });
const openAcceptModal = (id: number) => {
  acceptItem.id = id;
  acceptDialog.value = true;
};

const onAcceptDialogClose = () => {
  Object.assign(acceptItem, { ...DEFAULT_VALUE });
  acceptDialog.value = false;
};

const onAcceptDialogSubmit = () => {
  if (acceptItem.id && acceptItem.message) {
    acceptDialogLoading.value = true;
    InventoryInService.Accept(acceptItem)
      .then(() => {
        toast({
          title: "Successfully Accepted",
          variant: "default",
          duration: 1000,
        });
        Refresh();
      })
      .catch((error: AxiosError) => {
        toast({
          title: "Error on delete",
          description: `${error}`,
          variant: "destructive",
          duration: 1000,
        });
      })
      .finally(() => {
        acceptDialogLoading.value = false;
        onAcceptDialogClose();
      });
  }
};
// Accept Dialog Block
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
      <y-button @click="goPage(0)" size="sm" class="h-7 gap-1"
        ><PlusCircle class="h-3.5 w-3.5" />Create Inventory</y-button
      >
    </div>
  </div>
  <page-wrapper class="flex flex-col w-full py-6 mt-4 h-full">
    <template #header>
      <div class="flex justify-between items-center px-6">
        <span class="text-3xl font-medium">Inventory</span>
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
        <div class="flex justify-start">
          <Edit @click="goPage(item.id)" class="cursor-pointer" :size="16" />
          <FileInput
            @click="goPage(item.id, true)"
            class="cursor-pointer ml-2"
            :size="16"
          />
          <CheckCheck
            @click="openAcceptModal(item.id)"
            class="cursor-pointer ml-2"
            :size="16"
          />
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
      @close="onDeleteDialogClose"
      @submit="onDeleteDialogSubmit"
    >
      <template #body>
        Do you want to delete inventory ID: {{ deleteItem }}
      </template>
    </y-dialog>
    <y-dialog
      title="Accept Inventory In"
      closeLabel="Cancel"
      submitLabel="Accept"
      :submitLoader="acceptDialogLoading"
      v-model:open="acceptDialog"
      @close="onAcceptDialogClose"
      @submit="onAcceptDialogSubmit"
    >
      <template #body>
        <span class="font-bold text-md"
          >Do you want to accept Inventory In Document with ID:
          {{ acceptItem.id }}</span
        >
        <div class="mt-4">
          <Label>Message:</Label>
          <Input
            class="mt-2"
            id="title"
            type="text"
            v-model="acceptItem.message"
          />
        </div>
      </template>
    </y-dialog>
  </page-wrapper>
</template>
