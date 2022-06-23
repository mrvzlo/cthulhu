import { createApp } from 'vue';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';

createApp(App).use(router).use(VueCookies, { expire: '30d' }).mount('#app');

import '@popperjs/core/dist/cjs/popper';
import 'bootstrap/dist/js/bootstrap';
