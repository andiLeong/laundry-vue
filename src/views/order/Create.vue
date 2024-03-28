<script setup>
import '@vuepic/vue-datepicker/dist/main.css';
import OrderCreationNavigation from '@/views/order/creation/OrderCreationNavigation.vue';
import Basic from '@/views/order/creation/Basic.vue';
import { useCreateOrderStore } from '@/store/createOrder.js';
import Product from '@/views/order/creation/Product.vue';

const orderStore = useCreateOrderStore();
</script>

<template>
    <div class="bg-gray-50 min-h-screen">
        <div
            class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8"
        >
            <OrderCreationNavigation />

            <div v-auto-animate>
                <Basic v-if="orderStore.step === 1" />
            </div>

            <div v-auto-animate>
                <Product v-if="orderStore.step === 2" />
            </div>

            <div v-auto-animate>
                <div v-if="orderStore.step === 3">step 3</div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
