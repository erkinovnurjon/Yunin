import ApiService from "../api.service";

const baseUrl: string = "manual";
export const ManualService = {
  GetContragentSelectList() {
    return ApiService.get(`${baseUrl}/ContragentSelectList`);
  },
  GetProductTypeSelectList() {
    return ApiService.get(`${baseUrl}/ProductTypeSelectList`);
  },
  GetProductColourSelectList() {
    return ApiService.get(`${baseUrl}/ProductColourSelectList`);
  },
  GetStateSelectList() {
    return ApiService.get(`${baseUrl}/StatusSelectList`);
  },
};
