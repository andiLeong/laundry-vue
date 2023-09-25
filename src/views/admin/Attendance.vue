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

                        <!--                        <div class="my-2">-->
                        <!--                            <button-->
                        <!--                                class="go-back-btn"-->
                        <!--                                @click.prevent="showPanel = !showPanel"-->
                        <!--                            >-->
                        <!--                                {{ showPanel ? 'hide panel' : 'open panel' }}-->
                        <!--                            </button>-->
                        <!--                        </div>-->

                        <!--                        <template v-if="showPanel">-->
                        <!--                            <OrderSearchPanel-->
                        <!--                                @search-query="getherQuery"-->
                        <!--                                @reset-query="resetQuery"-->
                        <!--                            />-->
                        <!--                        </template>-->
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

                                <td class="table-data">
                                    {{ attendance.staff.middle_name }}
                                </td>

                                <td class="table-data">
                                    {{ attendance.staff.last_name }}
                                </td>

                                <td class="table-data">
                                    {{ attendance.branch_name }}
                                </td>

                                <td class="table-data">
                                    {{ attendance.type }}
                                </td>

                                <td class="table-data">
                                    {{
                                        moment(attendance.time).format(
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
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';

const route = useRoute();
const router = useRouter();

const endpoint = ref('/api/admin/attendance');
const defaultSortColumn = ref('id');
const columns = ref([
    'id',
    'first name',
    'middle name',
    'last name',
    'branch name',
    'type',
    'time',
]);
const per_page = ref(10);
const attendances = ref([]);
const pagination = ref({});
const page = ref(route.query.page || 1);
const queryString = ref({});
const sortQuery = ref('order_by[]=id&direction[]=desc');
const showPanel = ref(false);

function reportToWork() {
    router.push({
        name: 'admin-report-to-work',
    });
}

function fetch(page, query = '') {
    let url = `${endpoint.value}?page=${page}&${query}`;
    return axios.get(url).then((response) => {
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
    (page) => fetch(page, toQueryString(queryString.value)),
);

fetch(page.value, toQueryString(queryString.value));
</script>