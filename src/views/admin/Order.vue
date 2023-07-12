<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-7xl mx-auto mt-10">
                <!--                {{ users }}-->
                <!-- {{ selected }} -->
                <AppTableLayout>
                    <template v-slot:title>
                        <h2 class="text-gray-600">Users</h2>

                        <div class="my-2">
                            <button
                                class="go-back-btn"
                                @click.prevent="showPannel = !showPannel"
                            >
                                {{ showPannel ? 'hide panel' : 'open panel' }}
                            </button>
                        </div>

                        <template v-if="showPannel">
                            <UserSearchPanel
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
                                v-for="(order, index) in orders"
                                :key="order.id"
                            >
                                <td class="table-data">
                                    {{ order.id }}
                                </td>

                                <td class="table-data">
                                    {{ order.user.phone }}
                                </td>

                                <td class="table-data">
                                    {{ order.user.first_name }}
                                </td>

                                <td class="table-data">
                                    {{ order.service.name }}
                                </td>

                                <td class="table-data">
                                    {{ order.promotions_count }}
                                </td>

                                <td class="table-data">
                                    {{ order.created_at }}
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
import _ from 'lodash';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UserSearchPanel from '@/components/admin/UserSearchPanel.vue';

const route = useRoute();
const router = useRouter();

const endpoint = ref('/api/admin/order');
const defaultSortColumn = ref('id');
const columns = ref([
    'id',
    'phone',
    'first name',
    'service name',
    'promotion count',
    'created at',
]);
const per_page = ref(10);
const orders = ref([]);
const pagination = ref({});
const page = ref(route.query.page || 1);
const queryString = ref({});
const sortQuery = ref('order_by[]=id&direction[]=desc');
const showPannel = ref(false);

function fetch(page, query = '') {
    return axios
        .get(`${endpoint.value}?page=${page}&${query}`)
        .then((response) => {
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

watch(
    () => route.query.page,
    (page) => fetch(page, toQueryString(queryString.value)),
);

fetch(page.value, toQueryString(queryString.value));
</script>
