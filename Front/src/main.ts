import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store/store";

import "mosha-vue-toastify/dist/style.css";

const app = createApp(App);

app.use(store);
app.mount("#app");
