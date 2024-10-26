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

export const buildApp = () => {
  ApiService.setBaseUrl("lol");
  ApiService.mount401Interceptor();

  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);
  app.use(router);

  app.component("page-wrapper", PageWrapper);

  return { pinia, app, router };
};
