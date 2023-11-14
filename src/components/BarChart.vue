<template>
    <Bar id="my-chart-id" :options="option" :data="data" />
</template>

<script setup>
import { ref } from 'vue';
import { Bar } from 'vue-chartjs';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';

const props = defineProps(['data', 'title']);
const option = ref({
    responsive: true,
    plugins: {
        title: {
            display: Boolean(props.title),
            text: props.title,
        },
    },
    animations: {
        tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true,
        },
    },
});

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
);
</script>

<style scoped></style>