<script setup>
import {ref} from 'vue';
import RightArrow from '@/svg/RightArrow.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppNavigation from '@/components/AppNavigation.vue'

const services = ref([
    {
        id: 1,
        name: 'Full Service up to 10kg',
        price: 200,
    },
    {
        id: 2,
        name: 'Self Service wash only',
        price: 65,
    },
    {
        id: 3,
        name: 'Self Service dryer only',
        price: 75,
    },
    {
        id: 4,
        name: 'Full Service up to 4kg',
        price: 180,
    },
]);
</script>

<template>
    <AppNavigation/>

    <main class="mx-auto max-w-screen-2xl my-9 space-y-10">
        <div class="text-center">
            <p
                class="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
            >
                Pricing Per Load
            </p>
            <p class="mt-2 text-center text-sm leading-8 text-gray-600">
                Choose an affordable plan that’s packed with the best features
                for engaging your audience
            </p>
        </div>

        <div
            class="isolate mt-10 grid grid-cols-1 gap-8 mx-8 lg:mx-5 lg:max-w-none lg:grid-cols-4"
        >
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
                    <div class="flex items-center justify-between gap-x-4">
                        <h3
                            id="tier-freelancer"
                            class="text-lg font-semibold leading-8 text-gray-900"
                        >
                            {{ service.name }}
                        </h3>
                    </div>
                    <p class="mt-4 text-sm leading-6 text-gray-600">
                        The essentials to provide your best work for clients.
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
                        role="list"
                        class="mt-8 space-y-1 text-sm leading-6 text-gray-600"
                    >
                        <li class="flex gap-x-3">
                            <svg
                                class="h-6 w-5 flex-none text-indigo-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            5 products
                        </li>
                        <li class="flex gap-x-3">
                            <svg
                                class="h-6 w-5 flex-none text-indigo-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Up to 1,000 subscribers
                        </li>
                        <li class="flex gap-x-3">
                            <svg
                                class="h-6 w-5 flex-none text-indigo-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Basic analytics
                        </li>
                        <li class="flex gap-x-3">
                            <svg
                                class="h-6 w-5 flex-none text-indigo-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            48-hour support response time
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="max-w-xl mx-auto px-2">
            <div class="space-y-2.5 text-center">
                <p
                    style="color: #5130d3; line-height: normal"
                    class="text-base text-center"
                >
                    Branches
                </p>
                <h1 class="text-2xl md:text-4xl font-black text-black">
                    Search Branches
                </h1>
                <p class="font-normal text-sm md:text-base text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores impedit perferendis suscipit eaque, iste dolor
                    cupiditate blanditiis.
                </p>
            </div>
            <div class="mt-4 grid grid-cols-3 px-8 md:px-1">
                <input
                    type="text"
                    class="col-span-2 p-2 md:p-3 rounded-md mr-2 border border-neutral-200"
                    placeholder="Enter Location"
                />
                <button style="background: #6366f1" class="text-white rounded">
                    SEARCH
                </button>
            </div>
        </div>

        <div class="px-8 md:px-20">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.5832137785897!2d121.00890747465701!3d14.56581067792838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9982bce975b%3A0x8b9cacd7ecc29e64!2sThe%20Spex!5e0!3m2!1sen!2sph!4v1691932194624!5m2!1sen!2sph"
                width="100%"
                height="450"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    </main>

    <AppFooter/>
</template>

<style scoped></style>
