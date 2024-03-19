import { createApp, markRaw } from 'vue';
import './index.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router';
import axios from 'axios';
import { useUserStore } from '@/store/user.js';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

window.axios = axios;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router);
});

const app = createApp(App).use(pinia).use(autoAnimatePlugin);

const userStore = useUserStore();
userStore.fetchUser(app, router);
