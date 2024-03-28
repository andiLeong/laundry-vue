<script setup>
import AppFooter from '@/components/AppFooter.vue';
import MainLayout from '@/components/MainLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { default as AppDashboardNavigation } from '@/components/dashboard/Navigation.vue';
import Breadcrumbs from '@/components/dashboard/Breadcrumbs.vue';
import AppModal from '@/components/AppModal.vue';
import HomeSolid from '@/svg/HomeSolid.vue';
import { useNotificationStore } from '@/store/Notification.js';
import Errors from '@/model/Errors.js';
import AppLink from '@/components/AppLink.vue';
import AddressSkeleton from '@/components/skeleton/AddressSkeleton.vue';
<<<<<<< HEAD
import AddressEmptyState from '@/components/emptyState/AddressEmptyState.vue';
=======
>>>>>>> feature/customer-address-management

const route = useRoute();
const router = useRouter();
const endpoint = ref('/api/address');
const columns = ref(['room', 'name', 'address']);
const addresses = ref([]);
const error = ref(null);
const loading = ref(false);
const updateLoading = ref(false);
const displayPagination = ref(true);

const open = ref(false);
const selected = ref(null);

const notificationStore = useNotificationStore();

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

function openModal(address) {
    selected.value = {
        name: address.name,
        room: address.room,
        address: address.address,
        id: address.id,
    };
    open.value = true;
}

function update() {
    updateLoading.value = true;
    axios
        .patch(`api/address/${selected.value.id}`, {
            room: selected.value.room,
        })
        .then(response => {
            open.value = false;
            notificationStore.message = 'Your address updated.';
            notificationStore.show = true;
            // fetch();
        })
        .catch(er => {
            open.value = false;
            notificationStore.message = new Errors(er).getMessage();
            notificationStore.show = true;
            notificationStore.type = 'warning';
        })
        .finally(() => {
            updateLoading.value = false;
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
                    <div class="md:flex items-center justify-between">
                        <div>
                            <h3 class="text-gray-900 text-lg font-medium">
                                Address
                            </h3>
                            <p class="font-normal text-gray-400 text-sm">
                                Service you have ordered
                            </p>
                        </div>
                        <div class="mt-3 md:mt-0">
                            <AppLink
                                v-if="addresses.length > 0"
                                :to="{ name: 'address-create' }"
                                class="rounded-md text-white py-1.5 md:py-2 px-3 bg-primary text-sm"
                            >
                                Create
                            </AppLink>
                        </div>
                    </div>

                    <template v-if="loading">
                        <AddressSkeleton />
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
                                                        @click.prevent="
                                                            openModal(address)
                                                        "
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
                                                @click.prevent="
                                                    openModal(address)
                                                "
                                                class="rounded-md bg-white px-2.5 py-1.5 text-xs md:font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </section>
                            <AddressEmptyState class="mt-10" />
                        </template>
                    </template>
                </div>
            </section>
        </main>
        <AppFooter />
        <AppModal :show="open" @closed="() => (open = false)">
            <div>
                <div class="mt-3 text-center sm:mt-5">
                    <div
                        class="max-w-xs mx-auto relative mt-2 rounded-md shadow-sm"
                    >
                        <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                        >
                            <HomeSolid class="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            v-model="selected.room"
                            placeholder="Room/street #"
                        />
                    </div>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">
                            {{ selected.name }} @ {{ selected.address }}
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
            >
                <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:col-start-2"
                    @click.prevent="update"
                >
                    Update
                </button>
                <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    @click.prevent="open = false"
                    ref="cancelButtonRef"
                >
                    Cancel
                </button>
            </div>
        </AppModal>
    </MainLayout>
</template>

<style scoped></style>
