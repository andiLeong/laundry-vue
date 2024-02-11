<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <div
                    v-if="order"
                    class="overflow-hidden bg-white shadow sm:rounded-lg"
                >
                    <div
                        class="px-4 py-6 sm:px-6 flex justify-between items-center bg-gray-100"
                    >
                        <h3
                            class="text-base font-semibold leading-7 text-gray-900"
                        >
                            Order Detail
                        </h3>

                        <div class="flex items-center">
                            <button
                                v-if="
                                    order.payment === 'gcash' &&
                                    order.gcash === null
                                "
                                @click.prevent="createGcash()"
                                class="mr-3 rounded border border-gray-300 px-3 py-1 text-gray-500"
                            >
                                Gcash
                            </button>
                            <button
                                type="button"
                                @click.prevent="editOrder"
                                class="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                    <div class="border-t border-gray-100">
                        <dl class="divide-y divide-gray-100">
                            <div
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    ID
                                </dt>
                                <dd
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    #{{ order.id }} ({{ order.description }})
                                </dd>
                            </div>
                            <div
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    Service
                                </dt>
                                <dd
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    {{ order.service.name }}
                                    <span class="font-semibold">
                                        @ P{{ order.amount }}
                                    </span>
                                </dd>
                            </div>
                            <div
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    Type
                                </dt>
                                <dd
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    {{ order.type }}
                                </dd>
                            </div>
                            <div
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    Product Amount
                                </dt>
                                <dd
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    P{{ order.product_amount }}
                                </dd>
                            </div>
                            <div
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    Total Amount
                                </dt>
                                <dd
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    P{{ order.total_amount }}
                                </dd>
                            </div>

                            <div
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    Created
                                </dt>
                                <dd
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    {{
                                        moment(order.created_at).format(
                                            'YYYY-MM-DD HH:mm',
                                        )
                                    }}
                                </dd>
                            </div>

                            <div
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex items-center"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    Paid
                                </dt>
                                <dd
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center ml-2 sm:ml-0"
                                >
                                    <p>
                                        {{ order.paid ? 'yes' : 'no' }}
                                    </p>
                                    <div class="ml-2">
                                        <button
                                            @click.prevent="updateOrder('paid')"
                                            class="rounded border border-gray-200 px-3 py-1 text-gray-600"
                                        >
                                            <template v-if="order.paid">
                                                Unpaid
                                            </template>
                                            <template v-else> Paid</template>
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            <div
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex items-center"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    Invoice Issued
                                </dt>
                                <dd
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center ml-2 sm:ml-0"
                                >
                                    <p>
                                        {{
                                            order.issued_invoice ? 'yes' : 'no'
                                        }}
                                    </p>
                                    <div class="ml-2">
                                        <button
                                            @click.prevent="
                                                updateOrder('issued_invoice')
                                            "
                                            class="rounded border border-gray-200 px-3 py-1 text-gray-600"
                                        >
                                            <template
                                                v-if="order.issued_invoice"
                                            >
                                                Unissued
                                            </template>
                                            <template v-else> Issued</template>
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            <div
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex items-center"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    Payment
                                </dt>
                                <dd
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center ml-2 sm:ml-0"
                                >
                                    <p>
                                        {{ order.payment }}
                                    </p>
                                    <div class="ml-2">
                                        <button
                                            @click.prevent="
                                                updateOrder('payment')
                                            "
                                            class="rounded border border-gray-200 px-3 py-1 text-gray-600"
                                        >
                                            <template
                                                v-if="order.payment === 'cash'"
                                            >
                                                Gcash
                                            </template>
                                            <template v-else> Cash</template>
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            <div
                                v-if="order.gcash"
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    Gcash Reference #
                                </dt>
                                <dd
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    {{ order.gcash.reference_number }}
                                </dd>
                            </div>

                            <div
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    Name
                                </dt>
                                <dd
                                    v-if="order.user"
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    {{ order?.user?.first_name }} ,
                                    {{ order?.user?.middle_name }},
                                    {{ order?.user?.last_name }}
                                </dd>
                            </div>

                            <div
                                class="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt class="text-sm font-medium text-gray-900">
                                    Phone
                                </dt>
                                <dd
                                    v-if="order.user"
                                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                                >
                                    {{ order?.user?.phone }}
                                </dd>
                            </div>

                            <div
                                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt
                                    class="text-sm font-medium leading-6 text-gray-900"
                                >
                                    Promotions
                                </dt>
                                <dd
                                    class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                                >
                                    <ul
                                        v-if="order.promotions.length > 0"
                                        role="list"
                                        class="divide-y divide-gray-100 rounded-md border border-gray-200"
                                    >
                                        <li
                                            v-for="(
                                                promotion, index
                                            ) in order.promotions"
                                            :key="index"
                                            class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                        >
                                            <div
                                                class="flex w-0 flex-1 items-center"
                                            >
                                                <div
                                                    class="ml-4 flex min-w-0 flex-1 gap-2"
                                                >
                                                    <span
                                                        class="truncate font-medium"
                                                        >{{
                                                            promotion.name
                                                        }}</span
                                                    >
                                                    <span
                                                        class="flex-shrink-0 text-gray-400"
                                                        >{{
                                                            discount(
                                                                promotion.discount,
                                                            )
                                                        }}% Off</span
                                                    >
                                                </div>
                                            </div>
                                            <div
                                                class="ml-4 flex-shrink-0"
                                            ></div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>

                            <div
                                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt
                                    class="text-sm font-medium leading-6 text-gray-900"
                                >
                                    Products
                                </dt>
                                <dd
                                    class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                                >
                                    <ul
                                        v-if="order.products.length > 0"
                                        role="list"
                                        class="divide-y divide-gray-100 rounded-md border border-gray-200"
                                    >
                                        <li
                                            v-for="(
                                                product, index
                                            ) in order.products"
                                            :key="index"
                                            class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                        >
                                            <div
                                                class="flex w-0 flex-1 items-center"
                                            >
                                                <div
                                                    class="ml-4 flex min-w-0 flex-1 gap-2"
                                                >
                                                    <span
                                                        class="truncate font-medium"
                                                        >{{
                                                            product.name
                                                        }}</span
                                                    >
                                                    <span
                                                        class="flex-shrink-0 text-gray-400"
                                                        >{{ product.price }} *
                                                        {{
                                                            product.quantity
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div
                                                class="ml-4 flex-shrink-0"
                                            ></div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>

                            <Fancybox v-if="order.images">
                                <ul
                                    role="list"
                                    class="px-4 py-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                                >
                                    <li
                                        v-for="(image, index) in order.images"
                                        :key="index"
                                        class="relative"
                                    >
                                        <div
                                            class="aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100"
                                        >
                                            <a
                                                data-fancybox="gallery"
                                                :href="image.path"
                                            >
                                                <img
                                                    class="pointer-events-none object-cover group-hover:opacity-75"
                                                    :src="image.path"
                                                />
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </Fancybox>
                        </dl>
                    </div>
                </div>
            </section>
        </main>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import useFetchOrder from '@/composable/useFetchOrder.js';
import { useRoute, useRouter } from 'vue-router';
import Errors from '@/model/Errors.js';
import moment from 'moment';
import Fancybox from '@/components/Fancybox.vue';

const route = useRoute();
const router = useRouter();
const { loading, order, error } = useFetchOrder(
    `api/admin/order/${route.params.id}`,
);

function editOrder() {
    router.push({
        name: 'admin-order-edit',
        params: { id: route.params.id },
    });
}

function discount(dis) {
    return dis * 100;
}

function updateOrder(column) {
    axios
        .patch(`api/admin/order/${route.params.id}/${column}`)
        .then(() => location.reload())
        .catch(e => {
            let err = new Errors(e);
            alert(err.getMessage());
        });
}

function createGcash() {
    router.push({
        name: 'admin-order-gcash-create',
        params: { id: route.params.id },
    });
}
</script>
<style scoped></style>