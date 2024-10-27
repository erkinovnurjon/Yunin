<template>
  <div>
    <Table class="border">
      <TableHeader>
        <TableRow>
          <template v-for="field in Fields" :key="`head-${field.key}`">
            <TableHead :class="`${field.tClass}`">
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
        <TableRow v-if="data && data.length == 0">
          <TableCell class="w-full"> <div>Not Found</div> </TableCell>
        </TableRow>
        <template v-if="data && data.length > 0">
          <TableRow v-for="(item, i) in data" :key="`cell-${item.key}`">
            <template v-for="field in Fields" :key="`cell-field-${field.key}`">
              <TableCell>
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
    <div class="flex items-center justify-end space-x-2 py-4">
      <div
        v-if="data && data.length > 0"
        class="flex-1 text-sm text-muted-foreground"
      >
        {{ data.length }} of {{ totalRows }} row(s) selected.
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          @click="goToFirstPage"
          :disabled="currentPage === 1"
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          @click="goToPrevPage"
          :disabled="currentPage === 1"
        >
          <ChevronLeft />
        </Button>

        <!-- Page numbers -->
        <span v-for="page in visiblePages" :key="page">
          <Button
            @click="goToPage(page)"
            :variant="page === currentPage ? 'default' : 'outline'"
          >
            {{ page }}
          </Button>
        </span>

        <Button
          variant="outline"
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          @click="goToLastPage"
          :disabled="currentPage === totalPages"
        >
          <ChevronsRight />
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
} from "lucide-vue-next";

interface IProps {
  Fields: ITableHeader[];
  data: any;
  totalRows: number;
  page: number;
  pageSize: number;
}
const props = withDefaults(defineProps<IProps>(), {
  totalRows: 0,
  page: 1,
  pageSize: 20,
  data: [],
});
const emits = defineEmits(["refresh"]);

const { parseNumber } = useGlobal();
const totalRowsCopy = toRef(props, "totalRows");
const pageSizeCopy = toRef(props, "pageSize");
const currentPage = ref(1); // Default page size

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
  if (page >= 1 && page <= totalPages.value) {
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
