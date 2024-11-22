import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import register from "./import"

register();
const app = createApp(App);
app.use(store).mount("#app");