<template>
    <div class="mt-10 max-w-3xl mx-auto">
        <div class="mb-5 w-60">
            <BaseSelect
                labelClass="form-label"
                class="mt-1 form-select"
                :options="monthsSelect"
                v-model="months"
                label="Select Months"
            />
        </div>
        <template v-if="loading">
            <ChartLoadingSkeleton />
        </template>
        <template v-if="orderCount.length > 0">
            <BarChart :data="orderCountChart" title="Order By Months" />
        </template>
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

const months = ref(3);
const monthsSelect = ref([3, 6, 9, 12, 18, 24]);
let groupBy = new useFetchGroupBy(`group_by_months=${months.value}`);
const {
    orderTotalAmount,
    avgAmount,
    avgCount,
    orderCount,
    loading,
    labels,
    errors,
} = groupBy;

watch(months, async (newValue, oldValue) => {
    groupBy.fetch(`group_by_months=${newValue}`);
});

const orderCountChart = computed(() => {
    return {
        labels: labels.value,
        datasets: [
            {
                label: `Avg Monthly Amount ${avgAmount.value}`,
                data: orderTotalAmount.value,
                backgroundColor: '#e0f2fe',
            },
            {
                label: `Avg Monthly Order ${avgCount.value}`,
                data: orderCount.value,
                backgroundColor: '#7dd3fc',
            },
        ],
    };
});
</script>

<style scoped></style>