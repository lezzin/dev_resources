import { createApp, h } from 'vue';
import router from "./router/router"
import "./assets/css/style.css"

import App from './App.vue';
createApp({ render: () => h(App) }).use(router).mount("#app")