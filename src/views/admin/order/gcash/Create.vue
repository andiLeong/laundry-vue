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
const number = ref(null);
const loading = ref(false);

function create() {
    loading.value = true;
    axios
        .post('api/admin/gcash-order', {
            order_id: route.params.id,
            reference_number: number.value,
        })
        .then(() =>
            router.push({
                name: 'admin-order-detail',
                params: { id: route.params.id },
            }),
        )
        .catch((e) => {
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
                            placeHolder="Gcash Reference Number"
                            class="mt-1 form-input"
                            label="Reference Number"
                            type="text"
                            v-model="number"
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