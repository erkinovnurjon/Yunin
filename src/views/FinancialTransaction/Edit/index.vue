<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="flex justify-start items-center">
        <y-button @click="() => router.back()" variant="outline" size="xs">
          <ChevronLeft />
        </y-button>
        <h1 class="font-medium ml-4">F. Transaction Controller</h1>
      </div>
      <div>
        <y-button size="sm" @click="SaveTransaction">
          Save F. Transaction
        </y-button>
      </div>
    </div>
    <div class="w-full">
      <page-wrapper>
        <CardHeader class="px-0">
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription
            >Enter Transaction name and description.</CardDescription
          >
        </CardHeader>
        <div class="grid w-full items-center gap-1.5">
          <Label for="title">Transaction name</Label>
          <Input id="title" type="text" v-model="transaction.title" />
        </div>
        <div class="grid w-full gap-1.5 mt-4">
          <Label for="description">Transaction description</Label>
          <Textarea
            id="description"
            placeholder="Transaction description"
            v-model="transaction.description"
          />
        </div>
        <div class="grid w-full gap-1.5 mt-4">
          <Label for="description">Transaction Date</Label>
          <y-calendar
            id="transaction_date"
            placeholder="Transaction Date"
            :value="transaction.transactionDate"
            v-model="transaction.transactionDate"
            @update:value="(e: string) => transaction.transactionDate = e"
          />
        </div>
      </page-wrapper>
      <page-wrapper class="mt-6">
        <CardHeader class="px-0">
          <CardTitle>Stock</CardTitle>
          <CardDescription>Enter Transaction Details.</CardDescription>
        </CardHeader>
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col w-full md:w-[30%] items-start gap-1.5">
            <y-select
              label="Payment Type"
              v-model="transaction.paymentTypeId"
              :data="paymentTypeSelectList"
            />
          </div>
          <div class="flex flex-col w-full md:w-[30%] items-start gap-1.5">
            <y-select
              label="Transaction Type"
              v-model="transaction.transactionTypeId"
              :data="transactionTypeSelectList"
            />
          </div>
          <div class="flex flex-col w-full md:w-[30%] items-start gap-1.5">
            <y-select
              label="Transaction Source"
              v-model="transaction.transactionSourceId"
              :data="transactionSourceSelectList"
            />
          </div>
          <div
            class="flex flex-col w-full md:w-[30%] items-start gap-1.5 md:mt-0 mt-4"
          >
            <Label for="amount">Amount</Label>
            <Input id="amount" type="number" v-model="transaction.amount" />
          </div>
        </div>
      </page-wrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue functions
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// Icons and Types
import { ChevronLeft } from "lucide-vue-next";
import { IFinancialTransaction, ISelect } from "@/modules/basics";
import { AxiosError, AxiosResponse } from "axios";
// Components
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label/Label.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { FinancialTransactionService } from "../financialtransaction.service";
import { ManualService } from "@/service/Manual/manual.service";

const { toast } = useToast();
const router = useRouter();
const route = useRoute();
const transaction = ref<IFinancialTransaction>({
  transactionDate: "",
  title: "",
  description: "",
  documentId: null,
  id: null,
  transactionTypeId: null,
  transactionSourceId: null,
  amount: null,
  paymentTypeId: null,
});

const paymentTypeSelectList = ref<ISelect[]>([]);
function GetPaymentTypeSelectList() {
  ManualService.GetPaymentTypeSelectList().then((res: AxiosResponse) => {
    paymentTypeSelectList.value = res.data;
  });
}
GetPaymentTypeSelectList();

const transactionTypeSelectList = ref<ISelect[]>([]);
function GetTransactionTypeSelectList() {
  ManualService.GetTransactionTypeSelectList().then((res: AxiosResponse) => {
    transactionTypeSelectList.value = res.data;
  });
}
GetTransactionTypeSelectList();
const transactionSourceSelectList = ref<ISelect[]>([]);
function GetTransactionSourceSelectList() {
  ManualService.GetTransactionSourceSelectList().then((res: AxiosResponse) => {
    transactionSourceSelectList.value = res.data;
  });
}
GetTransactionSourceSelectList();

// Save Transaction Function
function SaveTransaction() {
  if (
    transaction.value &&
    transaction.value.title &&
    transaction.value.description
  ) {
    FinancialTransactionService.Create(transaction.value).then(
      (res: AxiosResponse) => {
        toast({
          title: "Successfully Saved",
          variant: "default",
          duration: 1000,
        });
        router.push("/financial-transaction/");
      }
    );
  } else {
    toast({
      title: "Fill the requered fields",
      description: "Title, Description, Image",
      variant: "destructive",
    });
  }
}

FinancialTransactionService.Get(+route.params.id)
  .then((res: AxiosResponse) => {
    transaction.value = res.data;
    if (+route.params.id == 0) {
    }
  })
  .catch((e: AxiosError) => {
    toast({
      title: `Error GetRequest`,
      description: `${e}`,
      variant: "destructive",
    });
  });
</script>

<style scoped></style>
