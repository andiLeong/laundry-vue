import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router';
import axios from 'axios';
import { useUserStore } from '@/store/user.js';

window.axios = axios;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

const pinia = createPinia();
const app = createApp(App).use(pinia);

const userStore = useUserStore();
userStore.fetchUser(app, router);
