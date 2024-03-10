<script setup>
import AppFooter from '@/components/AppFooter.vue';
import Breadcrumbs from '@/components/dashboard/Breadcrumbs.vue';
import MainLayout from '@/components/MainLayout.vue';
import { default as AppDashboardNavigation } from '@/components/dashboard/Navigation.vue';
import { onMounted, ref } from 'vue';
import useGooglePlace from '@/composable/useGooglePlace.js';

const { loadPlace } = useGooglePlace();
const placeId = ref(null);

loadPlace();
onMounted(() => {
    let scriptIsReady = false;
    let checkInterval = setInterval(function () {
        if (google) {
            scriptIsReady = true;
            clearInterval(checkInterval);
            let ele = document.getElementById('autocomplete');
            var autocomplete = new google.maps.places.Autocomplete(ele, {
                componentRestrictions: { country: 'ph' },
                fields: ['address_components', 'place_id', 'name'],
            });
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                console.log(place);
                placeId.value = place.place_id;
            });
        }
        return scriptIsReady;
    }, 500);
});
</script>

<template>
    <MainLayout>
        <main class="px-8 mx-auto max-w-screen-2xl w-full">
            <Breadcrumbs />

            <section class="md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                <AppDashboardNavigation />
                <div class="md:col-span-2 lg:col-span-4 p-3">
                    <h3 class="text-gray-900 text-lg font-medium">
                        Address Creation
                    </h3>
                    <p class="font-normal text-gray-400 text-sm">
                        Service you have ordered
                    </p>

                    <input
                        id="autocomplete"
                        type="text"
                        placeholder="Street"
                        class="mt-5 bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    />
                </div>
            </section>
        </main>
        <AppFooter />
    </MainLayout>
</template>

<style scoped></style>