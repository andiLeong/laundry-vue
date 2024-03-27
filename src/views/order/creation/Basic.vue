<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref } from 'vue';
import { useCreateOrderStore } from '@/store/createOrder.js';

const orderStore = useCreateOrderStore();

const service_id = ref(orderStore.service_id);
const address_id = ref(orderStore.address_id);
const pickup = ref(orderStore.pickup);
const delivery = ref(orderStore.delivery);
const description = ref(orderStore.description);
const delivery_fee = ref(orderStore.delivery_fee);
const total_amount = ref(orderStore.total_amount);
const selected_service = ref(null);
const addresses = ref(orderStore.addresses);

const services = ref([
    {
        name: '₱170 up to 8Kg',
        price: 170,
        id: 1,
    },
    {
        name: '₱210 up to 10kg',
        price: 210,
        id: 2,
    },
    {
        name: '₱160 up to 4KG',
        price: 140,
        id: 3,
    },
]);

const startTime = ref([
    { hours: 0, minutes: 0 },
    { hours: 23, minutes: 59 },
]);

function serviceChanged(e) {
    let id = parseInt(e.target.value);
    let service = services.value.filter(service => service.id === id);

    if (service.length !== 1) {
        return;
    }

    selected_service.value = service[0];
    calculateTotalAmount();
}

function addressChanged(e) {
    let id = parseInt(e.target.value);

    getDeliveryFDee();
    calculateTotalAmount();
}

function getDeliveryFDee() {
    delivery_fee.value = Math.floor(Math.random() * 31);
}
function calculateTotalAmount() {
    total_amount.value = delivery_fee.value + selected_service.value.price;
}
function next() {
    orderStore.step += 1;
}
selected_service.value = services.value[0];
calculateTotalAmount();
</script>

<template>
    <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
            <div class="mt-5 border-t border-gray-200">
                <div
                    class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                >
                    <div class="sm:col-span-2">
                        <label
                            for="service_id"
                            class="block text-sm font-medium text-gray-700"
                            >Service</label
                        >
                        <div class="mt-1">
                            <select
                                @change="serviceChanged($event)"
                                id="service_id"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option
                                    v-for="service in services"
                                    :key="service.id"
                                    :value="service.id"
                                >
                                    Full Service : {{ service.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label
                            for="address"
                            class="block text-sm font-medium text-gray-700"
                            >Address</label
                        >
                        <div class="mt-1">
                            <select
                                @change="addressChanged($event)"
                                id="address"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option>United States</option>
                                <option>Malaysia</option>
                            </select>
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label
                            for="address"
                            class="block text-sm font-medium text-gray-700"
                            >Address</label
                        >
                        <div class="mt-1">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                autocomplete="street-address"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            for="first-name"
                            class="block text-sm font-medium text-gray-700"
                            >Pick up</label
                        >
                        <div class="mt-1">
                            <VueDatePicker
                                v-model="pickup"
                                format="yyyy-MM-dd HH:mm"
                                :start-time="startTime"
                                placeholder="Desired Pickup time"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            for="last-name"
                            class="block text-sm font-medium text-gray-700"
                            >Deliver</label
                        >
                        <div class="mt-1">
                            <VueDatePicker
                                v-model="delivery"
                                format="yyyy-MM-dd HH:mm"
                                :start-time="startTime"
                                placeholder="Desired Delivery time"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label
                            for="about"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Description</label
                        >
                        <div class="mt-1">
                            <textarea
                                id="about"
                                name="about"
                                rows="3"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ></textarea>
                        </div>
                        <p
                            class="mt-0.5 italic text-xs leading-6 text-gray-600"
                        >
                            Leave few words about this order
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Order summary -->
        <div class="mt-10 lg:mt-0">
            <div
                class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm"
            >
                <dl
                    class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6"
                >
                    <div class="flex items-center justify-between">
                        <dt class="text-sm">Service</dt>
                        <dd class="text-sm font-medium text-gray-900">
                            ₱{{ selected_service.price }}
                        </dd>
                    </div>
                    <div class="flex items-center justify-between">
                        <dt class="text-sm">Delivery Fee</dt>
                        <dd class="text-sm font-medium text-gray-900">
                            ₱{{ delivery_fee }}
                        </dd>
                    </div>
                    <div class="flex items-center justify-between">
                        <dt class="text-sm">Discount</dt>
                        <dd class="text-sm font-medium text-gray-900">- ₱0</dd>
                    </div>
                    <div
                        class="flex items-center justify-between border-t border-gray-200 pt-6"
                    >
                        <dt class="text-base font-medium">Total</dt>
                        <dd class="text-base font-medium text-gray-900">
                            ₱{{ total_amount }}
                        </dd>
                    </div>
                </dl>

                <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <button
                        type="submit"
                        @click.prevent="next"
                        class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                        Confirm order
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped></style>
