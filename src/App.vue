<template>
    <template v-if="isStaff">
        <div class="min-h-full">
            <AdminNavigation></AdminNavigation>
            <router-view></router-view>
        </div>
    </template>
    <template v-else>
        <h1 class="text-sky-600">Hello App!</h1>
        <p class="text-red-500 bg-blue-400">
            <router-link to="/">Go to Home</router-link>
            <router-link to="/about">Go to About</router-link>
        </p>
        <router-view></router-view>
    </template>
</template>

<script setup>
import AdminNavigation from '@/components/admin/AdminNavigation.vue';
import { useUserStore } from '@/store/user';
import { ref } from 'vue';

const userStore = useUserStore();

const loggedIn = ref(userStore.isLoggedIn);
const isAdmin = ref(userStore.isAdmin);
const isStaff = ref(userStore.isStaff);
const isCustomer = ref(userStore.isCustomer);

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
</script>
