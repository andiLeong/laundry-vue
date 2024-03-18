<template>
    <template v-if="loadAdminView">
        <div v-cloak class="min-h-full">
            <AdminNavigation></AdminNavigation>
            <router-view></router-view>
        </div>
    </template>
    <template v-else>
        <router-view></router-view>
    </template>
</template>

<script setup>
import AdminNavigation from '@/components/admin/AdminNavigation.vue';
import { useUserStore } from '@/store/user';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();

const loggedIn = ref(userStore.isLoggedIn);
const isAdmin = ref(userStore.isAdmin);
const isStaff = ref(userStore.isStaff);
const isCustomer = ref(userStore.isCustomer);
const adminRoutes = [
    'admin-home',
    'admin-order',
    'admin-user',
    'admin-stat',
    'admin-order-create',
    'admin-profile',
    'admin-password',
    'admin-promotion',
    'admin-expense',
    'admin-order-detail',
    'admin-product',
    'admin-service',
    'admin-attendance',
    'admin-place',
    'admin-report-to-work',
    'admin-order-gcash-create',
    'admin-order-invoice-create',
    'admin-order-paid-record',
    'admin-shift',
    'admin-salary',
    'admin-salary-detail',
    'admin-order-label',
    'admin-order-edit',
];

const route = useRoute();

const loadAdminView = computed(() => {
    return adminRoutes.includes(route.name);
});

onMounted(() => {
    let loader = document.getElementById('loader-wrapper');
    loader.parentNode.removeChild(loader);
});

if (loadAdminView.value) {
    let root = document.getElementsByTagName('html')[0];
    root.setAttribute('class', 'h-full bg-gray-100');
}
</script>
