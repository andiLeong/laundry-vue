<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <AppTableLayout>
                    <template v-slot:title>
                        <h2 class="text-gray-600">Service</h2>
                    </template>

                    <AppTable>
                        <template v-slot:th>
                            <th
                                scope="col"
                                class="table-heading"
                                v-for="column in columns"
                                :key="column"
                            >
                                {{ column }}
                            </th>
                        </template>

                        <template v-slot:tb>
                            <tr
                                :class="
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                                "
                                v-for="(service, index) in services"
                                :key="index"
                            >
                                <td class="table-data">
                                    {{ service.name }}
                                </td>

                                <td class="table-data">
                                    {{ service.price }}
                                </td>
                            </tr>
                        </template>
                    </AppTable>
                </AppTableLayout>
            </section>
        </main>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import AppTable from '@/components/AppTable.vue';
import AppTableLayout from '@/components/AppTableLayout.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const endpoint = ref('/api/service');
const columns = ref(['name', 'price']);
const services = ref([]);

function fetch() {
    return axios.get(`${endpoint.value}`).then((response) => {
        services.value = response.data;
    });
}

fetch();
</script>

<style scoped></style>