<template>
    <div class="flex flex-1 flex-col lg:pl-64">
        <div
            class="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none"
        >
            <AdminTopNavigation></AdminTopNavigation>
        </div>

        <main class="flex-1 pb-8">
            <AdminHeader>
                <slot name="left-button"></slot>
                <slot name="right-button"></slot>
            </AdminHeader>
            <slot />
        </main>
        <Notification />
    </div>
</template>

<script setup>
import AdminTopNavigation from '@/components/admin/AdminTopNavigation.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import Notification from '@/components/Notification.vue';
</script>

<style scoped></style>
