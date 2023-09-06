<script setup>
import { useRoute, useRouter } from 'vue-router';
import AppFooter from '@/components/AppFooter.vue';
import MainLayout from '@/components/MainLayout.vue';
import { default as AppDashboardNavigation } from '@/components/dashboard/Navigation.vue';
import useFetchOrder from '@/composable/useFetchOrder.js';
import OrderDetailSkeleton from '@/components/skeleton/OrderDetailSkeleton.vue';
import moment from 'moment';
import { useUserStore } from '@/store/user.js';
import Breadcrumbs from '@/components/dashboard/Breadcrumbs.vue';

const route = useRoute();
const router = useRouter();
const user = useUserStore();

const { loading, order, error } = useFetchOrder(`api/order/${route.params.id}`);
</script>

<template>
    <MainLayout>
        <main class="px-8 mx-auto max-w-screen-2xl w-full mb-16">
            <Breadcrumbs />

            <section class="md:grid grid-cols-5 gap-12">
                <AppDashboardNavigation :need-border="false" />
                <div class="md:col-span-2 lg:col-span-4 p-3">
                    <section v-if="loading">
                        <OrderDetailSkeleton />
                    </section>
                    <template v-else>
                        <template v-if="error">
                            <p>{{ error.response.data.message }}</p>
                        </template>
                        <template v-else>
                            <div
                                class="px-10 py-12 border border-t-8 border-t-sky-500 space-y-16 shadow-md rounded-md relative overflow-hidden"
                            >
                                <div class="flex justify-between items-start">
                                    <div class="space-y-2">
                                        <div>
                                            <p
                                                class="text-xl font-medium text-slate-800"
                                            >
                                                {{ user.fullName }}
                                            </p>
                                        </div>
                                        <p
                                            class="text-slate-500 font-normal text-sm"
                                        >
                                            {{ user.phone }}
                                        </p>
                                        <p
                                            class="text-slate-500 font-normal text-sm"
                                        >
                                            Spex, Stain Paul Str, Makati City
                                        </p>
                                        <p
                                            class="text-slate-500 font-normal text-sm"
                                        >
                                            {{
                                                moment(order.created_at).format(
                                                    'YYYY-MM-DD HH:mm',
                                                )
                                            }}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            class="font-medium text-xl text-slate-800"
                                        >
                                            #{{ route.params.id }}
                                        </p>
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <div
                                        v-for="(
                                            product, index
                                        ) in order.product_order"
                                        :key="index"
                                        class="p-5 border border-slate-200 flex items-center justify-between"
                                    >
                                        <div class="w-2/3">
                                            <p
                                                class="text-sm font-medium"
                                                style="color: #0f2851"
                                            >
                                                {{ product.name }}
                                            </p>
                                        </div>

                                        <div class="w-1/3 flex items-center">
                                            <div
                                                class="flex-1 flex items-center"
                                            >
                                                <p class="text-slate-400">#</p>
                                                <p
                                                    class="text-slate-700 font-medium"
                                                >
                                                    {{ product.quantity }}
                                                </p>
                                            </div>
                                            <div class="flex items-center">
                                                <p class="text-slate-400">₱</p>
                                                <p
                                                    class="text-slate-700 font-medium"
                                                >
                                                    {{ product.price }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex w-full">
                                    <div
                                        class="flex justify-between w-2/5 flex-1"
                                    >
                                        <div>
                                            <p
                                                class="font-medium text-slate-700"
                                            >
                                                Service
                                            </p>
                                            <p class="text-slate-400 mt-1">
                                                {{ order.service_name }}
                                            </p>
                                        </div>

                                        <div>
                                            <p
                                                class="font-medium text-slate-700"
                                            >
                                                Payment
                                            </p>
                                            <p class="text-slate-400 mt-1">
                                                {{ order.payment }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="w-3/5">
                                        <div class="flex justify-end">
                                            <div
                                                class="space-x-20 flex items-center border-b border-b-slate-200 pb-3"
                                            >
                                                <div>
                                                    <p class="text-slate-400">
                                                        Subtotal
                                                    </p>
                                                    <p class="text-slate-400">
                                                        Products
                                                    </p>
                                                </div>
                                                <div
                                                    class="flex flex-col items-end"
                                                >
                                                    <div
                                                        class="flex items-center"
                                                    >
                                                        <span
                                                            class="text-slate-400 mr-0.5"
                                                            >₱</span
                                                        >
                                                        <p
                                                            class="font-medium text-slate-600"
                                                        >
                                                            {{ order.amount }}
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="flex items-center"
                                                    >
                                                        <span
                                                            class="text-slate-400 mr-0.5"
                                                            >₱</span
                                                        >
                                                        <p
                                                            class="font-medium text-slate-600"
                                                        >
                                                            {{
                                                                order.product_amount
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="flex justify-end mt-8 space-x-20"
                                        >
                                            <p class="text-slate-400">Total</p>

                                            <div class="flex items-center">
                                                <span
                                                    class="text-slate-400 mr-0.5"
                                                    >₱</span
                                                >
                                                <p
                                                    class="font-medium text-slate-600"
                                                >
                                                    {{ order.total_amount }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-end items-center">
                                    <button
                                        class="text-sky-500 bg-white py-3 px-8 rounded text-center border border-sky-500 mr-3"
                                    >
                                        Send
                                    </button>
                                    <button
                                        class="text-white bg-sky-500 py-3 px-8 rounded text-center"
                                    >
                                        Download
                                    </button>
                                </div>

                                <div
                                    id="svg"
                                    class="absolute bottom-0 left-0 hidden md:block rotate-45 -ml-10"
                                    style="height: 160px; width: 160px"
                                ></div>
                            </div>
                        </template>
                    </template>
                </div>
            </section>
        </main>
        <AppFooter />
    </MainLayout>
</template>

<style scoped>
#svg {
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23cbd5e1' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>