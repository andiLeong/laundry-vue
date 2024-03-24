<script setup>
import AppFooter from '@/components/AppFooter.vue';
import MainLayout from '@/components/MainLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { default as AppDashboardNavigation } from '@/components/dashboard/Navigation.vue';
import Spinner from '@/svg/Spinner.vue';
import Breadcrumbs from '@/components/dashboard/Breadcrumbs.vue';

const route = useRoute();
const router = useRouter();
const endpoint = ref('/api/address');
const columns = ref(['room', 'name', 'address']);
const addresses = ref([]);
const error = ref(null);
const loading = ref(false);
const displayPagination = ref(true);

function fetch() {
    loading.value = true;
    return axios
        .get(`${endpoint.value}`)
        .then(response => {
            addresses.value = response.data.data;
        })
        .catch(() => {
            error.value = 'please try again later server error';
        })
        .finally(() => {
            loading.value = false;
        });
}

fetch();
</script>

<template>
    <MainLayout>
        <main class="px-8 mx-auto max-w-screen-2xl w-full">
            <Breadcrumbs />

            <section
                :class="displayPagination ? 'min-h-screen' : ''"
                class="md:grid md:grid-cols-3 lg:grid-cols-5 gap-6"
            >
                <AppDashboardNavigation />
                <div class="md:col-span-2 lg:col-span-4 p-3">
                    <h3 class="text-gray-900 text-lg font-medium">Address</h3>
                    <p class="font-normal text-gray-400 text-sm">
                        Service you have ordered
                    </p>

                    <template v-if="loading">
                        <Spinner
                            class="text-sky-500 h-6 w-6 animate-spin mt-4"
                        />
                    </template>
                    <template v-else>
                        <p v-if="error" class="validation-error mt-10">
                            {{ error }}
                        </p>
                        <template v-else>
                            <section v-if="addresses.length > 0" class="mt-3">
                                <ul
                                    v-for="(address, index) in addresses"
                                    :key="index"
                                    role="list"
                                    class="divide-y divide-gray-100"
                                >
                                    <li
                                        class="md:flex items-center justify-between gap-x-6 py-5"
                                    >
                                        <div class="min-w-0">
                                            <div
                                                class="flex items-start justify-between gap-x-3"
                                            >
                                                <p
                                                    class="text-sm font-semibold leading-6 text-gray-900"
                                                >
                                                    {{ address.name }}
                                                </p>
                                                <div class="md:hidden">
                                                    <button
                                                        class="rounded-md bg-white px-2 py-1 text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
                                            >
                                                <div class="">
                                                    {{ address.room }}
                                                    <template
                                                        v-if="address.room"
                                                    >
                                                        <span> - </span>
                                                    </template>
                                                    {{ address.address }}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="hidden md:flex justify-end items-center mt-3 md:mt-0"
                                        >
                                            <button
                                                class="rounded-md bg-white px-2 py-1 md:px-2.5 md:py-1.5 text-xs md:font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </section>
                            <p v-else class="validation-error mt-10">
                                Create Address now and start laundry
                            </p>
                        </template>
                    </template>
                </div>
            </section>
        </main>
        <AppFooter />
    </MainLayout>
</template>

<style scoped></style>