<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <div v-if="order" class="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div class="px-4 py-6 sm:px-6">
                        <h3 class="text-base font-semibold leading-7 text-gray-900">Order Detail</h3>
                    </div>
                    <div class="border-t border-gray-100">
                        <dl class="divide-y divide-gray-100">
                            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">ID</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    #{{ order.id }}
                                </dd>
                            </div>
                            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">Service</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ order.service.name }}
                                </dd>
                            </div>
                            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">Total Amount</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    P{{ order.total_amount }}
                                </dd>
                            </div>
                            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">Product Amount</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    P{{ order.product_amount }}
                                </dd>
                            </div>
                            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">Service Amount</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    P{{ order.amount }}
                                </dd>
                            </div>
                            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">Name</dt>
                                <dd v-if="order.user"
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ order?.user?.first_name }} , {{ order?.user?.middle_name }},
                                    {{ order?.user?.last_name }}
                                </dd>
                            </div>
                            <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-900">Phone</dt>
                                <dd v-if="order.user"
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ order?.user?.phone }}
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Promotions</dt>
                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul v-if="order.promotions.length > 0" role="list"
                                        class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        <li
                                            v-for="(promotion,index) in order.promotions"
                                            :key="index"
                                            class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div class="flex w-0 flex-1 items-center">
                                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span
                                                        class="truncate font-medium">{{ promotion.name }}</span>
                                                    <span
                                                        class="flex-shrink-0 text-gray-400">{{
                                                            discount(promotion.discount)
                                                        }}% Off</span>
                                                </div>
                                            </div>
                                            <div class="ml-4 flex-shrink-0"></div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>

                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Products</dt>
                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul v-if="order.product_order.length > 0" role="list"
                                        class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        <li
                                            v-for="(product,index) in order.product_order"
                                            :key="index"
                                            class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div class="flex w-0 flex-1 items-center">
                                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span
                                                        class="truncate font-medium">{{ product.name }}</span>
                                                    <span
                                                        class="flex-shrink-0 text-gray-400">{{
                                                            product.price
                                                        }} * {{ product.pivot.quantity }}</span>
                                                </div>
                                            </div>
                                            <div class="ml-4 flex-shrink-0"></div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>
        </main>
    </AdminLayout>

</template>

<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import useFetchOrder from "@/composable/useFetchOrder.js";
import {useRoute} from "vue-router";

const route = useRoute()
const {loading, order, error} = useFetchOrder(route.params.id)

function discount(dis) {
    return dis * 100
}

</script>
<style scoped>

</style>