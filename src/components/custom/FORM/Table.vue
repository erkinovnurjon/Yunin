<template>
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
import { ITableHeader } from "@/modules/basics";
import { useGlobal } from "@/composibles/useGlobale";
interface IProps {
  Fields: ITableHeader[];
  data: any;
}
const props = defineProps<IProps>();

const { parseNumber } = useGlobal();
</script>

<style scoped></style>
