import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store/store";

import "mosha-vue-toastify/dist/style.css";

const endpoint = "ws://127.0.0.1:8080";
const app = createApp(App);

app.use(store);
app.mount("#app");
app.provide("webSocket", new WebSocket(endpoint));
