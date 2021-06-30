import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store/store";

import "mosha-vue-toastify/dist/style.css";

createApp(App)
  .use(store)
  .mount("#app");
