import {createApp} from 'vue';
import './index.css';
import App from './App.vue';
import {createPinia} from 'pinia'
import router from '@/router';
import axios from 'axios';


window.axios = axios;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/';


const pinia = createPinia()
const app = createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app');
