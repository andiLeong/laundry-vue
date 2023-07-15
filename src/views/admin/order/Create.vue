<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import AppTab from '@/components/AppTab.vue';
import AppTabs from '@/components/AppTabs.vue';
import {ref, watch} from 'vue';
import BaseInput from '@/components/forms/BaseInput.vue';
import {useRouter} from 'vue-router';
import ErrorManager from '@/components/validation/ErrorManager.vue';
import Errors from "@/model/Errors.js";
import SubmitButton from "@/components/forms/SubmitButton.vue";
import LoadingIndicator from '@/svg/LoadingIndicator.vue';

const services = ref([{id: 23, name: 'full'}]);
const service_id = ref(null);
const user_id = ref(null);
const amount = ref(null);
const router = useRouter();

const errors = ref({});
const isLoading = ref(false);
const phone = ref(null);
const user = ref(null);
const noUser = ref(false);


watch(phone, async (newPhone, oldPhone) => {
    noUser.value = false;
    searchUser(newPhone)
})

function fetchService() {
    axios.get('api/service').then(function ({data}) {
        services.value = data;
    });
}

function serviceChanged(e) {
    let serviceId = e.target.value;
    service_id.value = serviceId;
    amount.value = services.value.filter((service) => {
        return service.id === parseInt(serviceId);
    })[0].price;
}

function submit() {
    isLoading.value = true;
    axios
        .post('api/admin/order', {
            service_id: service_id.value,
            amount: amount.value,
            user_id: user_id.value,
        })
        .then(() => router.push({name: 'admin-order'}))
        .catch((error) => {
            let err = new Errors(error);
            errors.value = err.handle();
            console.log(errors.value)
        });
    isLoading.value = false;
}

function searchUser(phone) {

    if (phone !== null && phone.length === 11) {

        isLoading.value = true
        axios.get('api/admin/user/' + phone).then(response => {
            user.value = response.data
            user_id.value = user.value.id
            console.log(response.data)
            isLoading.value = false
        }).catch(() => {
            isLoading.value = false
            noUser.value = true
        });
    }
}

function clear() {
    phone.value = null
    user.value = null
    user_id.value = null
    noUser.value = false
}

fetchService();
</script>

<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <AppTabs id="create-order-tab">
                    <AppTab title="Without Promotion">
                        <form class="space-y-3 my-6" @submit.prevent="submit">
                            <div
                                class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                            >
                                <div class="sm:col-span-1">
                                    <BaseInput
                                        labelClass="form-label"
                                        placeHolder="search user phone"
                                        class="mt-1 form-input"
                                        label="User"
                                        type="text"
                                        v-model="phone"
                                    />
                                </div>
                                <div class="sm:col-span-1 flex items-center">
                                    <div v-if="isLoading" class="mt-5">
                                        <LoadingIndicator class="animate-spin -ml-1 mr-3 h-6 w-6 text-sky-500"/>
                                    </div>
                                    <div v-if="user" class="mt-5 flex items-center">
                                        <button
                                            class="mr-2 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            @click.prevent="clear">
                                            &#10005
                                        </button>
                                        <p class="form-label">
                                            {{ user.first_name }}.{{ user.last_name }}
                                        </p>
                                    </div>
                                    <div v-if="noUser" class="mt-5 flex items-center">
                                        <button
                                            class="mr-2 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            @click.prevent="clear">
                                            &#10005
                                        </button>
                                        <p class="text-xs text-red-400">No User Found</p>
                                    </div>
                                </div>
                            </div>


                            <div
                                class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                            >
                                <div class="sm:col-span-2">
                                    <label class="form-label">Service</label>
                                    <select
                                        class="field form-select mt-1"
                                        :value="service_id"
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
                                                service.id === service_id
                                            "
                                        >
                                            {{ service.name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="sm:col-span-2">
                                    <BaseInput
                                        labelClass="form-label"
                                        placeHolder="Amount"
                                        class="mt-1 form-input"
                                        label="Order Amount"
                                        type="text"
                                        v-model="amount"
                                    />
                                </div>
                            </div>
                            <div class="pt-1">
                                <div class="mb-2">
                                    <ErrorManager
                                        v-if="errors"
                                        :errors="errors"
                                    />
                                </div>
                                <div class="flex justify-start">
                                    <SubmitButton
                                        :loading="isLoading"
                                        saving="Creating"
                                        not-saving="Create"
                                    />
                                </div>
                            </div>
                        </form>
                    </AppTab>
                    <AppTab title="With Promotion">
                        <p>Hello world again. second</p>
                    </AppTab>
                </AppTabs>
            </section>
        </main>
    </AdminLayout>
</template>

<style scoped></style>
