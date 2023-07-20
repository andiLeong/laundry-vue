<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <div class="mt-8">
                <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <h2 class="text-lg font-medium leading-6 text-gray-900">
                        Overview
                    </h2>
                    <StatCollection />
                </div>
            </div>
        </main>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import StatCollection from '@/components/admin/StatCollection.vue';
</script>

<style scoped></style>
