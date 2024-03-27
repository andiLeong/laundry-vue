<script setup>
import '@vuepic/vue-datepicker/dist/main.css';
import OrderCreationNavigation from '@/views/order/creation/OrderCreationNavigation.vue';
import Basic from '@/views/order/creation/Basic.vue';
import { useCreateOrderStore } from '@/store/createOrder.js';

const orderStore = useCreateOrderStore();
</script>

<template>
    <div class="bg-gray-50 min-h-screen">
        <div
            class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8"
        >
            <OrderCreationNavigation />
            <Basic v-if="orderStore.step === 1" />
            <div v-if="orderStore.step === 2">step 2</div>
        </div>
    </div>
</template>

<style scoped></style>
