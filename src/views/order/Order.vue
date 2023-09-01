<script setup>
import ChevronRight from '@/svg/ChevronRight.vue';
import AppLink from '@/components/AppLink.vue';
import Home from '@/svg/Home.vue';
import AppFooter from '@/components/AppFooter.vue';
import MainLayout from '@/components/MainLayout.vue';
import Paginator from '@/components/Paginator.vue';
import AppTableLayout from '@/components/AppTableLayout.vue';
import AppTable from '@/components/AppTable.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import moment from 'moment';
import AppDashboardNavigation from '@/components/AppDashboardNavigation.vue';
import CheckCircle from '@/svg/CheckCircle.vue';
import X from '@/svg/X.vue';

const route = useRoute();
const router = useRouter();
const endpoint = ref('/api/order');
const columns = ref([
    'id',
    'service name',
    'amount',
    'product amount',
    'total amount',
    'created at',
    'payment',
    'paid',
]);
const orders = ref([]);
const pagination = ref({});
const page = ref(route.query.page || 1);
const error = ref(null);
const loading = ref(false);

watch(
    () => route.query.page,
    (page) => fetch(page),
);

function fetch(page) {
    loading.value = true;
    return axios
        .get(`${endpoint.value}?page=${page}`)
        .then((response) => {
            orders.value = response.data.data;
            pagination.value = response.data;
            delete pagination.value.data;
        })
        .catch(() => {
            error.value = 'please try again later server error';
        })
        .finally(() => {
            loading.value = false;
        });
}

function switchPage(page) {
    router.replace({
        name: 'order',
        query: {
            page,
        },
    });
}

fetch(page.value);
</script>

<template>
    <MainLayout>
        <main class="px-8 mx-auto max-w-screen-2xl w-full">
            <div class="my-6 flex items-center space-x-2 px-8">
                <div>
                    <Home class="h-5 w-5" style="color: #6b7280" />
                </div>
                <div>
                    <p class="font-normal text-xs">Home</p>
                </div>
                <div>
                    <ChevronRight class="h-5 w-5" style="color: #6b7280" />
                </div>
                <div>
                    <p
                        class="font-bold text-xs capitalize"
                        style="color: #8b5cf6"
                    >
                        {{ route.name }}
                    </p>
                </div>
            </div>

            <section class="md:grid grid-cols-5 gap-6 min-h-screen">
                <AppDashboardNavigation />
                <div class="col-span-4 p-3">
                    <h3 class="text-gray-900 text-lg font-medium">Order</h3>
                    <p class="font-normal text-gray-400 text-sm">
                        Service you have ordered
                    </p>

                    <template v-if="loading">loading...</template>
                    <template v-else>
                        <p v-if="error" class="validation-error mt-10">
                            {{ error }}
                        </p>
                        <template v-else>
                            <section v-if="orders.length > 0" class="mt-10">
                                <AppTableLayout class="mb-20">
                                    <AppTable>
                                        <template v-slot:th>
                                            <th
                                                v-for="column in columns"
                                                :key="column"
                                                class="table-heading"
                                                scope="col"
                                            >
                                                <p>{{ column }}</p>
                                            </th>
                                            <th
                                                class="table-heading"
                                                scope="col"
                                            >
                                                Detail
                                            </th>
                                        </template>

                                        <template v-slot:tb>
                                            <tr
                                                v-for="(order, index) in orders"
                                                :key="order.id"
                                                :class="
                                                    index % 2 == 0
                                                        ? 'bg-white'
                                                        : 'bg-gray-100'
                                                "
                                            >
                                                <td class="table-data">
                                                    {{ order.id }}
                                                </td>

                                                <td class="table-data">
                                                    {{ order.service.name }}
                                                </td>

                                                <td class="table-data">
                                                    {{ order.amount }}
                                                </td>

                                                <td class="table-data">
                                                    {{ order.product_amount }}
                                                </td>

                                                <td class="table-data">
                                                    {{ order.total_amount }}
                                                </td>

                                                <td class="table-data">
                                                    {{
                                                        moment(
                                                            order.created_at,
                                                        ).format(
                                                            'YYYY-MM-DD HH:mm',
                                                        )
                                                    }}
                                                </td>
                                                <td class="table-data">
                                                    {{ order.payment }}
                                                </td>

                                                <td class="table-data">
                                                    <CheckCircle
                                                        v-if="order.paid"
                                                        class="h-5 w-5 text-green-500"
                                                    />
                                                    <X
                                                        v-else
                                                        class="h-5 w-5 text-red-500"
                                                    />
                                                </td>

                                                <td class="table-data">
                                                    <AppLink
                                                        :to="{
                                                            name: 'order-detail',
                                                            params: {
                                                                id: order.id,
                                                            },
                                                        }"
                                                        class="underline text-blue-500"
                                                    >
                                                        view
                                                    </AppLink>
                                                </td>
                                            </tr>
                                        </template>
                                    </AppTable>
                                </AppTableLayout>

                                <div class="my-4">
                                    <Paginator
                                        v-if="pagination.current_page"
                                        :pagination="pagination"
                                        :perSection="3"
                                        @switched-page="switchPage"
                                    />
                                </div>
                            </section>
                            <p v-else class="validation-error mt-10">
                                Sorry You Don't Made Any Orders Yet
                            </p>
                        </template>
                    </template>
                </div>
            </section>
        </main>
        <AppFooter />
    </MainLayout>
</template>

<style scoped></style>