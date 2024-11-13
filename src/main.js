import { createApp, h } from 'vue';
import router from "./router/router";
import { Notify, Quasar, Loading } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/src/css/index.sass'

import App from './App.vue';

import { createPinia } from 'pinia';

const app = createApp({ render: () => h(App) });

app.use(Quasar, {
    plugins: {
        Notify,
        Loading
    },
    config: {
        dark: 'auto'
    }
});

app.use(router);
app.use(createPinia());

app.mount("#app");