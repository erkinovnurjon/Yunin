import ApiService from "@/service/api.service";

const baseUrl: string = "FinancialTransaction";
export const FinancialTransactionService = {
  GetList(data: any) {
    return ApiService.post(`${baseUrl}/GetList`, data);
  },
  Get(id?: number | string) {
    if (id) {
      return ApiService.get(`${baseUrl}/Get/${id}`);
    } else {
      return ApiService.get(`${baseUrl}/Get`);
    }
  },
  Create(data: any) {
    if (!data.id) {
      return ApiService.post(`${baseUrl}/Create`, data);
    } else {
      return ApiService.post(`${baseUrl}/Update`, data);
    }
  },
  Delete(id: number | string) {
    return ApiService.post(`${baseUrl}/Delete/${id}`);
  },
  GetSecurityInfo() {
    return ApiService.get(`${baseUrl}/GetSecurityInfo`);
  },
};
