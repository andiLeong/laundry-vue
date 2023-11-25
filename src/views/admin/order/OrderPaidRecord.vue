<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <!--                {{ users }}-->
                <!-- {{ selected }} -->
                <AppTableLayout>
                    <template v-slot:title>
                        <h2 class="text-gray-600">Orders Paid Record</h2>

                        <div class="my-2">
                            <button
                                class="go-back-btn"
                                @click.prevent="showPanel = !showPanel"
                            >
                                {{ showPanel ? 'hide panel' : 'open panel' }}
                            </button>
                        </div>

                        <template v-if="showPanel">
                            <OrderPaidRecordFilterPanel
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
                        </template>

                        <template v-slot:tb>
                            <tr
                                :class="
                                    index % 2 == 0 ? 'bg-white' : 'bg-gray-100'
                                "
                                v-for="(record, index) in records"
                                :key="record.id"
                            >
                                <td class="table-data">
                                    {{ record.order.description }}
                                    ({{ record.order_id }})
                                </td>

                                <td class="table-data">
                                    {{ record.creator.first_name }}
                                </td>

                                <td class="table-data">
                                    {{ record.amount }}
                                </td>

                                <td class="table-data">
                                    {{ record.order.payment }}
                                </td>

                                <td class="table-data">
                                    {{
                                        moment(record.created_at).format(
                                            'YYYY-MM-DD HH:mm',
                                        )
                                    }}
                                </td>
                            </tr>
                        </template>
                    </AppTable>
                </AppTableLayout>

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
import moment from 'moment';
import OrderPaidRecordFilterPanel from '@/components/admin/OrderPaidRecordFilterPanel.vue';

const route = useRoute();
const router = useRouter();

const endpoint = ref('/api/admin/order-paid-record');
const defaultSortColumn = ref('id');
const columns = ref(['order id', 'first name', 'amount', 'payment', 'when']);
const per_page = ref(10);
const records = ref([]);
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
            records.value = response.data.data;
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
        name: 'admin-order-paid-record',
        query: {
            page,
        },
    });
}

function setDefaultSortColumn(column) {
    defaultSortColumn.value = column;
}

watch(
    () => route.query.page,
    page => fetch(page, toQueryString(queryString.value)),
);

fetch(page.value, toQueryString(queryString.value));
</script>