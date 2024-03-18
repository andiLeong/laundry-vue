<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import Paginator from '@/components/Paginator.vue';
import AppTable from '@/components/AppTable.vue';
import AppTableLayout from '@/components/AppTableLayout.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import '@vuepic/vue-datepicker/dist/main.css';
import BaseInput from '@/components/forms/BaseInput.vue';

const route = useRoute();
const router = useRouter();

const endpoint = ref('/api/admin/order-invoice');
const defaultSortColumn = ref('id');
const columns = ref(['Order Id', 'Invoice Id', 'Amt']);
const invoices = ref([]);
const pagination = ref({});
const page = ref(route.query.page || 1);
const queryString = ref({});
const sortQuery = ref('order_by[]=id&direction[]=desc');
const invoiceId = ref(null);
const orderId = ref(null);

function fetch(page, query = '') {
    let url = `${endpoint.value}?page=${page}&${query}`;
    return axios.get(url).then(response => {
        invoices.value = response.data.data;
        pagination.value = response.data;
        delete pagination.value.data;
    });
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

function switchPage(page) {
    router.replace({
        name: 'admin-order-invoice-record',
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
    getherQuery({
        invoice_id: invoiceId.value,
        order_id: orderId.value,
    });
}

fetch(page.value, toQueryString(queryString.value));
</script>

<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <AppTableLayout>
                    <template v-slot:title>
                        <h2 class="text-gray-600">Invoice</h2>

                        <form @submit.prevent="search" action="">
                            <div class="my-6 flex items-center justify-between">
                                <div class="">
                                    <BaseInput
                                        labelClass="form-label"
                                        placeHolder="Search Invoice Id"
                                        class="mt-1 form-input"
                                        label="Invoice Id"
                                        type="text"
                                        v-model="invoiceId"
                                    />
                                </div>
                                <div class="">
                                    <BaseInput
                                        labelClass="form-label"
                                        placeHolder="Search Order Id"
                                        class="mt-1 form-input"
                                        label="Order Id"
                                        type="text"
                                        v-model="orderId"
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
                                v-for="(invoice, index) in invoices"
                                :key="invoice.id"
                            >
                                <td class="table-data">
                                    {{ invoice.order_id }}
                                </td>

                                <td class="table-data">
                                    {{ invoice.invoice_id }}
                                </td>

                                <td class="table-data">
                                    {{ invoice.amount }}
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

<style scoped></style>
