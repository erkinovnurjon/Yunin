import ApiService from "@/service/api.service";

const baseUrl: string = "Product";
export const ProductService = {
  GetList(data: any) {
    return ApiService.post(`${baseUrl}/GetList`, data);
  },
  Get(id: Number | String) {
    if (!id || id == 0) {
      return ApiService.get(`${baseUrl}/Get`);
    } else {
      return ApiService.get(`${baseUrl}/Get/${id}`);
    }
  },
  Update(data: any) {
    if (data.id) {
      return ApiService.post(`${baseUrl}/Update`, data);
    } else {
      return ApiService.post(`${baseUrl}/Create`, data);
    }
  },
  UploadFile(data: any) {
    return ApiService.formData(`${baseUrl}/UploadFile`, data);
  },
  DownloadFile(fileId: string) {
    return ApiService.get(`${baseUrl}/DownloadFile/${fileId}`);
  },
  Delete(id: number | string) {
    return ApiService.post(`${baseUrl}/Delete/${id}`);
  },
  GetAsSelectList() {
    return ApiService.post(`${baseUrl}/GetAsSelectList`);
  },
};
