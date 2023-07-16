<template>

    <form class="space-y-3 my-6" @submit.prevent="submit">
        <SearchUserPhone v-model="user_id"/>

        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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
                        :selected=" service.id === service_id "
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

        <div v-if="promotions !== null" class="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-2">
                <fieldset>
                    <legend class="form-label">Isolated</legend>
                    <div class="mt-2 space-y-1">
                        <div
                            v-for="promotion in isolatedPromotions"
                            :key="promotion.id"
                            class="relative flex gap-x-3"
                        >
                            <div class="flex h-6 items-center">
                                <input
                                    @change="addPromotions(promotion.id)"
                                    :id="promotion.id" type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600">
                            </div>
                            <div class="text-sm leading-6">
                                <label :for="promotion.id" class="form-label">{{ promotion.name }}</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>

            <div class="sm:col-span-2">
                <fieldset>
                    <legend class="form-label">Non Isolated</legend>
                    <div class="mt-2 space-y-1">
                        <div
                            v-for="promotion in nonIsolatedPromotions"
                            :key="promotion.id"
                            class="relative flex gap-x-3"
                        >
                            <div class="flex h-6 items-center">
                                <input
                                    @change="addPromotions(promotion.id)"
                                    :id="promotion.id" type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600">
                            </div>
                            <div class="text-sm leading-6">
                                <label :for="promotion.id" class="form-label">{{ promotion.name }}</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>

            <div class="sm:col-span-2">
                <ToggleButton :state="isolated" @changed="setIsolated"/>
            </div>
        </div>

        <div class="pt-1">
            <div class="mb-2">
                <ErrorManager
                    v-if="errors"
                    :errors="errors"
                />
            </div>

            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-2 flex justify-between">

                    <button
                        @click.prevent="fetchPromotions"
                        type="button"
                        class="rounded bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-600 shadow-sm hover:bg-sky-100">
                        Promotion
                    </button>

                    <SubmitButton
                        :loading="isLoading"
                        saving="Creating"
                        not-saving="Create"
                    />
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import BaseInput from '@/components/forms/BaseInput.vue';
import ErrorManager from '@/components/validation/ErrorManager.vue';
import Errors from "@/model/Errors.js";
import SubmitButton from "@/components/forms/SubmitButton.vue";
import SearchUserPhone from "@/components/admin/SearchUserPhone.vue";
import useFetchServices from "@/composable/useFetchServices.js";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import ToggleButton from "@/components/forms/ToggleButton.vue";

const router = useRouter();
const {services} = useFetchServices();
const service_id = ref(null);
const user_id = ref(null);
const amount = ref(null);
const errors = ref({});
const isLoading = ref(false);
const promotion_ids = ref([]);
const promotions = ref(null);
const isolated = ref(false);


const isolatedPromotions = computed(() => promotions.value?.isolated)
const nonIsolatedPromotions = computed(() => promotions.value !== null ? promotions.value['non-isolated'] : null)

function addPromotions(id) {
    if (promotion_ids.value.includes(id)) {
        let index = promotion_ids.value.indexOf(id);
        promotion_ids.value.splice(index, 1);
        return;
    }
    promotion_ids.value.push(id);
}

function setIsolated(value) {
    isolated.value = value
}

function fetchPromotions() {
    // isLoading.value = true;
    if (user_id.value === null || service_id.value === null) {
        return;
    }

    axios
        .get(`api/admin/user/qualified-promotion/${user_id.value}/${service_id.value}`)
        .then(({data}) => {
            promotions.value = data;
            console.log(data)
        })
        .catch((error) => {
            let err = new Errors(error);
            errors.value = err.handle();
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
            promotion_ids: promotion_ids.value,
            isolated: Number(isolated.value),
        })
        .then(() => router.push({name: 'admin-order'}))
        .catch((error) => {
            let err = new Errors(error);
            errors.value = err.handle();
            console.log(errors.value)
            isLoading.value = false;
        });
}
</script>

<style scoped>

</style>