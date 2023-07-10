<template>
    <div class="flex flex-1 flex-col lg:pl-64">
        <div
            class="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none"
        >
            <AdminTopNavigation></AdminTopNavigation>
        </div>

        <main class="flex-1 pb-8">
            <AdminHeader>
                <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Add money
                </button>
                <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                >
                    Send money
                </button>
            </AdminHeader>
            <slot />
        </main>
    </div>
</template>

<script setup>
import AdminTopNavigation from '@/components/admin/AdminTopNavigation.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
</script>

<style scoped></style>
