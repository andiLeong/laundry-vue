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
            <template v-if="error">
                <p class="validation-error">
                    Error loading promotion please try again later
                </p>
            </template>
            <template v-else>
                <template v-if="promotions.length > 0">
                    <div
                        v-for="promotion in promotions"
                        :key="promotion.id"
                        @click.prevent='goToDetail(promotion.id)'
                        style="box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
                        class="cursor-pointer bg-white rounded-sm md:flex border border-slate-200">
                        <div style="min-width: 220px;">
                            <img class="hidden md:block mix-blend-multiply w-56" :src="promotion.thumbnail"
                                 alt="promotion-1">
                            <img class="block md:hidden mix-blend-multiply" :src="promotion.image"
                                 alt="promotion-1">
                        </div>
                        <div class="p-4 flex flex-col">
                            <div class="flex-1">
                                <p style="color:#6366F1;font-size: 0.75rem;line-height: 20px" class="font-semibold">
                                    <template v-if="promotion.until === null">
                                        Forever
                                    </template>
                                    <template v-else>
                                        {{ moment(promotion.until).format('MMM Do YYYY') }}
                                    </template>
                                </p>
                                <h2 style="color: #1E293B;letter-spacing: -0.25px;" class="font-bold text-lg mt-2">
                                    {{ promotion.name }} </h2>
                                <p style="color: #475569;" class="text-xs mt-2 line-clamp-4">
                                    {{ promotion.description }}
                                </p>
                            </div>

                            <div class="flex mt-5">
                                <div style="background: #F1F5F9;" class="flex items-center rounded-2xl py-1 px-2 ">
                                    <div class="mr-2">
                                        <Landmark width="15" height="16"/>
                                    </div>
                                    <div>
                                        <p style="color: #475569" class="font-medium text-xs">makati</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <LoadMore @load="loadMore" :key="promotions[promotions.length - 1].id">
                        <template v-if="page !== lastPage && fetching">
                            <Spinner
                                class="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-600"
                            />
                        </template>
                    </LoadMore>
                </template>

                <template v-else>
                    <PromotionSkeleton
                        v-for="index in 4"
                        :key="index"
                    />
                </template>
            </template>
        </section>
    </main>

    <AppFooter/>

</template>

<script setup>
import AppFooter from '@/components/AppFooter.vue';
import {useRouter} from 'vue-router';
import {ref, watch} from "vue";
import AppNavigation from '@/components/AppNavigation.vue'
import Landmark from '@/svg/Landmark.vue'
import PromotionSkeleton from "@/components/skeleton/PromotionSkeleton.vue";
import LoadMore from "@/components/LoadMore.vue"
import Spinner from '@/svg/Spinner.vue'
import moment from 'moment';

const router = useRouter();
const promotions = ref([]);
const loading = ref(false);
const error = ref(null);

const lastPage = ref(null);
const page = ref(1);
const noPromotion = ref(false);
const fetching = ref(false);

function goToDetail(promId) {
    router.push({name: 'promotion-detail', params: {id: promId}})
}

function fetch() {
    if (error.value !== null) {
        return;
    }

    fetching.value = true
    axios
        .get(`/api/promotion?page=${page.value}`)
        .then(({data}) => {
            fetching.value = false;
            lastPage.value = data.last_page;
            promotions.value.push(...data.data);
            if (data.data.length < 1) {
                noPromotion.value = true;
            }
        })
        .catch((e) => (error.value = e));
}

function loadMore() {
    if (lastPage.value === null || page.value < lastPage.value) {
        page.value++;
    }
}

watch(page, () => {
    fetch();
});

fetch();
</script>

<style scoped>

.promotion-bg {
    background: linear-gradient(165deg, #CA92F9 0%, #8CE4EE 100%);
}


</style>