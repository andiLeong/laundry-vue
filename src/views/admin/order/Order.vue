<template>
    <AdminLayout>
        <template v-slot:right-button>
            <button
                type="button"
                @click.prevent="goToCreateOrder"
                class="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
                Create Order
            </button>
        </template>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <!--                {{ users }}-->
                <!-- {{ selected }} -->
                <AppTableLayout>
                    <template v-slot:title>
                        <h2 class="text-gray-600">Orders</h2>

                        <div class="my-2">
                            <button
                                class="go-back-btn"
                                @click.prevent="showPanel = !showPanel"
                            >
                                {{ showPanel ? 'hide panel' : 'open panel' }}
                            </button>
                        </div>

                        <template v-if="showPanel">
                            <OrderSearchPanel
                                @search-query="getherQuery"
                                @reset-query="resetQuery"
                            />
                        </template>
                    </template>

                    <AppTable>
                        <template v-slot:th>
                            <th
                                scope="col"
                                class="table-heading"
                                v-for="column in columns"
                                :key="column"
                            >
                                <Sorting
                                    :column="column"
                                    :sortedColumn="defaultSortColumn"
                                    @sort="orderQuery"
                                    @sortedColumn="setDefaultSortColumn"
                                />
                            </th>
                            <th scope="col" class="table-heading">Detail</th>
                        </template>

                        <template v-slot:tb>
                            <tr
                                :class="
                                    index % 2 == 0 ? 'bg-white' : 'bg-gray-100'
                                "
                                v-for="(order, index) in orders"
                                :key="order.id"
                            >
                                <td class="table-data">
                                    {{ order.id }}
                                </td>

                                <td class="table-data">
                                    {{ order.description }}
                                </td>

                                <!--                                <td class="table-data">-->
                                <!--                                    {{ order.user?.phone }}-->
                                <!--                                </td>-->

                                <!--                                <td class="table-data">-->
                                <!--                                    {{ order.user?.first_name }}-->
                                <!--                                </td>-->

                                <td class="table-data">
                                    {{ order.service.name }}
                                </td>

                                <td class="table-data">
                                    <template v-if="order.paid">
                                        <CheckCircle
                                            class="h-5 w-5 text-cyan-500"
                                        />
                                    </template>
                                    <template v-else>
                                        <XCircle
                                            class="h-5 w-5 text-rose-400"
                                        />
                                    </template>
                                </td>

                                <td class="table-data">
                                    {{ order.confirmed ? 'YES' : 'NO' }}
                                </td>

                                <td class="table-data">
                                    {{ order.total_amount }}
                                </td>

                                <td class="table-data">
                                    {{ order.amount }}
                                </td>

                                <td class="table-data">
                                    {{ order.product_amount }}
                                </td>

                                <!--                                <td class="table-data">-->
                                <!--                                    {{ order.promotions_count }}-->
                                <!--                                </td>-->

                                <!--                                <td class="table-data">-->
                                <!--                                    {{ order.payment }}-->
                                <!--                                </td>-->

                                <td class="table-data">
                                    {{
                                        moment(order.created_at).format(
                                            'YYYY-MM-DD HH:mm',
                                        )
                                    }}
                                </td>

                                <td class="table-data">
                                    <AppLink
                                        class="underline text-blue-500"
                                        :to="{
                                            name: 'admin-order-detail',
                                            params: { id: order.id },
                                        }"
                                    >
                                        view
                                    </AppLink>
                                </td>
                            </tr>
                        </template>
                    </AppTable>
                </AppTableLayout>

                <div
                    v-if="orders.sum_total_amount"
                    class="my-5 text-gray-500 text-sm"
                >
                    Total: {{ orders.sum_total_amount }}
                </div>

                <div class="my-4">
                    <Paginator
                        :perSection="3"
                        v-if="pagination.current_page"
                        :pagination="pagination"
                        @switched-page="switchPage"
                    />
                </div>
            </section>
        </main>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import Paginator from '@/components/Paginator.vue';
import AppTable from '@/components/AppTable.vue';
import AppTableLayout from '@/components/AppTableLayout.vue';
import Sorting from '@/components/Sorting.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import OrderSearchPanel from '@/components/admin/OrderFilterPanel.vue';
import moment from 'moment';
import AppLink from '@/components/AppLink.vue';
import CheckCircle from '@/svg/CheckCircle.vue';
import XCircle from '@/svg/XCircle.vue';

const route = useRoute();
const router = useRouter();

const endpoint = ref('/api/admin/order');
const defaultSortColumn = ref('id');
const columns = ref([
    'id',
    'description',
    // 'phone',
    // 'first name',
    'service',
    'paid',
    'confirmed',
    'total amount',
    'amount',
    'product amount',
    // 'promotion count',
    // 'payment',
    'created at',
]);
const per_page = ref(10);
const orders = ref([]);
const pagination = ref({});
const page = ref(route.query.page || 1);
const queryString = ref({});
const sortQuery = ref('order_by[]=id&direction[]=desc');
const showPanel = ref(false);
const sum_total_amount = ref(null);

function fetch(page, query = '') {
    return axios
        .get(`${endpoint.value}?page=${page}&${query}`)
        .then(response => {
            sum_total_amount.value = response.data.sum_total_amount;
            orders.value = response.data.data;
            pagination.value = response.data;
            delete pagination.value.data;
        });
}

function orderQuery(query) {
    sortQuery.value = query;
    fetch(page.value, toQueryString(queryString.value));
}

function getherQuery(query) {
    Object.assign(queryString.value, query);
    fetch(page.value, toQueryString(queryString.value));
}

function toQueryString(query) {
    if (sortQuery.value === '') {
        return new URLSearchParams(query).toString();
    }
    return new URLSearchParams(query).toString() + '&' + sortQuery.value;
}

function resetQuery() {
    queryString.value = {};
    sortQuery.value = '';
    fetch(page.value);
}

function switchPage(page) {
    router.replace({
        name: 'admin-order',
        query: {
            page,
        },
    });
}

function setDefaultSortColumn(column) {
    defaultSortColumn.value = column;
}

function goToCreateOrder() {
    router.push({ name: 'admin-order-create' });
}

watch(
    () => route.query.page,
    page => fetch(page, toQueryString(queryString.value)),
);

fetch(page.value, toQueryString(queryString.value));
</script>
