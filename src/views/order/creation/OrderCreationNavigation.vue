<script setup>
import { useCreateOrderStore } from '@/store/createOrder.js';
import { ref, watch } from 'vue';

const orderStore = useCreateOrderStore();
const width = ref([
    {
        step: 1,
        percentage: '20%',
    },
    {
        step: 2,
        percentage: '40%',
    },
    {
        step: 3,
        percentage: '65%',
    },
    {
        step: 4,
        percentage: '100%',
    },
]);
const stepPercentage = ref(null);
const step = ref(null);

watch(
    () => orderStore.step,
    () => {
        setStep();
    },
    { deep: true },
);

function setStep() {
    let selectedStep = width.value.filter(step => {
        return step.step === orderStore.step;
    })[0];
    stepPercentage.value = selectedStep.percentage;
    step.value = selectedStep.step;
}

setStep();
</script>

<template>
    <div class="mt-6 my-8" aria-hidden="true">
        <div class="overflow-hidden rounded-full bg-gray-200">
            <div
                class="h-2 rounded-full bg-indigo-600"
                :style="{ width: stepPercentage }"
            ></div>
        </div>
        <div
            class="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid"
        >
            <div :class="step === 1 ? 'text-indigo-600' : ''">
                Basic Information
            </div>
            <div
                :class="step === 2 ? 'text-indigo-600' : ''"
                class="text-center"
            >
                Promotions
            </div>
            <div
                :class="step === 3 ? 'text-indigo-600' : ''"
                class="text-center"
            >
                Checkout
            </div>
            <div
                :class="step === 4 ? 'text-indigo-600' : ''"
                class="text-right"
            >
                Complete
            </div>
        </div>
    </div>
</template>

<style scoped></style>
