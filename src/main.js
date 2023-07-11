import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router';
import axios from 'axios';
import { useUserStore } from '@/store/user.js';

window.axios = axios;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const pinia = createPinia();
const app = createApp(App).use(pinia);

const userStore = useUserStore();
userStore.fetchUser(app, router);

console.log(userStore.user);
console.log(userStore.isLoggedIn);
