<template>
  <page-wrapper>
    <div class="font-bold text-lg mt-4">Inventroy In</div>
    <list>
      <list-item label="Title" :value="data.title" />
      <list-item label="Description" :value="data.description" />
      <list-item label="Payment Type" :value="data.paymentType" />
      <list-item label="Amount" :value="data.amount" :isAmount="true" />
      <list-item label="Transaction Date" :value="data.transactionDate" />
      <list-item label="Transaction Source" :value="data.transactionSource" />
      <list-item label="Transaction Type" :value="data.transactionType" />
      <list-item label="Document Id" :value="data.documentId" />
      <list-item label="Status" :value="data.status" />
    </list>
  </page-wrapper>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { IFinancialTransaction } from "@/modules/basics";
import { FinancialTransactionService } from "../financialtransaction.service";

const route = useRoute();
const data = ref<IFinancialTransaction>({
  amount: null,
  description: "",
  documentId: null,
  id: null,
  paymentType: "",
  paymentTypeId: null,
  status: null,
  title: "",
  transactionDate: "",
  transactionSource: "",
  transactionSourceId: null,
  transactionType: "",
  transactionTypeId: null,
});

onMounted(async () => {
  try {
    const response = await FinancialTransactionService.Get(+route.params.id);
    data.value = response.data;
  } catch (error) {
    console.error("Error fetching inventory data:", error);
  }
});
</script>

<style scoped>
.info-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 1rem;
  margin-top: 1rem;
}
</style>
