<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ITableHeader } from "@/modules/basics";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  PlusCircle,
  File,
  ListFilter,
  EyeIcon,
  FileSliders,
} from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import { FinancialTransactionService } from "./financialtransaction.service";
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
  { key: "transactionDate", label: "Transaction Date", tClass: "" },
  { key: "paymentType", label: "Payment Type", tClass: "" },
  { key: "transactionSource", label: "Transaction Source", tClass: "" },
  {
    key: "transactionType",
    label: "Transaction Type",
    tClass: "",
    isAmount: false,
  },
  {
    key: "amount",
    label: "Amount",
    tClass: "",
    isAmount: true,
  },
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
const loading = ref<boolean>(false);
const Refresh = (page: number = 1) => {
  filter.value.page = page;
  loading.value = true;
  FinancialTransactionService.GetList(filter.value)
    .then((res: any) => {
      data.value = res.data.rows;
      totalRows.value = res.data.total;
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
      loading.value = false;
    });
};
Refresh();
const goPage = (id: number | string = 0, page: string = "edit") => {
  router.push(`/financial-transaction/${page}/${id}`);
};
const goInventoryPage = (documentId: number | string = 0, page: number) => {
  router.push(`/inventory-${page == 1 ? "in" : "out"}/view/${documentId}`);
};
// Table data block

// Tab Block
const tabValue = ref<number>(0);
</script>

<template>
  <div>
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
          ><PlusCircle class="h-3.5 w-3.5" />Make Financial
          Transaction</y-button
        >
      </div>
    </div>
    <page-wrapper class="flex flex-col w-full py-6 mt-4">
      <template #header>
        <div class="flex justify-between items-center px-6">
          <span class="text-3xl font-medium">Financial Transaction</span>
        </div>
      </template>
      <y-table
        class="mt-6"
        :Fields
        :data="data"
        :totalRows
        :page="filter.page"
        :pageSize="filter.pageSize"
        :loading="loading"
        @refresh="Refresh"
      >
        <template #item-actions="{ item }">
          <div class="flex justify-start">
            <Edit @click="goPage(item.id)" class="cursor-pointer" :size="16" />
            <EyeIcon
              @click="goPage(item.id, 'view')"
              class="cursor-pointer ml-2"
              :size="16"
            />
            <FileSliders
              @click="goInventoryPage(item.id, item.transactionTypeId)"
              class="cursor-pointer ml-2"
              :size="16"
            />
          </div>
        </template>
      </y-table>
    </page-wrapper>
  </div>
</template>
