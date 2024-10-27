import ApiService from "../api.service";

const baseUrl: string = "manual";
export const ManualService = {
  GetContragentSelectList() {
    return ApiService.get(`${baseUrl}/ContragentSelectList`);
  },
  GetProductModelSelectList() {
    return ApiService.get(`${baseUrl}/ProductModelSelectList`);
  },
  GetProductColourSelectList() {
    return ApiService.get(`${baseUrl}/ProductColourSelectList`);
  },
};
