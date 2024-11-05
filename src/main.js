import { createApp, h } from 'vue';
import router from "./router/router";

import App from './App.vue';

import "./assets/css/style.css";
import { createPinia } from 'pinia';

const app = createApp({ render: () => h(App) });

app.use(router);
app.use(createPinia());

app.mount("#app");