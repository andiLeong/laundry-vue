<script setup>
import { useRoute, useRouter } from 'vue-router';
import AppFooter from '@/components/AppFooter.vue';
import ChevronRight from '@/svg/ChevronRight.vue';
import MainLayout from '@/components/MainLayout.vue';
import Home from '@/svg/Home.vue';
import AppDashboardNavigation from '@/components/AppDashboardNavigation.vue';

const route = useRoute();
const router = useRouter();

console.log(route.params.id);
</script>

<template>
    <MainLayout>
        <main class="px-8 max-auto max-w-screen-2xl w-full mb-16">
            <div class="my-6 flex items-center space-x-2 px-8">
                <div>
                    <Home class="h-5 w-5" style="color: #6b7280" />
                </div>
                <div>
                    <p class="font-normal text-xs">Home</p>
                </div>
                <div>
                    <ChevronRight class="h-5 w-5" style="color: #6b7280" />
                </div>
                <div>
                    <p
                        class="font-bold text-xs capitalize"
                        style="color: #8b5cf6"
                    >
                        {{ route.name }}
                    </p>
                </div>
            </div>

            <section class="md:grid grid-cols-5 gap-12">
                <AppDashboardNavigation />
                <section class="col-span-4">
                    <header class="col-span-4 py-5 px-6 hidden">
                        <h2 class="text-gray-900 text-lg font-medium">
                            INVOICE
                        </h2>
                        <p class="text-gray-500 text-sm font-normal">
                            Order #{{ route.params.id }}
                        </p>
                    </header>
                    <div
                        class="px-10 py-12 border border-slate-200 space-y-16 shadow-md rounded-md"
                    >
                        <div class="flex justify-between items-start">
                            <div class="space-y-2">
                                <div>
                                    <p
                                        class="text-base font-medium"
                                        style="color: #1c2434"
                                    >
                                        to
                                    </p>
                                    <p
                                        class="text-xl font-medium"
                                        style="color: #1c2434"
                                    >
                                        Juan Dela Cruz
                                    </p>
                                </div>
                                <p class="text-slate-500 font-normal text-sm">
                                    Phone: 09262611369
                                </p>
                                <p class="text-slate-500 font-normal text-sm">
                                    Address: Spex,Stain Paul Str, Makati City
                                </p>
                            </div>
                            <div>
                                <p
                                    class="font-medium text-xl"
                                    style="color: #1c2434"
                                >
                                    Order #{{ route.params.id }}
                                </p>
                            </div>
                        </div>

                        <div
                            class="p-7 border border-slate-200 flex items-center justify-between"
                        >
                            <div class="w-2/3">
                                <p
                                    class="text-sm font-medium"
                                    style="color: #0f2851"
                                >
                                    Laundry Soap Bar
                                </p>
                            </div>

                            <div class="w-1/3 flex items-center">
                                <p
                                    class="text-base font-medium flex-1"
                                    style="color: #1c2434"
                                >
                                    Qty:2
                                </p>

                                <p
                                    class="text-base font-medium"
                                    style="color: #0f2851"
                                >
                                    P 420
                                </p>
                            </div>
                        </div>

                        <div class="flex w-full">
                            <div class="flex justify-between w-2/5 flex-1">
                                <div>
                                    <p class="font-medium text-slate-800">
                                        Shipping Method
                                    </p>
                                    <p class="text-slate-400 mt-1">
                                        Take up to 3 working days.
                                    </p>
                                </div>

                                <div>
                                    <p class="font-medium text-slate-800">
                                        Payment Method
                                    </p>
                                    <p class="text-slate-400 mt-1">Cash</p>
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
                                                Shipping Cost (+)
                                            </p>
                                        </div>
                                        <div class="flex flex-col items-end">
                                            <p
                                                class="font-medium text-slate-800"
                                            >
                                                ₱ 420.00
                                            </p>
                                            <p
                                                class="font-medium text-slate-800"
                                            >
                                                ₱ 30.00
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-end mt-8 space-x-20">
                                    <p class="text-slate-400">Subtotal</p>
                                    <p class="font-medium text-slate-800">
                                        ₱ 420.00
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end items-center">
                            <button
                                class="text-primary bg-white py-3 px-8 rounded text-center border border-primary border-blue-400 mr-3"
                            >
                                Send
                            </button>
                            <button
                                class="text-white bg-primary py-3 px-8 rounded text-center"
                            >
                                Download
                            </button>
                        </div>
                    </div>
                </section>
            </section>
        </main>
        <AppFooter />
    </MainLayout>
</template>

<style scoped></style>