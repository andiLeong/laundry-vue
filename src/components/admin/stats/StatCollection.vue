<script setup>
import StatCard from '@/components/admin/stats/StatCard.vue';
import {ref} from 'vue';
import Errors from '@/model/Errors.js';

const errors = ref({});
const userCount = ref(0);
const orderCount = ref(0);
const orderAmount = ref(0);
const orderPromotionRate = ref(0);

function fetch() {
    axios
        .get('/api/admin/stats')
        .then(({data}) => {
            userCount.value = data.user_count;
            orderCount.value = data.order_count;
            orderAmount.value = data.total_order_amount;
            orderPromotionRate.value = data.order_promotion_rate;
        })
        .catch((error) => {
            let err = new Errors(error);
            errors.value = err.handle();
        })
        .finally(() => {
        });
}

fetch();
</script>

<template>
    <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Users Count" :number="userCount"/>

        <StatCard title="Orders Count" :number="orderCount"/>

        <StatCard title="Order Amount" :number="orderAmount"/>

        <StatCard
            title="Order Promotion Rate"
            :number="orderPromotionRate"
            :percentage="true"
        />
    </div>
</template>

<style scoped></style>
