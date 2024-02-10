<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import useFetchOrder from '@/composable/useFetchOrder.js';
import Errors from '@/model/Errors.js';
import useFetchServices from '@/composable/useFetchServices.js';
import BaseInput from '@/components/forms/BaseInput.vue';
import ErrorManager from '@/components/validation/ErrorManager.vue';
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);
const endpoint = ref(`/api/admin/order/${id.value}`);
const isLoading = ref(false);
const errors = ref({});
const pond = ref(null);

const { services } = useFetchServices();
const { loading, order, error } = useFetchOrder(endpoint.value);

const FilePond = vueFilePond(FilePondPluginFileValidateType);

function serviceChanged(e) {
    let serviceId = e.target.value;
    order.value.service_id = serviceId;
    order.value.amount = services.value.filter(
        service => service.id === parseInt(serviceId),
    )[0].price;
}

function update() {
    const payload = new FormData();
    payload.append('service_id', order.value.service_id);
    payload.append('amount', order.value.amount);
    payload.append('description', order.value.description);
    payload.append('_method', 'patch');
    pond.value.getFiles().forEach(image => {
        payload.append('image[]', image.file);
    });
    axios
        .post(endpoint.value, payload, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(() =>
            router.push({
                name: 'admin-order-detail',
                params: { id: id.value },
            }),
        )
        .catch(error => {
            let err = new Errors(error);
            errors.value = err.handle();
            console.log(errors.value);
            isLoading.value = false;
        });
}
</script>

<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section v-if="order" class="max-w-6xl lg:mx-auto mt-10 mx-4">
                <form @submit.prevent="update">
                    <div class="pt-1">
                        <div class="mb-2">
                            <ErrorManager v-if="errors" :errors="errors" />
                        </div>
                    </div>
                    <div class="space-y-12">
                        <div class="border-b border-gray-900/10 pb-12">
                            <h2
                                class="text-base font-semibold leading-7 text-gray-900"
                            >
                                Order #{{ id }}
                            </h2>

                            <div
                                class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                            >
                                <div class="sm:col-span-3">
                                    <label class="form-label">Service</label>
                                    <select
                                        class="field form-select mt-1"
                                        :value="order.service_id"
                                        @change="serviceChanged"
                                    >
                                        <option disabled value>
                                            please select
                                        </option>
                                        <option
                                            v-for="service in services"
                                            :value="service.id"
                                            :key="service.id"
                                            :selected="
                                                service.id === order.service_id
                                            "
                                        >
                                            {{ service.name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="sm:col-span-3">
                                    <BaseInput
                                        labelClass="form-label"
                                        placeHolder="Amount"
                                        class="mt-1 form-input"
                                        label="Order Amount"
                                        type="number"
                                        v-model="order.amount"
                                    />
                                </div>

                                <div class="col-span-full">
                                    <BaseInput
                                        labelClass="form-label"
                                        placeHolder="Write the order description"
                                        class="mt-1 form-input"
                                        label="Order Description"
                                        type="text"
                                        v-model="order.description"
                                    />
                                    <p
                                        class="mt-3 text-sm leading-6 text-gray-600"
                                    >
                                        Write a few words about the order.
                                    </p>
                                </div>

                                <div class="col-span-full">
                                    <file-pond
                                        name="test"
                                        ref="pond"
                                        label-idle="Drop images here..."
                                        v-bind:allow-multiple="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </section>
        </main>
    </AdminLayout>
</template>

<style scoped></style>