<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <div class="mt-8">
                <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <h2 class="text-lg font-medium leading-6 text-gray-900">
                        Overview
                    </h2>
                    <StatCollection/>


                    <div class="mt-10 max-w-3xl mx-auto">
                        <BarChart :data="chartData"/>
                    </div>


                </div>
            </div>
        </main>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import StatCollection from '@/components/admin/StatCollection.vue';
import {ref} from "vue";
import BarChart from "@/components/BarChart.vue";
import Errors from "@/model/Errors.js";


const chartData = ref({
    labels: ['January', 'February', 'March'],
    datasets: [
        {
            label: "Blue",
            fillColor: "blue",
            data: [3, 7, 4],
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5',
        },
        {
            label: "Green",
            fillColor: "green",
            data: [7, 2, 6],
            borderColor: '#36A2EB',
            backgroundColor: '#FFB1C1',
        }
    ]
})

function fetch() {
    axios
        .get('/api/admin/order-stats')
        .then(({data}) => {

            console.log(data);
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

<style scoped></style>
