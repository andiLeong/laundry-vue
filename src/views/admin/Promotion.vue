<template>

    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <AppTableLayout>
                    <template v-slot:title>
                        <h2 class="text-gray-600">Promotions</h2>
                        <div class=" my-6 grid grid-cols-12">
                            <div class="col-span-3">
                                <BaseInput
                                    labelClass="form-label"
                                    placeHolder="Name"
                                    class="mt-1 form-input"
                                    label="Name"
                                    type="text"
                                    v-model="name"
                                />
                            </div>
                        </div>
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
                                v-for="(promotion, index) in promotions"
                                :key="promotion.id"
                            >
                                <td class="table-data">
                                    {{ promotion.id }}
                                </td>

                                <td class="table-data">
                                    {{ promotion.name }}
                                </td>

                                <td class="table-data">
                                    {{
                                        moment(promotion.start).format('YYYY-MM-DD HH:mm')
                                    }}
                                </td>

                                <td class="table-data">
                                    {{
                                        promotion.until === null ? 'FOREVER' :
                                            moment(promotion.until).format('YYYY-MM-DD HH:mm')
                                    }}
                                </td>

                                <td class="table-data">
                                    {{ promotion.isolated }}
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
import {ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import moment from "moment";
import BaseInput from "@/components/forms/BaseInput.vue";
import useDebouncedRef from "@/composable/useDebounceRef.js";

const route = useRoute();
const router = useRouter();

const endpoint = ref('/api/promotion');
const defaultSortColumn = ref('id');
const columns = ref([
    'id',
    'name',
    'start',
    'until',
    'isolate',
]);
const promotions = ref([]);
const pagination = ref({});
const page = ref(route.query.page || 1);
const queryString = ref({});
const name = useDebouncedRef('', 400)
const sortQuery = ref('order_by[]=id&direction[]=desc');


watch(name, async (newValue, oldValue) => {
    getherQuery({
        name: newValue
    })
})

function fetch(page, query = '') {
    return axios
        .get(`${endpoint.value}?page=${page}&${query}`)
        .then((response) => {
            promotions.value = response.data.data;
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
        name: 'admin-promotion',
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

<style scoped>

</style>