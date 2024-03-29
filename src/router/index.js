import { createRouter, createWebHistory } from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useUserStore } from '@/store/user';

const routes = [
    { path: '/', name: 'home', component: () => import('@/views/Home.vue') },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: { redirectIfLogged: true },
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/Signup.vue'),
        meta: { redirectIfLogged: true },
    },
    {
        path: '/verify',
        name: 'verify',
        component: () => import('@/views/Verify.vue'),
        meta: { redirectIfLogged: true },
    },
    {
        path: '/service',
        name: 'service',
        component: () => import('@/views/Service.vue'),
    },
    {
        path: '/price',
        name: 'price',
        component: () => import('@/views/Price.vue'),
    },
    {
        path: '/promotion',
        name: 'promotion',
        component: () => import('@/views/promotion/Promotion.vue'),
    },
    {
        path: '/promotion/:slug',
        name: 'promotion-detail',
        component: () => import('@/views/promotion/Show.vue'),
        props: true,
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order/Order.vue'),
        meta: { auth: true },
    },
    {
        path: '/order/:id',
        name: 'order-detail',
        component: () => import('@/views/order/Show.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue'),
        meta: { auth: true },
    },
    {
        path: '/address',
        name: 'address',
        component: () => import('@/views/address/Address.vue'),
        meta: { auth: true },
    },
    {
        path: '/address/create',
        name: 'address-create',
        component: () => import('@/views/address/Create.vue'),
        meta: { auth: true },
    },
    {
        path: '/20pesos-off',
        name: '20pesos-off',
        component: () => import('@/views/PesosOff.vue'),
    },
    {
        path: '/admin/home',
        name: 'admin-home',
        component: () => import('@/views/admin/Home.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/order',
        name: 'admin-order',
        component: () => import('@/views/admin/order/Order.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/order-paid-record',
        name: 'admin-order-paid-record',
        component: () => import('@/views/admin/order/OrderPaidRecord.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/order-invoice-record',
        name: 'admin-order-invoice-record',
        component: () => import('@/views/admin/order/invoice/Invoice.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/order-gcash/create/:id',
        name: 'admin-order-gcash-create',
        component: () => import('@/views/admin/order/gcash/Create.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/order-invoice/create',
        name: 'admin-order-invoice-create',
        component: () => import('@/views/admin/order/invoice/Create.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/order/:id',
        name: 'admin-order-detail',
        component: () => import('@/views/admin/order/Show.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/promotion',
        name: 'admin-promotion',
        component: () => import('@/views/admin/Promotion.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/salary',
        name: 'admin-salary',
        component: () => import('@/views/admin/Salary.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/salary/:id',
        name: 'admin-salary-detail',
        component: () => import('@/views/admin/SalaryDetail.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/order/create',
        name: 'admin-order-create',
        component: () => import('@/views/admin/order/Create.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/order/edit/:id',
        name: 'admin-order-edit',
        component: () => import('@/views/admin/order/Edit.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/order/label',
        name: 'admin-order-label',
        component: () => import('@/components/admin/CreateOrderLabel.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/user',
        name: 'admin-user',
        component: () => import('@/views/admin/User.vue'),
        meta: { adminOnly: true },
    },
    {
        path: '/attendance',
        name: 'admin-attendance',
        component: () => import('@/views/admin/Attendance.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/shift',
        name: 'admin-shift',
        component: () => import('@/views/admin/Shift.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/report-to-work',
        name: 'admin-report-to-work',
        component: () => import('@/views/admin/ReportToWork.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/stat',
        name: 'admin-stat',
        component: () => import('@/views/admin/Stat.vue'),
        meta: { adminOnly: true },
    },
    {
        path: '/admin/expense',
        name: 'admin-expense',
        component: () => import('@/views/admin/Expense.vue'),
        meta: { adminOnly: true },
    },
    {
        path: '/admin/profile',
        name: 'admin-profile',
        component: () => import('@/views/admin/Profile.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/password',
        name: 'admin-password',
        component: () => import('@/views/admin/Password.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/product',
        name: 'admin-product',
        component: () => import('@/views/admin/Product.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/service',
        name: 'admin-service',
        component: () => import('@/views/admin/Service.vue'),
        meta: { staffOnly: true },
    },
    {
        path: '/admin/place',
        name: 'admin-place',
        component: () => import('@/views/admin/Place.vue'),
        meta: { staffOnly: true },
    },
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
            new Promise(resolve => {
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
        return isStaff ? { name: 'admin-home' } : { name: 'home' };
    }

    if (to.meta.auth && !loggedIn) {
        return { name: 'login' };
    }

    if (to.meta.redirectIfLogged && loggedIn) {
        if (isStaff) {
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
