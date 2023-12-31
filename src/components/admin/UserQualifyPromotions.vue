<template>
    <div
        v-if="loading"
        class="mt-10 animate-pulse h-28 bg-gray-300"
    >
    </div>

    <div
        v-if="promotions !== null"
        class="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
    >
        <div class="sm:col-span-2">
            <UserQualifyPromotion
                title="Isolated"
                :promotions="isolatedPromotions"
                :key="promotions"
                @promotionAdded="add($event)"
                @promotionRemoved="remove($event)"
            />
        </div>

        <div class="sm:col-span-2">
            <UserQualifyPromotion
                title="Non Isolated"
                :promotions="nonIsolatedPromotions"
                :key="promotions"
                @promotionAdded="add($event)"
                @promotionRemoved="remove($event)"
            />
        </div>
    </div>

    <div
        v-if="promotions !== null"
        class="hidden mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
    >
        <div class="sm:col-span-2 flex items-center">
            <p class="text-xs mr-2 line-through text-gray-400">
                {{ amount }}
            </p>
            <p class="text-xl font-bold tracking-tight text-gray-900 italic">
                P
                {{ discountedPrice }}
            </p>
        </div>
    </div>

    <!--    <MountedTeleport to="#fetch-promotion-button">-->
    <!--        <SecondaryButton-->
    <!--            :loading="loading"-->
    <!--            @click.prevent="fetch"-->
    <!--            not-saving="Promotions"-->
    <!--            saving="Fetching"-->
    <!--        />-->
    <!--    </MountedTeleport>-->
</template>

<script setup>
import UserQualifyPromotion from '@/components/admin/UserQualifyPromotion.vue';
import {computed, ref, watch} from 'vue';
import Errors from '@/model/Errors.js';

const props = defineProps({
    service_id: {required: true},
    user_id: {required: true},
    amount: {required: true},
});
const emit = defineEmits(['promotionUpdated', 'getError', 'discountApplied']);

const discounts = ref(0);
const loading = ref(false);
const fetchedIds = ref([]);
const promotions = ref(null);
const promotion_ids = ref([]);
const isolatedPromotions = computed(() => promotions.value?.isolated);
const nonIsolatedPromotions = computed(() =>
    promotions.value !== null ? promotions.value['non-isolated'] : null,
);
const discountedPrice = computed(() => {
    if (discounts.value === 0) {
        return props.amount;
    }
    let res = props.amount - props.amount * discounts.value;
    return res.toFixed(2)
});

watch(discounts, (newValue) => {
    calculateDiscount(newValue, props.amount)
});

watch(
    () => props.amount,
    (newAmount) => {
        if (!newAmount) {
            return calculateDiscount(discounts.value, 0)
        }
        calculateDiscount(discounts.value, newAmount)
    },
);

watch(
    () => props.service_id,
    (newServiceId, oldServiceId) => {
        if (newServiceId !== null && props.user_id !== null) {
            fetch();
        }
    },
);

watch(
    () => props.user_id,
    (newUserId, oldUserId) => {
        if (newUserId !== null && props.service_id !== null) {
            fetch();
        }
    },
);

function calculateDiscount(newValue, amount) {
    let discounted;
    if (newValue === 0) {
        discounted = 0
    } else {
        discounted = amount * discounts.value;
    }

    emit('discountApplied', parseFloat(discounted.toFixed(2)))
}

function add(promotion) {
    discounts.value += promotion.discount;
    promotion_ids.value.push(promotion.id);
    emit('promotionUpdated', promotion_ids.value);
}

function remove(promotion) {
    discounts.value -= promotion.discount;
    discounts.value = parseFloat(discounts.value.toFixed(2))
    let index = promotion_ids.value.indexOf(promotion.id);
    promotion_ids.value.splice(index, 1);
    emit('promotionUpdated', promotion_ids.value);
}

function shouldFetch() {
    if (props.user_id === null || props.service_id === null) {
        return false;
    }

    if (
        props.user_id === fetchedIds.value[0] &&
        props.service_id === fetchedIds.value[1]
    ) {
        return false;
    }

    return true;
}

function fetch() {
    if (!shouldFetch()) {
        return;
    }

    discounts.value = 0;
    loading.value = true;
    promotions.value = null
    axios
        .get(
            `api/admin/user/qualified-promotion/${props.user_id}/${props.service_id}`,
        )
        .then(({data}) => {
            promotions.value = data;
        })
        .catch((error) => {
            let err = new Errors(error);
            emit('getError', err.handle());
        })
        .finally(() => {
            loading.value = false;
            fetchedIds.value = [props.user_id, props.service_id];
            emit('promotionUpdated', []);
        });
}
</script>

<style scoped></style>
