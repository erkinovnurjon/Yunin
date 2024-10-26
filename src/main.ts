import "./assets/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

import ApiService from "./service/api.service";
ApiService.setBaseUrl("lol");
ApiService.mount401Interceptor();

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
