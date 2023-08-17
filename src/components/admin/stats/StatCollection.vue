<script setup>
import StatCard from '@/components/admin/stats/StatCard.vue';
import { ref, watch } from 'vue';
import Errors from '@/model/Errors.js';
import StatLoadingSkeleton from '@/components/skeleton/StatLoadingSkeleton.vue';
import BaseSelect from '@/components/forms/BaseSelect.vue';

const errors = ref({});
const loading = ref(true);
const userCount = ref(0);
const orderCount = ref(0);
const orderAmount = ref(0);
const orderPromotionRate = ref(0);
const daysOption = ref(['all', 7, 30, 60, 90, 120, 180]);
const day = ref('all');

watch(day, async (newValue, oldValue) => {
    fetch();
});

function fetch() {
    loading.value = true;
    axios
        .get(`/api/admin/stats?days=${day.value}`)
        .then(({ data }) => {
            userCount.value = data.user_count;
            orderCount.value = data.order_count;
            orderAmount.value = data.total_order_amount;
            orderPromotionRate.value = data.order_promotion_rate;
        })
        .catch((error) => {
            let err = new Errors(error);
            errors.value = err.handle();
        })
        .finally(() => (loading.value = false));
}

fetch();
</script>

<template>
    <div class="my-5 w-60">
        <BaseSelect
            labelClass="form-label"
            class="mt-1 form-select"
            :options="daysOption"
            v-model="day"
            label="Select Days"
        />
    </div>

    <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <template v-if="loading">
            <StatLoadingSkeleton />
        </template>
        <template v-else>
            <StatCard title="Users Count" :number="userCount" />
        </template>

        <template v-if="loading">
            <StatLoadingSkeleton />
        </template>
        <template v-else>
            <StatCard title="Orders Count" :number="orderCount" />
        </template>

        <template v-if="loading">
            <StatLoadingSkeleton />
        </template>
        <template v-else>
            <StatCard title="Order Amount" :number="orderAmount" />
        </template>

        <template v-if="loading">
            <StatLoadingSkeleton />
        </template>
        <template v-else>
            <StatCard
                title="Order Promotion Rate"
                :number="orderPromotionRate"
                :percentage="true"
            />
        </template>
    </div>
</template>

<style scoped></style>
