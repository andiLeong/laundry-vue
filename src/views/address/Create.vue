<script setup>
import AppFooter from '@/components/AppFooter.vue';
import Breadcrumbs from '@/components/dashboard/Breadcrumbs.vue';
import MainLayout from '@/components/MainLayout.vue';
import { default as AppDashboardNavigation } from '@/components/dashboard/Navigation.vue';
import { onMounted, ref } from 'vue';
import useGooglePlace from '@/composable/useGooglePlace.js';
import { useNotificationStore } from '@/store/Notification.js';
import Errors from '@/model/Errors.js';
import LoadingIndicator from '@/svg/LoadingIndicator.vue';

const notificationStore = useNotificationStore();
const { loadPlace } = useGooglePlace();
const placeId = ref(null);
const province = ref(null);
const city = ref(null);
const street = ref(null);
const room = ref(null);
const name = ref(null);
const error = ref(null);
const isLoading = ref(false);

loadPlace();
onMounted(() => {
    let scriptIsReady = false;
    let checkInterval = setInterval(function () {
        if (google) {
            scriptIsReady = true;
            clearInterval(checkInterval);
            const center = { lat: 14.554708943276136, lng: 121.02430021045242 };
            const defaultBounds = {
                north: center.lat + 0.03,
                south: center.lat - 0.03,
                east: center.lng + 0.03,
                west: center.lng - 0.03,
            };

            let ele = document.getElementById('autocomplete');
            var autocomplete = new google.maps.places.Autocomplete(ele, {
                componentRestrictions: { country: 'ph' },
                fields: ['address_components', 'place_id', 'name'],
                strictBounds: true,
                bounds: defaultBounds,
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                console.log(place);
                placeId.value = place.place_id;
                name.value = place.name;

                place.address_components.forEach(address => {
                    let type = address.types;
                    if (type.includes('locality')) {
                        city.value = address.long_name;
                    }
                    if (type.includes('administrative_area_level_1')) {
                        province.value = address.long_name;
                    }
                    if (type.includes('route')) {
                        street.value = address.long_name;
                    }
                });
            });
        }
        return scriptIsReady;
    }, 500);
});

function submit() {
    isLoading.value = true;

    let payload = {
        room: room.value,
        place_id: placeId.value,
    };

    axios
        .post('/api/address', payload)
        .then(() => {
            placeId.value = null;
            room.value = null;
            street.value = null;
            name.value = null;
            city.value = null;
            province.value = null;
            notificationStore.message = 'Your address save.';
            notificationStore.show = true;
        })
        .catch(er => {
            notificationStore.message = new Errors(er).getMessage();
            notificationStore.show = true;
            notificationStore.type = 'warning';
        })
        .finally(() => {
            isLoading.value = false;
        });
}
</script>

<template>
    <MainLayout>
        <main class="px-8 mx-auto max-w-screen-2xl w-full">
            <Breadcrumbs />

            <section class="md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                <AppDashboardNavigation />
                <div class="md:col-span-2 lg:col-span-4 p-3" v-auto-animate>
                    <h2 class="text-base font-semibold leading-7 text-gray-900">
                        Address Creation
                    </h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">
                        Search Address from below
                    </p>

                    <div class="my-4 grid grid-cols-2">
                        <div class="col-span-2 md:col-span-1">
                            <input
                                id="autocomplete"
                                type="text"
                                placeholder="Street"
                                class="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                            <p
                                class="text-pink-300 text-xs font-semibold mt-1.5"
                            >
                                Notice: we could not deliver If a place is about
                                1000 meter away from our shop,
                            </p>
                        </div>
                    </div>
                    <form @submit.prevent="submit" v-if="placeId">
                        <div class="space-y-12">
                            <div class="border-b border-gray-900/10 pb-10">
                                <div
                                    class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                                >
                                    <div
                                        class="lg:col-start-1 lg:col-end-3 md:col-span-3"
                                    >
                                        <label
                                            for="room"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                            >Room/Floor</label
                                        >
                                        <div class="mt-1">
                                            <input
                                                type="text"
                                                id="room"
                                                v-model="room"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        class="lg:col-end-7 lg:col-span-2 md:col-span-3"
                                    >
                                        <label
                                            for="name"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                            >Name</label
                                        >
                                        <div class="mt-1">
                                            <input
                                                disabled
                                                type="text"
                                                id="name"
                                                v-model="name"
                                                class="bg-gray-300 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label
                                            for="street"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                            >Street</label
                                        >
                                        <div class="mt-1">
                                            <input
                                                disabled
                                                type="text"
                                                id="street"
                                                v-model="street"
                                                class="bg-gray-300 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        class="sm:col-span-1 md:col-span-2 lg:col-span-1"
                                    >
                                        <label
                                            for="city"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                            >City</label
                                        >
                                        <div class="mt-1">
                                            <input
                                                disabled
                                                type="text"
                                                id="city"
                                                v-model="city"
                                                class="bg-gray-300 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        class="sm:col-span-1 md:col-span-2 lg:col-span-1"
                                    >
                                        <label
                                            for="province"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                            >Province</label
                                        >
                                        <div class="mt-1">
                                            <input
                                                disabled
                                                type="text"
                                                id="province"
                                                v-model="province"
                                                class="bg-gray-300 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label
                                            for="country"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                            >Country</label
                                        >
                                        <div class="mt-1">
                                            <select
                                                disabled
                                                id="country"
                                                name="country"
                                                autocomplete="country-name"
                                                class="bg-gray-300 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option>Philippines</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <p v-if="error" class="validation-error">
                                    {{ error }}
                                </p>
                            </div>
                        </div>

                        <div class="mt-6 md:grid grid-cols-10">
                            <div class="col-start-9 col-end-11 lg:col-start-10">
                                <button
                                    type="submit"
                                    :class="
                                        isLoading
                                            ? 'bg-slate-200'
                                            : 'bg-primary'
                                    "
                                    class="w-full rounded-md px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <template v-if="isLoading">
                                        <div
                                            class="flex items-center justify-center"
                                        >
                                            <LoadingIndicator
                                                class="text-primary h-4 w-4 mr-2 animate-spin"
                                            />
                                            <p class="text-sm text-slate-400">
                                                Save
                                            </p>
                                        </div>
                                    </template>
                                    <template v-else> Save</template>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
        <AppFooter />
    </MainLayout>
</template>

<style scoped></style>
