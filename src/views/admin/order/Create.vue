<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import AppTab from '@/components/AppTab.vue';
import AppTabs from '@/components/AppTabs.vue';
import CreateOrder from '@/components/admin/CreateOrder.vue';
import CreateOrderWithPromotion from '@/components/admin/CreateOrderWithPromotion.vue';
import useFetchServices from '@/composable/useFetchServices.js';

const { services } = useFetchServices();
</script>

<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl lg:mx-auto mt-10 mx-4">
                <AppTabs id="create-order-tab">
                    <AppTab title="Without Promotion" :active="true">
                        <CreateOrder :services="services" />
                    </AppTab>
                    <AppTab title="With Promotion">
                        <CreateOrderWithPromotion :services="services" />
                    </AppTab>
                </AppTabs>
            </section>
        </main>
    </AdminLayout>
</template>

<style scoped></style>
