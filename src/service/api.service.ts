import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { useToast } from "@/components/ui/toast/use-toast";
import { useRouter } from "vue-router";

const router = useRouter();
const { toast } = useToast();

const pendingForms = new WeakMap();
const ApiService = {
  _401interceptor: 0,
  setBaseUrl(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  },
  removeHeader() {
    axios.defaults.headers.common = {};
  },
  setHeader() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  get(resource: string, config?: AxiosRequestConfig) {
    return axios.get(resource, config);
  },
  post(resource: string, data?: any, config?: AxiosRequestConfig) {
    const previousController = pendingForms.get(data);
    if (previousController) {
      previousController.abort();
    }
    const innerData = !!data ? data : {};
    const controller = new AbortController();
    pendingForms.set(innerData, controller);

    return axios
      .post(resource, innerData, {
        signal: controller.signal,
        ...config,
      })
      .then((res) => {
        pendingForms.delete(innerData);
        return res;
      });
  },

  formData(resource: string, data: object) {
    return axios.post(resource, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  token(resource: string, data: object) {
    return axios.post(resource, data, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  },
  put(resource: string, data: object) {
    return axios.put(resource, data);
  },

  delete(resource: string) {
    return axios.delete(resource);
  },
  print(resourse: string, config?: AxiosRequestConfig) {
    return axios.get(resourse, {
      responseType: "blob",
      ...config,
    });
  },
  printTemp(resourse: string, data?: any, config?: any) {
    return axios.post(resourse, data, {
      responseType: "blob",
      ...config,
    });
  },
  postfile(resourse: string, data: object) {
    return axios.post(resourse, data, {
      responseType: "blob",
    });
  },
  blobandjson(resourse: string, data: object) {
    return axios.post(resourse, data, {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    });
  },
  customRequest(data: any) {
    return axios(data);
  },

  mount401Interceptor() {
    this._401interceptor = axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        if (error.request.status == 401) {
          router.push("/login");
        }

        if (error.request.status == 403) {
          window.location.href = "/error/403";
        }

        if (error.request?.status == 500) {
          toast({
            title: `status: ${error.request.status}`,
            description: `${error.request.responseText}`,
            variant: "destructive",
          });
          return;
        }
        throw error;
      }
    );
  },

  unmount401Interceptor() {
    axios.interceptors.response.eject(this._401interceptor);
  },
};

export default ApiService;
