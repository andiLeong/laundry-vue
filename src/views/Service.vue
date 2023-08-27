<script setup>
import AppFooter from '@/components/AppFooter.vue';
import AppNavigation from '@/components/AppNavigation.vue';
import Check from '@/svg/Check.vue';
import useFetchServices from '@/composable/useFetchServices.js';
import ServiceSkeleton from '@/components/skeleton/ServiceSkeleton.vue';
import MainLayout from '@/components/MainLayout.vue';

const { services, loading, error } = useFetchServices();
</script>

<template>
    <MainLayout>
        <AppNavigation />

        <main class="mx-auto max-w-screen-2xl my-9 space-y-10 w-full">
            <div class="text-center">
                <p
                    class="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
                >
                    Pricing Per Load
                </p>
                <p class="mt-2 text-center text-sm leading-8 text-gray-600">
                    Choose an affordable plan that’s packed with the best
                    features for engaging your audience
                </p>
            </div>

            <div
                class="isolate mt-10 grid grid-cols-1 gap-8 mx-8 lg:mx-5 lg:max-w-none lg:grid-cols-4"
            >
                <template v-if="loading">
                    <ServiceSkeleton v-for="index in 4" :key="index" />
                </template>
                <template v-else>
                    <template v-if="error">
                        <p class="validation-error">
                            Error loading service please try again
                        </p>
                    </template>
                    <template v-else>
                        <div
                            v-for="(service, index) in services"
                            :key="index"
                            :class="
                                service.id === 1
                                    ? 'ring-2 ring-indigo-500'
                                    : 'ring-1 ring-gray-200'
                            "
                            class="flex flex-col justify-between rounded-3xl bg-white px-8 py-10 mt-2 lg:mt-0"
                        >
                            <div>
                                <div
                                    class="flex items-center justify-between gap-x-4"
                                >
                                    <h3
                                        id="tier-freelancer"
                                        class="text-lg font-semibold leading-8 text-gray-900"
                                    >
                                        {{ service.name }}
                                    </h3>
                                </div>
                                <p class="mt-4 text-sm leading-6 text-gray-600">
                                    The essentials to provide your best work for
                                    clients.
                                </p>
                                <p class="mt-4 flex items-baseline gap-x-1">
                                    <span
                                        class="text-3xl font-bold tracking-tight text-gray-900"
                                        >P{{ service.price }}</span
                                    >
                                    <span
                                        class="text-sm font-semibold leading-6 text-gray-600"
                                        >/load</span
                                    >
                                </p>
                                <ul
                                    class="mt-8 space-y-1 text-sm leading-6 text-gray-600"
                                    role="list"
                                >
                                    <li class="flex gap-x-3">
                                        <Check
                                            class="h-6 w-5 flex-none text-indigo-600"
                                        />
                                        5 products
                                    </li>
                                    <li class="flex gap-x-3">
                                        <Check
                                            class="h-6 w-5 flex-none text-indigo-600"
                                        />
                                        Up to 1,000 subscribers
                                    </li>
                                    <li class="flex gap-x-3">
                                        <Check
                                            class="h-6 w-5 flex-none text-indigo-600"
                                        />
                                        Basic analytics
                                    </li>
                                    <li class="flex gap-x-3">
                                        <Check
                                            class="h-6 w-5 flex-none text-indigo-600"
                                        />
                                        48-hour support response time
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </template>
            </div>

            <div class="max-w-xl mx-auto px-2">
                <div class="space-y-2.5 text-center">
                    <p
                        class="text-base text-center"
                        style="color: #5130d3; line-height: normal"
                    >
                        Branches
                    </p>
                    <h1 class="text-2xl md:text-4xl font-black text-black">
                        Search Branches
                    </h1>
                    <p class="font-normal text-sm md:text-base text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Maiores impedit perferendis suscipit eaque, iste
                        dolor cupiditate blanditiis.
                    </p>
                </div>
                <div class="mt-4 grid grid-cols-3 px-8 md:px-1">
                    <input
                        class="col-span-2 p-2 md:p-3 rounded-md mr-2 border border-neutral-200"
                        placeholder="Enter Location"
                        type="text"
                    />
                    <button
                        class="text-white rounded"
                        style="background: #6366f1"
                    >
                        SEARCH
                    </button>
                </div>
            </div>

            <div class="px-8 md:px-20">
                <iframe
                    allowfullscreen=""
                    height="450"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.5832137785897!2d121.00890747465701!3d14.56581067792838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9982bce975b%3A0x8b9cacd7ecc29e64!2sThe%20Spex!5e0!3m2!1sen!2sph!4v1691932194624!5m2!1sen!2sph"
                    style="border: 0"
                    width="100%"
                ></iframe>
            </div>
        </main>
    </MainLayout>
    <AppFooter />
</template>

<style scoped></style>