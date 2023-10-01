<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <AppTableLayout>
                    <template v-slot:title>
                        <h2 class="text-gray-600">Expense</h2>

                        <form @submit.prevent="search" action="">
                            <div class="my-6 flex items-center justify-between">
                                <div class="">
                                    <VueDatePicker
                                        v-model="yearMonth"
                                        format="yyyy-MM"
                                        month-picker
                                    />
                                </div>
                                <button
                                    type="submit"
                                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
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
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                                "
                                v-for="(expense, index) in expenses"
                                :key="expense.id"
                            >
                                <td class="table-data">
                                    {{ expense.id }}
                                </td>

                                <td class="table-data">
                                    {{ expense.name }}
                                </td>

                                <td class="table-data">
                                    {{
                                        moment(expense.created_at).format(
                                            'YYYY-MM',
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const route = useRoute();
const router = useRouter();

const endpoint = ref('/api/admin/expense');
const defaultSortColumn = ref('id');
const columns = ref(['id', 'name', 'date']);
const expenses = ref([]);
const pagination = ref({});
const page = ref(route.query.page || 1);
const queryString = ref({});
const yearMonth = ref({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
});
const sortQuery = ref('order_by[]=id&direction[]=desc');

function fetch(page, query = '') {
    return axios
        .get(`${endpoint.value}?page=${page}&${query}`)
        .then((response) => {
            expenses.value = response.data.data;
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

function switchPage(page) {
    router.replace({
        name: 'admin-expense',
        query: {
            page,
        },
    });
}

function setDefaultSortColumn(column) {
    defaultSortColumn.value = column;
}

function search() {
    if (yearMonth.value === null) {
        return;
    }
    getherQuery({
        'year-month': `${yearMonth.value.year}-${yearMonth.value.month + 1}`,
    });
}

watch(
    () => route.query.page,
    (page) => fetch(page, toQueryString(queryString.value)),
);

fetch(page.value, toQueryString(queryString.value));
</script>

<style scoped></style>