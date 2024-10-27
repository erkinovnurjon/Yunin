import "./assets/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import ApiService from "./service/api.service";

/**
 * Import Components and Make them Global
 */
import PageWrapper from "@/components/custom/PageWrapper/index.vue";
import Table from "@/components/custom/Table/index.vue";

export const buildApp = () => {
  const baseUrl: string = import.meta.env.VITE_BASE_API_URL;
  ApiService.setBaseUrl(baseUrl);
  ApiService.mount401Interceptor();

  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);
  app.use(router);
  /**
   * Components
   */
  app.component("page-wrapper", PageWrapper);
  app.component("y-table", Table);

  return { pinia, app, router };
};
