import ApiService from "../api.service";

const baseUrl = "manual";
export const ManualService = {
  GetModuleSelectList() {
    return ApiService.get(`${baseUrl}/GetModuleSelectList`);
  },
  GetContragentSelectList() {
    return ApiService.get(`${baseUrl}/ContragentSelectList`);
  },
  GetCustomerSelectList() {
    return ApiService.get(`${baseUrl}/CustomerSelectList`);
  },
  GetProductTypeSelectList() {
    return ApiService.get(`${baseUrl}/ProductTypeSelectList`);
  },
  GetProductColourSelectList() {
    return ApiService.get(`${baseUrl}/ProductColourSelectList`);
  },
  GetLanguageSelectList() {
    return ApiService.get(`${baseUrl}/LanguageSelectList`);
  },
  GetStatusSelectList() {
    return ApiService.get(`${baseUrl}/StatusSelectList`);
  },
  GetTransactionTypeSelectList() {
    return ApiService.get(`${baseUrl}/TransactionTypeSelectList`);
  },
  GetPaymentTypeSelectList() {
    return ApiService.get(`${baseUrl}/PaymentTypeSelectList`);
  },
};
