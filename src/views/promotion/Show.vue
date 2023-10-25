<template>
    <MainLayout>
        <AppNavigation />

        <template v-if="loading">
            <PromotionSkeleton />
        </template>

        <template v-else>
            <template v-if="promotion && errors === null">
                <main class="px-8 md:max-w-5xl mx-auto my-9 space-y-9">
                    <div class="flex flex-col items-center space-y-2.5">
                        <div class="self-start">
                            <button
                                class="inline-flex items-center font-bold text-base"
                                style="color: #5130d3; line-height: normal"
                                @click.prevent="goToPromotion"
                            >
                                <svg
                                    class="w-5 h-5 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>

                                Go Back
                            </button>
                        </div>
                        <h1
                            class="text-center text-3xl md:text-5xl font-black text-black"
                        >
                            {{ promotion.name }}
                        </h1>
                        <img
                            :alt="promotion.name"
                            :src="promotion.image"
                            class=""
                        />
                    </div>

                    <div>
                        <div class="px-5 py-6">
                            <h3
                                class="font-medium text-lg"
                                style="color: #111827"
                            >
                                Promo Information
                            </h3>
                            <p
                                class="text-sm font-normal mt-1"
                                style="color: #6b7280"
                            >
                                Promo until
                                {{
                                    promotion.until === null
                                        ? 'Forever'
                                        : moment(promotion.until).format(
                                              'YYYY MMMM Do, H:mm',
                                          )
                                }}
                            </p>
                        </div>

                        <div>
                            <div class="px-5 py-6 bg-gray-100" style="">
                                <div class="md:grid grid-cols-3 gap-4">
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            style="color: #6b7280"
                                        >
                                            Available
                                        </p>
                                    </div>
                                    <div class="col-span-2">
                                        <template v-if="available">
                                            <CheckCircle
                                                class="h-5 w-5 text-green-500"
                                            />
                                        </template>
                                        <template v-else>
                                            <X class="h-5 w-5 text-red-500" />
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="px-5 py-6" style="">
                                <div class="md:grid grid-cols-3 gap-4">
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            style="color: #6b7280"
                                        >
                                            Can Join With Other Prom
                                        </p>
                                    </div>
                                    <div class="col-span-2">
                                        <p
                                            class="text-sm font-medium"
                                            style="color: #111827"
                                        >
                                            {{
                                                promotion.isolated
                                                    ? 'yes'
                                                    : 'no'
                                            }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="px-5 py-6 bg-gray-100">
                                <div class="md:grid grid-cols-3 gap-4">
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            style="color: #6b7280"
                                        >
                                            Discount
                                        </p>
                                    </div>
                                    <div class="col-span-2">
                                        <p
                                            class="text-sm font-medium"
                                            style="color: #111827"
                                        >
                                            {{ promotion.discount * 100 }}% off
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="px-5 py-6">
                                <div class="md:grid grid-cols-3 gap-4">
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            style="color: #6b7280"
                                        >
                                            Description
                                        </p>
                                    </div>
                                    <div class="col-span-2">
                                        <article
                                            class="prose lg:prose-xl"
                                            v-html="promotion.description"
                                        ></article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            class="w-full text-white p-4 rounded-md text-sm font-medium"
                            style="
                                background: #5130d3;
                                box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
                            "
                        >
                            Avail Promo
                        </button>
                    </div>
                </main>
            </template>
        </template>
        <AppFooter />
    </MainLayout>
</template>

<script setup>
import AppFooter from '@/components/AppFooter.vue';
import { useRouter } from 'vue-router';
import AppNavigation from '@/components/AppNavigation.vue';
import { computed, ref } from 'vue';
import CheckCircle from '@/svg/CheckCircle.vue';
import X from '@/svg/X.vue';
import moment from 'moment';
import MainLayout from '@/components/MainLayout.vue';
import PromotionSkeleton from '@/components/skeleton/PromotionSkeleton.vue';

const router = useRouter();
const props = defineProps(['slug']);
const loading = ref(false);
const errors = ref(null);
const promotion = ref(null);

const available = computed(() => {
    if (
        moment(promotion.value.start).isBefore() &&
        (promotion.value.until === null ||
            !moment(promotion.value.until).isBefore())
    ) {
        return true;
    }
    return false;
});

function goToPromotion() {
    router.push({
        name: 'promotion',
    });
}

function fetch() {
    loading.value = true;
    axios
        .get(`/api/promotion/${props.slug}`)
        .then(({ data }) => {
            promotion.value = data;
        })
        .catch(() => router.push({ name: 'NotFound' }))
        .finally(() => {
            loading.value = false;
        });
}

fetch();
</script>

<style scoped></style>
