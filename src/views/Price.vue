<script setup>
import { ref } from 'vue';
import Phone from '@/svg/Phone.vue';
import Facebook from '@/svg/Facebook.vue';
import Flag from '@/svg/Flag.vue';

const primary = ref([
    {
        item: 'wash up to 8kg',
        price: 60,
    },
    {
        item: 'dry up to 8kg',
        price: 60,
    },
    {
        item: 'Full service up to 8kg',
        price: 170,
    },
    {
        item: 'Full service up to 10kg',
        price: 210,
    },
    {
        item: 'Full service up to 4kg',
        price: 160,
    },
    {
        item: 'wash up to 10kg',
        price: 80,
    },
    {
        item: 'dry up to 10kg',
        price: 80,
    },
    {
        item: 'bedding & towel up to 5kg',
        price: 170,
    },
    {
        item: 'comforter per piece',
        price: 170,
    },
]);

const secondary = ref([
    {
        item: 'Fold only with perfume',
        price: 30,
    },
    {
        item: 'Extra dry per 10 mins',
        price: 20,
    },
    {
        item: 'Extra rinse per 16 mins',
        price: 15,
    },
    {
        item: 'Extra wash per 16 mins',
        price: 15,
    },
    {
        item: 'Extra spin per 11 mins',
        price: 15,
    },
    {
        item: 'Hot water wash',
        price: 90,
    },
    {
        item: 'Warm water wash',
        price: 40,
    },
    {
        item: 'Delicate wash',
        price: 90,
    },
]);

let number = import.meta.env.VITE_APP_PHONE_NUMBER;
let facebookName = import.meta.env.VITE_APP_FACEBOOK;
let address = import.meta.env.VITE_APP_ADDRESS;
</script>

<template>
    <div id="price" class="max-w-xl mx-auto price-page-bg">
        <div class="flex flex-col justify-center items-center">
            <div class="mt-12">
                <img
                    class="w-96"
                    src="/purple-logo-with-text-no-bg.png"
                    alt=""
                />
            </div>
            <div class="mt-3">
                <button
                    class="uppercase py-2 px-5 text-white rounded font-semibold"
                    style="background: #6d6dc6"
                >
                    pricelist
                </button>
            </div>
        </div>

        <div class="content px-10 py-5">
            <div>
                <h1 class="text-2xl font-semibold text-slate-600 uppercase">
                    primary
                </h1>
                <ul class="space-y-2 mt-4">
                    <li
                        v-for="(pri, index) in primary"
                        :key="index"
                        class="flex items-center justify-between"
                    >
                        <p class="text-xl text-slate-500 uppercase">
                            {{ pri.item }}
                        </p>
                        <p class="text-xl text-slate-500">₱{{ pri.price }}</p>
                    </li>
                </ul>
            </div>

            <div class="mt-5">
                <h1 class="text-2xl font-semibold text-slate-600 uppercase">
                    secondary
                </h1>
                <ul class="space-y-2 mt-4">
                    <li
                        v-for="(pri, index) in secondary"
                        :key="index"
                        class="flex items-center justify-between"
                    >
                        <p class="text-xl text-slate-500 uppercase">
                            {{ pri.item }}
                        </p>
                        <p class="text-xl text-slate-500">₱{{ pri.price }}</p>
                    </li>
                </ul>
            </div>

            <div class="mt-5">
                <h1 class="text-2xl font-semibold text-slate-600 uppercase">
                    Pickup & delivery
                </h1>
                <div class="mt-4 space-y-1">
                    <div class="flex items-center">
                        <Phone class="w-4 h-4 text-primary mr-2.5" />
                        <p class="text-xl text-slate-500 uppercase">
                            {{ number }}
                        </p>
                    </div>
                    <div class="flex items-center">
                        <Facebook class="h-5 w-5 text-primary mr-2" />
                        <p class="text-xl text-slate-500 uppercase">
                            {{ facebookName }}
                        </p>
                    </div>
                    <div class="flex items-center">
                        <Flag class="h-5 w-5 text-primary mr-2" />
                        <p class="text-xl text-slate-500 uppercase">
                            {{ address }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>