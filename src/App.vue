<template>
    <template v-if="isAdmin">

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
    </template>
</template>

<script setup>
import AdminNavigation from "@/components/admin/AdminNavigation.vue";

const isAdmin = true
</script>
