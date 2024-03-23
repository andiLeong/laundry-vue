<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl lg:mx-auto mt-10 mx-4">
                <label>label outside form</label>

                <form>
                    <div class="space-y-3 my-6">
                        <div
                            class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                        >
                            <div class="sm:col-span-2">
                                <label class="form-label"
                                    >With form label class without for
                                    attribute</label
                                >
                                <select class="field form-select mt-1">
                                    <option value="1">Cash</option>
                                    <option value="2">Gcash</option>
                                </select>
                            </div>

                            <div class="sm:col-span-2">
                                <label
                                    style="
                                        font-size: 0.875rem;
                                        line-height: 1.25rem;
                                        font-weight: 500;
                                        color: rgb(55 65 81 / 1);
                                    "
                                    >no for-label class but with these css
                                    attribute font-size , line-height ,
                                    font-weight , color
                                </label>
                                <select class="field form-select mt-1">
                                    <option value="1">Cash</option>
                                    <option value="2">Gcash</option>
                                </select>
                            </div>

                            <div class="sm:col-span-2">
                                <label
                                    style="
                                        display: block;
                                        font-size: 0.875rem;
                                        line-height: 1.25rem;
                                    "
                                    >no for-label class but with these css
                                    attribute font-size , line-height ,
                                </label>
                                <select class="field form-select mt-1">
                                    <option value="1">Cash</option>
                                    <option value="2">Gcash</option>
                                </select>
                            </div>

                            <div class="sm:col-span-2">
                                <label
                                    style="
                                        font-size: 0.875rem;
                                        line-height: 1.25rem;
                                        font-weight: 500;
                                        color: red;
                                    "
                                    >no for-label class but with these css
                                    attribute font-size , line-height , color
                                    red
                                </label>
                                <select class="field form-select mt-1">
                                    <option value="1">Cash</option>
                                    <option value="2">Gcash</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    </AdminLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import AdminLayout from '@/components/admin/AdminLayout.vue';

const props = defineProps({
    services: {
        type: Array,
        default: [],
    },
});

const router = useRouter();
</script>

<style scoped></style>
