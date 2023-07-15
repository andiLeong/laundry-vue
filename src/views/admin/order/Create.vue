<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import AppTab from '@/components/AppTab.vue';
import AppTabs from '@/components/AppTabs.vue';
import CreateOrder from "@/components/admin/CreateOrder.vue";
</script>

<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <AppTabs id="create-order-tab">
                    <AppTab title="Without Promotion" :active="true">
                        <CreateOrder/>
                    </AppTab>
                    <AppTab title="With Promotion">
                        <p>Hello world again. second</p>
                    </AppTab>
                </AppTabs>
            </section>
        </main>
    </AdminLayout>
</template>

<style scoped></style>
