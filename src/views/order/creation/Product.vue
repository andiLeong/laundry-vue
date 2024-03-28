<script setup>
import { ref } from 'vue';
import { useCreateOrderStore } from '@/store/createOrder.js';

const orderStore = useCreateOrderStore();

const delivery_fee = ref(orderStore.delivery_fee);
const total_amount = ref(orderStore.total_amount);
const selected_service = ref(null);
const product = ref(orderStore.product);
const product_total_amount = ref(orderStore.product_total_amount);

function calculateTotalAmount() {
    total_amount.value =
        delivery_fee.value + orderStore.amount + product_total_amount;
}

function next() {
    orderStore.step += 1;
    orderStore.total_amount = total_amount.value;
    orderStore.product_total_amount = product_total_amount.value;
}

function back() {
    orderStore.step -= 1;
}

calculateTotalAmount();
</script>

<template>
    <div v-auto-animate>
        <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
                <div class="mt-5 border-t border-gray-200">
                    <div
                        class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                    >
                        <div class="sm:col-span-2">
                            <label
                                for="address"
                                class="block text-sm font-medium text-gray-700"
                                >Address</label
                            >
                            <div class="mt-1">
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    autocomplete="street-address"
                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        product wizard
                    </div>
                </div>
            </div>

            <!-- Order summary -->
            <div class="mt-10 lg:mt-0">
                <div
                    class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm"
                >
                    <dl
                        class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6"
                    >
                        <div class="flex items-center justify-between">
                            <dt class="text-sm">Service</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                ₱{{ orderStore.amount }}
                            </dd>
                        </div>
                        <div class="flex items-center justify-between">
                            <dt class="text-sm">Delivery Fee</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                ₱{{ delivery_fee }}
                            </dd>
                        </div>
                        <div class="flex items-center justify-between">
                            <dt class="text-sm">Discount</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                - ₱0
                            </dd>
                        </div>
                        <div
                            class="flex items-center justify-between border-t border-gray-200 pt-6"
                        >
                            <dt class="text-base font-medium">Total</dt>
                            <dd class="text-base font-medium text-gray-900">
                                ₱{{ total_amount }}
                            </dd>
                        </div>
                    </dl>

                    <div
                        class="border-t border-gray-200 px-4 py-6 sm:px-6 flex items-center justify-between"
                    >
                        <button type="button" @click.prevent="back">
                            back
                        </button>
                        <button
                            type="button"
                            @click.prevent="next"
                            class="rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped></style>
