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
        <main class="px-8 mx-auto max-w-screen-2xl w-full mb-16">
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
                <AppDashboardNavigation :need-border="false" />
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
                        class="px-10 py-12 border border-t-8 border-t-sky-500 space-y-16 shadow-md rounded-md relative overflow-hidden"
                    >
                        <div class="flex justify-between items-start">
                            <div class="space-y-2">
                                <div>
                                    <p
                                        class="text-xl font-medium text-slate-800"
                                    >
                                        Juan Dela Cruz
                                    </p>
                                </div>
                                <p class="text-slate-500 font-normal text-sm">
                                    09262611369
                                </p>
                                <p class="text-slate-500 font-normal text-sm">
                                    Spex, Stain Paul Str, Makati City
                                </p>
                            </div>
                            <div>
                                <p class="font-medium text-xl text-slate-800">
                                    #{{ route.params.id }}
                                </p>
                            </div>
                        </div>

                        <div
                            class="p-5 border border-l-4 border-l-sky-300 border-slate-200 flex items-center justify-between"
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
                                <div class="flex-1 flex items-center">
                                    <p class="text-slate-400">#</p>
                                    <p class="text-slate-700 font-medium">2</p>
                                </div>
                                <div class="flex items-center">
                                    <p class="text-slate-400">₱</p>
                                    <p class="text-slate-700 font-medium">
                                        420
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="flex w-full">
                            <div class="flex justify-between w-2/5 flex-1">
                                <div>
                                    <p class="font-medium text-slate-700">
                                        Shipping Method
                                    </p>
                                    <p class="text-slate-400 mt-1">
                                        Take up to 3 working days.
                                    </p>
                                </div>

                                <div>
                                    <p class="font-medium text-slate-700">
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
                                            <div class="flex items-center">
                                                <span
                                                    class="text-slate-300 mr-0.5"
                                                    >₱</span
                                                >
                                                <p
                                                    class="font-medium text-slate-600"
                                                >
                                                    420.00
                                                </p>
                                            </div>
                                            <div class="flex items-center">
                                                <span
                                                    class="text-slate-300 mr-0.5"
                                                    >₱</span
                                                >
                                                <p
                                                    class="font-medium text-slate-600"
                                                >
                                                    30.00
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-end mt-8 space-x-20">
                                    <p class="text-slate-400">Subtotal</p>

                                    <div class="flex items-center">
                                        <span class="text-slate-300 mr-0.5"
                                            >₱</span
                                        >
                                        <p class="font-medium text-slate-600">
                                            450.00
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
                </section>
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
