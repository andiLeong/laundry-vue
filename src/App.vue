<template>
    <template v-if="loadAdminView">
        <div class="min-h-full" v-cloak>
            <AdminNavigation></AdminNavigation>
            <router-view></router-view>
        </div>
    </template>
    <template v-else>
        <div v-cloak>
            <h1 class="text-sky-600">Hello App!</h1>
            <p class="text-white bg-blue-400 p-2">
                <router-link to="/" class="mr-2">Go to Home</router-link>
                <router-link to="/about" class="mr-2">Go to About</router-link>
                <router-link to="/login" class="mr-2">Go to login</router-link>
            </p>
            <router-view></router-view>
        </div>
    </template>
</template>

<script setup>
import AdminNavigation from '@/components/admin/AdminNavigation.vue';
import {useUserStore} from '@/store/user';
import {computed, ref} from 'vue';
import {useRoute} from 'vue-router';

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
    'admin-promotion',
    'admin-expense',
    'admin-order-detail',
    'admin-product',
    'admin-service',
];

const route = useRoute();
// watch(
//     () => userStore.isLoggedIn,
//     (newValue) => {
//         loggedIn.value = newValue;
//     }
// );

// if (isAdmin || isStaff) {
//     router.push({name: 'admin-home'});
// }

console.log('is admin ' + isAdmin.value);
console.log('is staff ' + isStaff.value);
console.log('is customer ' + isCustomer.value);

const loadAdminView = computed(() => {
    return adminRoutes.includes(route.name);
});
</script>
