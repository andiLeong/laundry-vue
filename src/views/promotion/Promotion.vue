<template>
    <MainLayout>
        <AppNavigation />

        <section
            class="promotion-bg py-12 md:py-8 px-4 w-full flex items-center justify-center"
        >
            <div class="text-center">
                <h1
                    class="text-white text-3xl font-bold mb-6 md:mb-2"
                    style="letter-spacing: -0.25px"
                >
                    Avail our Promos!!
                </h1>
                <p
                    class="text-white text-base font-normal"
                    style="letter-spacing: -0.25px; max-width: 500px"
                >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores impedit perferendis suscipit eaque, iste dolor
                    cupiditate blanditiis.
                </p>
            </div>
        </section>

        <main
            class="need-line-bg mx-auto max-w-screen-2xl px-8 md:px-20 py-9 w-full"
        >
            <section
                class="lg:grid grid-cols-2 gap-9 pb-16 space-y-10 lg:space-y-0"
            >
                <template v-if="error">
                    <p class="validation-error">
                        Error loading promotion please try again later
                    </p>
                </template>
                <template v-else>
                    <template v-if="promotions.length > 0">
                        <div
                            v-for="promotion in promotions"
                            :key="promotion.slug"
                            class="cursor-pointer bg-white rounded-sm md:flex border border-slate-200"
                            style="
                                box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);
                            "
                            @click.prevent="goToDetail(promotion.slug)"
                        >
                            <div style="min-width: 220px">
                                <img
                                    :src="promotion.thumbnail"
                                    alt="promotion-1"
                                    class="hidden md:block mix-blend-multiply w-56"
                                />
                                <img
                                    :src="promotion.image"
                                    alt="promotion-1"
                                    class="block md:hidden mix-blend-multiply"
                                />
                            </div>
                            <div class="p-4 flex flex-col">
                                <div class="flex-1">
                                    <p
                                        class="font-semibold"
                                        style="
                                            color: #6366f1;
                                            font-size: 0.75rem;
                                            line-height: 20px;
                                        "
                                    >
                                        <template
                                            v-if="promotion.until === null"
                                        >
                                            Forever
                                        </template>
                                        <template v-else>
                                            {{
                                                moment(promotion.until).format(
                                                    'MMM Do YYYY',
                                                )
                                            }}
                                        </template>
                                    </p>
                                    <h2
                                        class="font-bold text-lg mt-2"
                                        style="
                                            color: #1e293b;
                                            letter-spacing: -0.25px;
                                        "
                                    >
                                        {{ promotion.name }}
                                    </h2>
                                    <p
                                        class="text-xs mt-2 line-clamp-4"
                                        style="color: #475569"
                                    >
                                        {{ promotion.description }}
                                    </p>
                                </div>

                                <div class="flex mt-5">
                                    <div
                                        class="flex items-center rounded-2xl py-1 px-2"
                                        style="background: #f1f5f9"
                                    >
                                        <div class="mr-2">
                                            <Landmark height="16" width="15" />
                                        </div>
                                        <div>
                                            <p
                                                class="font-medium text-xs"
                                                style="color: #475569"
                                            >
                                                makati
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <LoadMore
                            :key="promotions[promotions.length - 1].id"
                            @load="loadMoreData"
                        >
                            <template v-if="page !== lastPage && fetching">
                                <Spinner
                                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-600"
                                />
                            </template>
                        </LoadMore>
                    </template>

                    <template v-else>
                        <PromotionsSkeleton v-for="index in 4" :key="index" />
                    </template>
                </template>
            </section>
        </main>

        <AppFooter />
    </MainLayout>
</template>

<script setup>
import AppFooter from '@/components/AppFooter.vue';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import AppNavigation from '@/components/AppNavigation.vue';
import Landmark from '@/svg/Landmark.vue';
import PromotionsSkeleton from '@/components/skeleton/PromotionsSkeleton.vue';
import Spinner from '@/svg/Spinner.vue';
import moment from 'moment';
import MainLayout from '@/components/MainLayout.vue';
import LoadMore from '@/components/LoadMore.vue';

const router = useRouter();
const promotions = ref([]);
const loading = ref(false);
const error = ref(null);

const lastPage = ref(null);
const page = ref(1);
const noPromotion = ref(false);
const fetching = ref(false);

function goToDetail(promoSlug) {
    router.push({ name: 'promotion-detail', params: { slug: promoSlug } });
}

function fetch() {
    if (error.value !== null) {
        return;
    }

    fetching.value = true;
    axios
        .get(`/api/promotion?page=${page.value}`)
        .then(({ data }) => {
            fetching.value = false;
            lastPage.value = data.last_page;
            promotions.value.push(...data.data);
            if (data.data.length < 1) {
                noPromotion.value = true;
            }
        })
        .catch((e) => (error.value = e));
}

function loadMoreData() {
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
    background: linear-gradient(165deg, #ca92f9 0%, #8ce4ee 100%);
}
</style>