<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Errors from '@/model/Errors.js';
import SubmitButton from '@/components/forms/SubmitButton.vue';
import BaseInput from '@/components/forms/BaseInput.vue';
import ErrorManager from '@/components/validation/ErrorManager.vue';

const router = useRouter();
const route = useRoute();
const error = ref(null);
const invoice_id = ref(null);
const amount = ref(null);
const loading = ref(false);

function create() {
    loading.value = true;
    axios
        .post('api/admin/order-invoice', {
            order_id: route.params.id,
            invoice_id: invoice_id.value,
            amount: amount.value,
        })
        .then(() =>
            router.push({
                name: 'admin-order-detail',
                params: { id: route.params.id },
            }),
        )
        .catch(e => {
            let err = new Errors(e);
            error.value = err.handle();
        })
        .finally(() => {
            loading.value = false;
        });
}
</script>

<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-lg mx-auto mt-40 flex justify-center">
                <form @submit.prevent="create" class="w-full p-10 space-y-5">
                    <div>
                        <ErrorManager v-if="error" :errors="error" />
                    </div>

                    <div>
                        <label class="form-label">Order ID</label>
                        <input
                            :value="$route.params.id"
                            class="form-input bg-gray-200 cursor-not-allowed mt-1"
                            disabled
                        />
                    </div>

                    <div>
                        <BaseInput
                            labelClass="form-label"
                            placeHolder="Official Receipt Number"
                            class="mt-1 form-input"
                            label="Invoice Number"
                            type="text"
                            v-model="invoice_id"
                        />
                    </div>

                    <div>
                        <BaseInput
                            labelClass="form-label"
                            placeHolder="Invoice Amount"
                            class="mt-1 form-input"
                            label="Amount"
                            type="text"
                            v-model="amount"
                        />
                    </div>

                    <SubmitButton
                        :loading="loading"
                        saving="Creating"
                        not-saving="Create"
                        class="w-full"
                    />
                </form>
            </section>
        </main>
    </AdminLayout>
</template>

<style scoped></style>
