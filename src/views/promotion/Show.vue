<template>

    <nav class="bg-gray-50 w-full">
        <section
            class="mx-auto max-w-screen-2xl flex justify-between px-10 py-4"
        >
            <div>
                <p class="font-semibold">logo</p>
            </div>

            <div>
                <ul class="flex space-x-3">
                    <li>
                        <a
                            href=""
                            class="font-bold text-sm"
                            style="color: #374151"
                        >Home</a
                        >
                    </li>
                    <li>
                        <a
                            href=""
                            class="font-bold text-sm"
                            style="color: #374151"
                        >Service</a
                        >
                    </li>
                    <li>
                        <a
                            href=""
                            class="font-bold text-sm"
                            style="color: #374151"
                        >Promotions</a
                        >
                    </li>
                </ul>
            </div>

            <div>
                <button
                    style="color: #374151"
                    class="flex items-center font-bold text-sm"
                >
                    Login
                    <RightArrow class="ml-2 w-5 h-5"/>
                </button>
            </div>
        </section>
    </nav>

    <main class=" md:max-w-5xl md:mx-auto my-9 space-y-9">
        <div class="flex flex-col items-center space-y-2.5">
            <div class="self-start">
                <button @click.prevent="goToPromotion" style="color: #5130D3;line-height:normal"
                        class="inline-flex items-center font-bold text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-5 h-5 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
                    </svg>

                    Go Back
                </button>
            </div>
            <h1 class="text-5xl font-black text-black">20% OFF if you avail at 8am to 12 pm.</h1>
            <img src="/src/assets/promotion-details.png" alt="promotion-detail">
            <p style="color: #6B7280;line-height: normal;width: 500px" class="text-base font-normal text-center">Lorem
                ipsum, dolor
                sit amet
                consectetur
                adipisicing elit.
                Maiores impedit
                perferendis suscipit eaque, iste dolor cupiditate blanditiis.</p>
        </div>

        <div>
            <div class="px-5 py-6">
                <h3 style="color: #111827" class="font-medium text-lg">Promo Information</h3>
                <p style="color: #6B7280" class="text-sm font-normal mt-1">Promo validity August 31, 2023</p>
            </div>

            <div>
                <div style="" class="px-5 py-6 bg-gray-100">
                    <div class="md:grid grid-cols-3 gap-4">
                        <div>
                            <p style="color: #6B7280" class="text-sm font-medium">Promo Name</p>
                        </div>
                        <div class="col-span-2">
                            <p style="color: #111827" class="text-sm font-medium">20% OFF </p>
                        </div>
                    </div>
                </div>
                <div class="px-5 py-6">
                    <div class="md:grid grid-cols-3 gap-4">
                        <div>
                            <p style="color: #6B7280" class="text-sm font-medium">Promo Code</p>
                        </div>
                        <div class="col-span-2">
                            <p style="color: #111827" class="text-sm font-medium">200FFMORNINGAUG31</p>
                        </div>
                    </div>
                </div>
                <div class="px-5 py-6 bg-gray-100">
                    <div class="md:grid grid-cols-3 gap-4">
                        <div>
                            <p style="color: #6B7280" class="text-sm font-medium">Description</p>
                        </div>
                        <div class="col-span-2">
                            <p style="color: #111827" class="text-sm font-medium">Fugiat ipsum ipsum deserunt culpa
                                aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                                consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                                pariatur mollit ad adipisicing reprehenderit deserunt qui eu .!!
                                <br>
                                <br>
                                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa
                                consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit
                                nostrud in ea officia proident.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <button style="background: #5130D3;box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05); "
                    class="w-full text-white p-4 rounded-md text-sm font-medium"> Avail Promo
            </button>
        </div>
    </main>


    <AppFooter/>
</template>

<script setup>
import RightArrow from '@/svg/RightArrow.vue';
import AppFooter from '@/components/AppFooter.vue';
import {useRouter, useRoute} from "vue-router";

const router = useRouter()
const props = defineProps(['id'])

function goToPromotion() {
    router.push({
        name: 'promotion',
    });
}

</script>

<style scoped>

</style>