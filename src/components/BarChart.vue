<template>
    <Bar
        id="my-chart-id"
        :options="option"
        :data="data"
    />
</template>

<script setup>
import {ref} from "vue";
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

defineProps(['data'])
const option = ref({
    responsive: true,
    animations: {
        tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
        }
    },
})

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
</script>

<style scoped>

</style>