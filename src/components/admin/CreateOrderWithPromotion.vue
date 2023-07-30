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
                    <option disabled value>please select</option>
                    <option
                        v-for="service in services"
                        :value="service.id"
                        :key="service.id"
                        :selected="service.id === service_id"
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
                    type="number"
                    v-model="amount"
                />
            </div>

            <div class="sm:col-span-2">
                <div id="products-selection"></div>
            </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <AdminCreateOrderProductCards @productUpdated="updateProduct"/>
        </div>

        <UserQualifyPromotions
            :amount="amount"
            :service_id="service_id"
            :user_id="user_id"
            @promotionUpdated="updatePromotionIds"
            @discountApplied="updateDiscount"
            @getError="setError"
        />

        <div class="pt-1">
            <div class="mb-2">
                <ErrorManager
                    v-if="errors"
                    :errors="errors"
                />
            </div>
        </div>

        <AdminOrderPricingFooter
            v-if="service_id"
            :total-price="totalPrice"
            :service-price="amount"
            :product-price="totalProductPrice"
            :promotion-price="discountedPrice"
        >
            <SubmitButton
                :loading="isLoading"
                saving="Creating"
                not-saving="Create"
            />
        </AdminOrderPricingFooter>
    </form>
</template>

<script setup>
import BaseInput from '@/components/forms/BaseInput.vue';
import ErrorManager from '@/components/validation/ErrorManager.vue';
import Errors from '@/model/Errors.js';
import SubmitButton from '@/components/forms/SubmitButton.vue';
import SearchUserPhone from '@/components/admin/SearchUserPhone.vue';
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';
import UserQualifyPromotions from '@/components/admin/UserQualifyPromotions.vue';
import AdminCreateOrderProductCards from "@/components/admin/AdminCreateOrderProductCards.vue";
import AdminOrderPricingFooter from "@/components/admin/AdminOrderPricingFooter.vue";

const props = defineProps({
    services: {
        type: Array,
        default: [],
    },
});

const router = useRouter();
const service_id = ref(null);
const user_id = ref(null);
const amount = ref(null);
const errors = ref({});
const isLoading = ref(false);
const promotion_ids = ref([]);
const product_ids = ref([]);
const discountedPrice = ref(0)

const totalProductPrice = computed(() => {
    if (product_ids.value.length === 0) {
        return 0;
    }

    let sum = 0;
    product_ids.value.forEach((product) => {
        sum += product.price;
    })
    return sum;
});

const totalPrice = computed(() => {
    return (parseInt(amount.value) + parseInt(totalProductPrice.value) - parseInt(discountedPrice.value)) || 0;
});

function updateProduct(product) {
    product_ids.value = product
}

function updateDiscount(price) {
    discountedPrice.value = price
}

function updatePromotionIds(ids) {
    promotion_ids.value = ids;
}

function setError(e) {
    errors.value = e;
}

function serviceChanged(e) {
    let serviceId = e.target.value;
    service_id.value = serviceId;
    amount.value = props.services.filter(
        (service) => service.id === parseInt(serviceId),
    )[0].price;
}

function submit() {
    isLoading.value = true;

    let payload = {
        service_id: service_id.value,
        amount: amount.value,
        user_id: user_id.value,
        promotion_ids:
            promotion_ids.value.length === 0 ? null : promotion_ids.value,
    }

    if (product_ids.value.length > 0) {
        let filtered = product_ids.value.map((product) => {
            return {'id': product.id, 'quantity': product.quantity}
        })
        payload.product_ids = filtered
    }

    axios
        .post('api/admin/order', payload)
        .then(() => router.push({name: 'admin-order'}))
        .catch((error) => {
            let err = new Errors(error);
            errors.value = err.handle();
            console.log(errors.value);
            isLoading.value = false;
        });
}
</script>

<style scoped></style>
