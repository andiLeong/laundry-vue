import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import router from '@/router';

const app = createApp(App).use(router).mount('#app');
