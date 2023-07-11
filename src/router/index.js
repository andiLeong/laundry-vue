import { createRouter, createWebHistory } from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useUserStore } from '@/store/user';

const routes = [
    { path: '/', name: 'home', component: () => import('@/views/Home.vue') },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue'),
    },
    {
        path: '/admin/home',
        name: 'admin-home',
        component: () => import('@/views/admin/home.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/order',
        name: 'admin-order',
        component: () => import('@/views/admin/order.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/user',
        name: 'admin-user',
        component: () => import('@/views/admin/user.vue'),
        meta: { adminOnly: true },
    },
    {
        path: '/admin/stats',
        name: 'admin-stats',
        component: () => import('@/views/admin/stats.vue'),
        meta: { adminOnly: true },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: { redirectIfLogged: true },
    },
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
    scrollBehavior(to, from, savedPosition) {
        return (
            savedPosition ||
            new Promise((resolve) => {
                setTimeout(() => resolve({ top: 0 }), 300);
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

router.beforeEach((to, from) => {
    const userStore = useUserStore();
    let loggedIn = userStore.isLoggedIn;
    let isAdmin = userStore.isAdmin;
    let isStaff = userStore.isStaff;

    if (to.meta.staffOnly && !isStaff) {
        return { name: 'login' };
    }

    if (to.meta.adminOnly && !isAdmin) {
        return { name: 'home' };
    }

    if (to.meta.auth && !loggedIn) {
        return { name: 'login' };
    }

    if (to.meta.redirectIfLogged && loggedIn) {
        if (isAdmin || isStaff) {
            return { name: 'admin-home' };
        }
        return { name: 'home' };
    }
});

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    NProgress.done();
});

export default router;
