<template>
  <div class="overflow-x-auto">
    <Table class="min-w-full">
      <TableHeader>
        <TableRow>
          <template v-for="field in Fields" :key="`head-${field.key}`">
            <TableHead :class="`${field.tClass} text-sm sm:text-base`">
              <slot :name="field.key" :field="field">
                <span>
                  {{ field.label }}
                </span>
              </slot>
            </TableHead>
          </template>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="isLoading">
          <TableCell :colspan="Fields.length" class="h-24">
            <div class="w-full h-full flex items-center justify-center">
              <component :is="loader" v-if="loader" />
              <div
                v-else
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
              ></div>
            </div>
          </TableCell>
        </TableRow>
        <TableRow v-else-if="!data || data.length === 0">
          <TableCell :colspan="Fields.length" class="h-24 text-center">
            <slot name="not-found">
              <div class="text-muted-foreground">
                <FileX class="mx-auto h-8 w-8 mb-2" />
                <p>No results found</p>
              </div>
            </slot>
          </TableCell>
        </TableRow>
        <template v-else>
          <TableRow v-for="(item, i) in data" :key="`cell-${item.key}`">
            <template v-for="field in Fields" :key="`cell-field-${field.key}`">
              <TableCell v-if="field.key == 'status'">
                <slot :name="`item-${field.key}`" :item="item">
                  <span
                    :class="`${statusColors(
                      item.statusId
                    )} py-1 px-2 rounded-md`"
                  >
                    {{ item[field.key] }}
                  </span>
                </slot>
              </TableCell>
              <TableCell v-else>
                <slot :name="`item-${field.key}`" :item="item">
                  {{
                    field.isAmount
                      ? parseNumber(item[field.key])
                      : item[field.key]
                  }}
                </slot>
              </TableCell>
            </template>
          </TableRow>
        </template>
      </TableBody>
    </Table>
    <div
      class="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 py-4"
    >
      <div
        v-if="data && data.length > 0"
        class="text-sm text-muted-foreground text-center sm:text-left"
      >
        {{ data.length }} of {{ totalRows }} row(s) selected.
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          @click="goToFirstPage"
          :disabled="currentPage === 1 || isLoading"
        >
          <ChevronsLeft class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          @click="goToPrevPage"
          :disabled="currentPage === 1 || isLoading"
        >
          <ChevronLeft class="h-4 w-4" />
        </Button>

        <!-- Page numbers -->
        <span v-for="page in visiblePages" :key="page">
          <Button
            @click="goToPage(page)"
            :variant="page === currentPage ? 'default' : 'outline'"
            :disabled="isLoading"
          >
            {{ page }}
          </Button>
        </span>

        <Button
          variant="outline"
          @click="goToNextPage"
          :disabled="currentPage === totalPages || isLoading"
        >
          <ChevronRight class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          @click="goToLastPage"
          :disabled="currentPage === totalPages || isLoading"
        >
          <ChevronsRight class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ITableHeader } from "@/modules/basics";
import { useGlobal } from "@/composibles/useGlobale";
import { computed, ref, toRef, watch } from "vue";
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  FileX,
} from "lucide-vue-next";

interface IProps {
  Fields: ITableHeader[];
  data: any;
  totalRows: number;
  page: number;
  pageSize: number;
  isLoading?: boolean;
  loader?: any;
}

const props = withDefaults(defineProps<IProps>(), {
  totalRows: 0,
  page: 1,
  pageSize: 20,
  data: [],
  isLoading: false,
  loader: null,
});

const emits = defineEmits(["refresh"]);

const { parseNumber, statusColors } = useGlobal();
const totalRowsCopy = toRef(props, "totalRows");
const pageSizeCopy = toRef(props, "pageSize");
const currentPage = ref(props.page);

// Calculate total pages
const totalPages = computed(() =>
  Math.ceil(totalRowsCopy.value / pageSizeCopy.value)
);

// Watch for changes to `pageSizeCopy` and reset current page
watch(pageSizeCopy, () => {
  currentPage.value = 1;
});

// Methods for pagination navigation
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && !props.isLoading) {
    currentPage.value = page;
    emits("refresh", currentPage.value);
  }
};
const goToFirstPage = () => goToPage(1);
const goToPrevPage = () => goToPage(currentPage.value - 1);
const goToNextPage = () => goToPage(currentPage.value + 1);
const goToLastPage = () => goToPage(totalPages.value);

// Compute visible pages for pagination (e.g., 1 2 3 ... 10)
const visiblePages = computed(() => {
  const pages = [];
  const startPage = Math.max(1, currentPage.value - 2);
  const endPage = Math.min(totalPages.value, currentPage.value + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});
</script>

<style scoped></style>
