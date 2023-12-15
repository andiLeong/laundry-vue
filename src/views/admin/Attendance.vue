<template>
    <AdminLayout>
        <template v-slot:right-button>
            <button
                type="button"
                @click.prevent="reportToWork"
                class="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
                Report To Work
            </button>
        </template>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <AppTableLayout>
                    <template v-slot:title>
                        <h2 class="text-gray-600">Attendance</h2>

                        <form @submit.prevent="search" action="">
                            <div class="my-6 flex items-center justify-between">
                                <div class="">
                                    <VueDatePicker
                                        v-model="month"
                                        format="yyyy/MM"
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
                                {{ column }}
                            </th>
                        </template>

                        <template v-slot:tb>
                            <tr
                                :class="
                                    index % 2 == 0 ? 'bg-white' : 'bg-gray-100'
                                "
                                v-for="(attendance, index) in attendances"
                                :key="attendance.id"
                            >
                                <td class="table-data">
                                    {{ attendance.id }}
                                </td>

                                <td class="table-data">
                                    {{ attendance.staff.first_name }}
                                </td>

                                <!--                                <td class="table-data">-->
                                <!--                                    {{ attendance.staff.middle_name }}-->
                                <!--                                </td>-->

                                <!--                                <td class="table-data">-->
                                <!--                                    {{ attendance.staff.last_name }}-->
                                <!--                                </td>-->

                                <!--                                <td class="table-data">-->
                                <!--                                    {{ attendance.branch_name }}-->
                                <!--                                </td>-->

                                <td class="table-data">
                                    {{
                                        moment(attendance.time).format(
                                            'YYYY-MM-DD HH:mm',
                                        )
                                    }}
                                </td>

                                <td class="table-data">
                                    {{ attendance.type }}
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
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const route = useRoute();
const router = useRouter();

const endpoint = ref('/api/admin/attendance');
const defaultSortColumn = ref('id');
const columns = ref([
    'id',
    'first name',
    // 'middle name',
    // 'last name',
    // 'branch name',
    'time',
    'type',
]);
const per_page = ref(10);
const attendances = ref([]);
const pagination = ref({});
const page = ref(route.query.page || 1);
const queryString = ref({});
const sortQuery = ref('order_by[]=id&direction[]=desc');
const month = ref({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
});

function reportToWork() {
    router.push({
        name: 'admin-report-to-work',
    });
}

function fetch(page, query = '') {
    let url = `${endpoint.value}?page=${page}&${query}`;
    return axios.get(url).then(response => {
        attendances.value = response.data.data;
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
    if (new URLSearchParams(query).toString() === '') {
        return sortQuery.value;
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
        name: 'admin-attendance',
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

function search() {
    if (month.value === null) {
        return;
    }
    getherQuery({
        month: `${month.value.year}-${month.value.month + 1}`,
    });
}

fetch(page.value, toQueryString(queryString.value));
</script>