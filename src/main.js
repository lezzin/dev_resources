import { createApp, h } from 'vue';
import router from "./router/router";
import { Notify, Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/src/css/index.sass'

import App from './App.vue';

import { createPinia } from 'pinia';

const app = createApp({ render: () => h(App) });

app.use(Quasar, {
    plugins: {
        Notify
    }
});

app.use(router);
app.use(createPinia());

app.mount("#app");