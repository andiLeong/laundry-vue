import {createRouter, createWebHistory} from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {useUserStore} from '@/store/user';

const routes = [
    {path: '/', name: 'home', component: () => import('@/views/Home.vue')},
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue'),
    },
    {
        path: '/admin/home',
        name: 'admin-home',
        component: () => import('@/views/admin/Home.vue'),
        meta: {staffOnly: true},
    },
    {
        path: '/admin/order',
        name: 'admin-order',
        component: () => import('@/views/admin/order/Order.vue'),
        meta: {staffOnly: true},
    },
    {
        path: '/admin/promotion',
        name: 'admin-promotion',
        component: () => import('@/views/admin/Promotion.vue'),
        meta: {staffOnly: true},
    },
    {
        path: '/admin/order/create',
        name: 'admin-order-create',
        component: () => import('@/views/admin/order/Create.vue'),
        meta: {adminOnly: true},
    },
    {
        path: '/admin/user',
        name: 'admin-user',
        component: () => import('@/views/admin/User.vue'),
        meta: {adminOnly: true},
    },
    {
        path: '/admin/stat',
        name: 'admin-stat',
        component: () => import('@/views/admin/Stat.vue'),
        meta: {adminOnly: true},
    },
    {
        path: '/admin/profile',
        name: 'admin-profile',
        component: () => import('@/views/admin/Profile.vue'),
        meta: {staffOnly: true},
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: {redirectIfLogged: true},
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

router.beforeEach((to, from) => {
    const userStore = useUserStore();
    let loggedIn = userStore.isLoggedIn;
    let isAdmin = userStore.isAdmin;
    let isStaff = userStore.isStaff;

    if (to.meta.staffOnly && !isStaff) {
        return {name: 'login'};
    }

    if (to.meta.adminOnly && !isAdmin) {
        return isStaff ? {name: 'admin-home'} : {name: 'home'};
    }

    if (to.meta.auth && !loggedIn) {
        return {name: 'login'};
    }

    if (to.meta.redirectIfLogged && loggedIn) {
        if (isStaff) {
            return {name: 'admin-home'};
        }
        return {name: 'home'};
    }
});

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    NProgress.done();
});

export default router;
