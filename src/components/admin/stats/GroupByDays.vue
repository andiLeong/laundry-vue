<template>
    <div class="mt-10 max-w-3xl mx-auto">
        <div class="mb-5 w-60">
            <BaseSelect
                labelClass="form-label"
                class="mt-1 form-select"
                :options="daysSelect"
                v-model="days"
                label="Select Days"
            />
        </div>
        <template v-if="loading">
            <ChartLoadingSkeleton />
        </template>
        <div class="mb-10">
            <template v-if="orderCount.length > 0">
                <BarChart :data="orderCountChart" title="Daily Order Count" />
            </template>
        </div>
        <div class="mb-10">
            <template v-if="orderTotalAmount.length > 0">
                <BarChart :data="orderAmountChart" title="Daily Order Amount" />
            </template>
        </div>
        <template v-if="errors">
            <div class="mt-2">
                <ErrorManager v-if="errors" :errors="errors" />
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import BarChart from '@/components/BarChart.vue';
import ErrorManager from '@/components/validation/ErrorManager.vue';
import BaseSelect from '@/components/forms/BaseSelect.vue';
import useFetchGroupBy from '@/composable/useFetchGroupBy.js';
import ChartLoadingSkeleton from '@/components/skeleton/ChartLoadingSkeleton.vue';

const days = ref(7);
const daysSelect = ref([3, 5, 7, 10, 14, 18, 21, 30, 40, 50, 60, 70, 80, 90]);
let groupBy = new useFetchGroupBy(`group_by_days=${days.value}`);
const {
    orderTotalAmount,
    avgAmount,
    avgCount,
    orderCount,
    loading,
    labels,
    errors,
} = groupBy;

watch(days, async (newValue, oldValue) => {
    groupBy.fetch(`group_by_days=${newValue}`);
});

const orderCountChart = computed(() => {
    return {
        labels: labels.value,
        datasets: [
            {
                label: `Avg Daily Order ${avgCount.value}`,
                data: orderCount.value,
                backgroundColor: '#a5b4fc',
            },
        ],
    };
});

const orderAmountChart = computed(() => {
    return {
        labels: labels.value,
        datasets: [
            {
                label: `Avg Daily Amount ${avgAmount.value}`,
                data: orderTotalAmount.value,
                backgroundColor: '#e0e7ff',
            },
        ],
    };
});
</script>

<style scoped></style>