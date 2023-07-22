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
            <div class="border border-gray-300 shadow-lg rounded-lg bg-gray-300 animate-pulse"
                 style="height: 384px; width: 768px">
            </div>

            <!--            <div class="mt-8 border border-gray-300 shadow-lg rounded-lg bg-gray-300 animate-pulse"-->
            <!--                 style="height: 384px; width: 768px">-->
            <!--            </div>-->
        </template>
        <div class="mb-10">
            <template v-if="orderCount.length > 0">
                <BarChart :data="orderCountChart"/>
            </template>
        </div>
        <div>
            <!--            <template v-if="orderTotalAmount.length > 0">-->
            <!--                <BarChart :data="orderAmountTotalChart"/>-->
            <!--            </template>-->
        </div>
        <template v-if="errors">
            <div class="mt-2">
                <ErrorManager
                    v-if="errors"
                    :errors="errors"
                />
            </div>
        </template>
    </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import BarChart from "@/components/BarChart.vue";
import ErrorManager from '@/components/validation/ErrorManager.vue';
import BaseSelect from "@/components/forms/BaseSelect.vue";
import useFetchGroupBy from "@/composable/useFetchGroupBy.js";

const days = ref(7);
const daysSelect = ref([7, 10, 20, 30, 60, 90]);
let groupBy = new useFetchGroupBy(`group_by_days=${days.value}`);
const {
    orderCount,
    loading,
    labels,
    errors,
} = groupBy

watch(days, async (newValue, oldValue) => {
    groupBy.fetch(`group_by_days=${newValue}`)
})

const orderCountChart = computed(() => {
    return {
        labels: labels.value,
        datasets: [
            {
                label: "Order Count By Days",
                data: orderCount.value,
                backgroundColor: '#a5b4fc',
            },
        ]
    }
})


// const orderAmountTotalChart = computed(() => {
//     return {
//         labels: labels.value,
//         datasets: [
//             {
//                 label: "Order Total Amount",
//                 fillColor: "green",
//                 data: orderTotalAmount.value,
//                 borderColor: '#36A2EB',
//                 backgroundColor: '#FFB1C1',
//             }
//         ]
//     }
// })

</script>

<style scoped>

</style>