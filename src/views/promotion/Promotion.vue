<template>

    <AppNavigation/>

    <section class="promotion-bg py-12 md:py-8 px-4 w-full flex items-center justify-center">
        <div class="text-center">
            <h1 style="letter-spacing: -0.25px;" class="text-white text-3xl font-bold mb-6 md:mb-2">Avail our
                Promos!!</h1>
            <p style="letter-spacing: -0.25px;max-width: 500px" class="text-white text-base font-normal">Lorem ipsum,
                dolor sit amet
                consectetur
                adipisicing elit.
                Maiores impedit
                perferendis suscipit eaque,
                iste dolor cupiditate blanditiis.</p>
        </div>
    </section>

    <main class="need-line-bg mx-auto max-w-screen-2xl px-8 md:px-20 py-9">
        <section class="lg:grid grid-cols-2 gap-9 pb-16 space-y-10 lg:space-y-0">
            <div
                v-for="promotion in promotions"
                :key="promotion.id"
                @click.prevent='goToDetail(promotion.id)'
                style="box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
                class="cursor-pointer bg-white rounded-sm md:flex border border-slate-200">
                <div>
                    <img class="hidden md:block mix-blend-multiply" :src="promotion.image"
                         alt="promotion-1">
                    <img class="block md:hidden mix-blend-multiply" :src="promotion.largeImage"
                         alt="promotion-1">
                </div>
                <div class="p-4">
                    <p style="color:#6366F1;font-size: 0.75rem;line-height: 20px" class="font-semibold">until 29 Aug,
                        2023</p>
                    <h2 style="color: #1E293B;letter-spacing: -0.25px;" class="font-bold text-lg mt-2">20% OFF </h2>
                    <h3 style="color: #1E293B;letter-spacing: -0.25px;" class="font-bold text-lg">if you avail at 8am to
                        12 pm.</h3>
                    <p style="color: #475569;" class="text-xs mt-2">Lorem ipsum is placeholder text commonly used in the
                        graphic, print, and
                        publishing industries
                        for
                        previewing layouts.</p>

                    <div class="flex mt-3">
                        <div style="background: #F1F5F9;" class="flex items-center rounded-2xl py-1 px-2 ">
                            <div class="mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16"
                                     fill="none">
                                    <ellipse cx="7.5" cy="6.99388" rx="2" ry="1.99827" fill="#94A3B8"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M6.09107 15.0558C6.49517 15.4136 6.77478 15.6612 6.8 15.6864C7.2 16.0861 7.8 16.0861 8.2 15.7863C8.25 15.7364 9.27502 14.8122 10.3 13.888C11.325 12.9638 12.35 12.0396 12.4 11.9896C13.8 10.6908 14.5 8.89231 14.5 6.99395C14.5 3.09732 11.4 0 7.5 0C3.6 0 0.5 3.09732 0.5 6.99395C0.5 8.89231 1.2 10.6908 2.6 11.8897C2.6 11.9644 4.89281 13.9947 6.09107 15.0558ZM7.5 13.6882L4.1 10.6908C3.1 9.69161 2.5 8.39274 2.5 6.99395C2.5 4.19637 4.7 2.09818 7.5 2.09818C10.3 2.09818 12.5 4.29628 12.5 7.09386C12.5 8.49265 11.9 9.69161 10.9 10.6908L7.5 13.6882Z"
                                          fill="#94A3B8"/>
                                </svg>
                            </div>
                            <div>
                                <p style="color: #475569" class="font-medium text-xs">makati</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <AppFooter/>

</template>

<script setup>
import AppFooter from '@/components/AppFooter.vue';
import {useRouter} from 'vue-router';
import {ref} from "vue";
import AppNavigation from '@/components/AppNavigation.vue'

const router = useRouter();

const promotions = ref([
    {
        id: 1,
        image: '/promotion-1.png',
        largeImage: '/promotion-1-big.jpeg'
    },
    {
        id: 2,
        image: '/promotion-2.png',
        largeImage: '/promotion-2-big.jpeg'
    },
    {
        id: 3,
        image: '/promotion-3.png',
        largeImage: '/promotion-3-big.jpeg'
    },
    {
        id: 4,
        image: '/promotion-4.png',
        largeImage: '/promotion-4-big.jpeg'
    },
    {
        id: 5,
        image: '/promotion-3.png',
        largeImage: '/promotion-3-big.jpeg'
    },
    {
        id: 6,
        image: '/promotion-3.png',
        largeImage: '/promotion-3-big.jpeg'
    },
    {
        id: 7,
        image: '/promotion-2.png',
        largeImage: '/promotion-2-big.jpeg'
    },
    {
        id: 8,
        image: '/promotion-2.png',
        largeImage: '/promotion-2-big.jpeg'
    },
    {
        id: 9,
        image: '/promotion-4.png',
        largeImage: '/promotion-4-big.jpeg'
    },
]);

function goToDetail(promId) {
    router.push({name: 'promotion-detail', params: {id: promId}})
}

// function toImage(img) {
//     console.log(new URL(img, import.meta.url).href)
//     return new URL(img, import.meta.url).href
// }
</script>

<style scoped>

.promotion-bg {
    background: linear-gradient(165deg, #CA92F9 0%, #8CE4EE 100%);
}


</style>