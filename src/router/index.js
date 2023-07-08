import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/components/Home.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import AdminHome from '@/views/admin/home.vue'
import AdminUser from '@/views/admin/user.vue'
import AdminOrder from '@/views/admin/order.vue'
import AdminStats from '@/views/admin/stats.vue'

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import { useUserStore } from '@/store/user';

const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/about', name: 'about', component: HelloWorld},
    {path: '/admin/home', name: 'admin-home', component: AdminHome},
    {path: '/admin/order', name: 'admin-order', component: AdminOrder},
    {path: '/admin/user', name: 'admin-user', component: AdminUser},
    {path: '/admin/stats', name: 'admin-stats', component: AdminStats},
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: () => import('@/views/Login.vue'),
    //     meta: { redirectIfLogged: true },
    // },
    // {
    //     path: '/posts/:slug',
    //     name: 'posts.show',
    //     component: () => import('@/views/Post.vue'),
    //     props: true,
    // },
    // {
    //     path: '/posts/edit/:slug',
    //     name: 'posts.edit',
    //     component: () => import('@/views/post/Edit.vue'),
    //     props: true,
    //     meta: { adminOnly: true },
    // },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // linkActiveClass: 'border-b-sky-500 text-gray-900 border-b-2',
    scrollBehavior(to, from, savedPosition) {
        return (
            savedPosition ||
            new Promise((resolve) => {
                setTimeout(() => resolve({top: 0}), 300);
            })
        );
    },
});

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start();
    }
    next();
});

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    NProgress.done();
});

export default router;
