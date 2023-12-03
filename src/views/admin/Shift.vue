<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-10">
                <div class="lg:flex lg:h-full lg:flex-col">
                    <header
                        class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none"
                    >
                        <h1
                            class="text-base font-semibold leading-6 text-gray-900"
                        >
                            <time datetime="2022-01"
                                >{{ year }}, {{ month }}
                            </time>
                        </h1>
                        <div class="flex items-center">
                            <div
                                class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch"
                            >
                                <button
                                    type="button"
                                    class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                                >
                                    <span class="sr-only">Previous month</span>
                                    <svg
                                        class="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
                                >
                                    Today
                                </button>
                                <span
                                    class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"
                                ></span>
                                <button
                                    type="button"
                                    class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
                                >
                                    <span class="sr-only">Next month</span>
                                    <svg
                                        class="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </header>
                    <div
                        class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col"
                    >
                        <div
                            class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none"
                        >
                            <div class="flex justify-center bg-white py-2">
                                <span>M</span>
                                <span class="sr-only sm:not-sr-only">on</span>
                            </div>
                            <div class="flex justify-center bg-white py-2">
                                <span>T</span>
                                <span class="sr-only sm:not-sr-only">ue</span>
                            </div>
                            <div class="flex justify-center bg-white py-2">
                                <span>W</span>
                                <span class="sr-only sm:not-sr-only">ed</span>
                            </div>
                            <div class="flex justify-center bg-white py-2">
                                <span>T</span>
                                <span class="sr-only sm:not-sr-only">hu</span>
                            </div>
                            <div class="flex justify-center bg-white py-2">
                                <span>F</span>
                                <span class="sr-only sm:not-sr-only">ri</span>
                            </div>
                            <div class="flex justify-center bg-white py-2">
                                <span>S</span>
                                <span class="sr-only sm:not-sr-only">at</span>
                            </div>
                            <div class="flex justify-center bg-white py-2">
                                <span>S</span>
                                <span class="sr-only sm:not-sr-only">un</span>
                            </div>
                        </div>
                        <div
                            class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto"
                        >
                            <div
                                class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px"
                            >
                                <!--
                                  Always include: "relative py-2 px-3"
                                  Is current month, include: "bg-white"
                                  Is not current month, include: "bg-gray-50 text-gray-500"
                                -->
                                <div
                                    v-for="index in firstDummyDates"
                                    :key="index"
                                    class="relative bg-gray-50 px-3 py-2 text-gray-500"
                                ></div>

                                <div
                                    v-for="(dt, index) in dates"
                                    :key="index"
                                    class="relative bg-gray-50 px-3 py-2 text-gray-500"
                                >
                                    <time
                                        :datetime="dt.full_date"
                                        :class="
                                            dt.is_today
                                                ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                                                : ''
                                        "
                                        >{{ dt.date }}
                                    </time>
                                </div>

                                <div
                                    v-for="index in secondDummyDates"
                                    :key="index"
                                    class="relative bg-gray-50 px-3 py-2 text-gray-500"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const endpoint = ref('/api/admin/order');
const orders = ref([]);
const dates = ref([]);
const year = ref(null);
const month = ref(null);

const firstDummyDates = computed(() => {
    let dayNumber = dates.value[0].day_number;
    return dayNumber > 1 ? dayNumber - 1 : 0;
});

const secondDummyDates = computed(() => {
    return 42 - dates.value.length - firstDummyDates.value;
});

function getAllDatesInMonth(currentYear, currentMonth) {
    let startDate = new Date(currentYear, currentMonth, 1); // currentMonth is 0-indexed
    let endDate = new Date(currentYear, currentMonth + 1, 1);

    let dt = [];
    while (startDate < endDate) {
        let instance = new Date(startDate);
        dt.push(
            instance.getDate() +
                '-' +
                instance.getDay() +
                '-' +
                instance.toLocaleDateString('en-US', { weekday: 'long' }),
        );

        year.value = instance.getFullYear();
        month.value = instance.toLocaleString('default', {
            month: 'long',
        });

        dates.value.push({
            is_today: instance.toDateString() === new Date().toDateString(),
            day_number: instance.getDay() === 0 ? 7 : instance.getDay(),
            day_name: instance.toLocaleDateString('en-US', { weekday: 'long' }),
            date: instance.getDate(),
            full_date: `${instance.getFullYear()}-${
                instance.getMonth() + 1
            }-${instance.getDate()}`,
        });
        startDate.setDate(startDate.getDate() + 1);
    }

    console.log(dt);
    return dt;
}

function fetch(page, query = '') {
    return axios
        .get(`${endpoint.value}?page=${page}&${query}`)
        .then(response => {
            sum_total_amount.value = response.data.sum_total_amount;
            orders.value = response.data.data;
            pagination.value = response.data;
            delete pagination.value.data;
        });
}

getAllDatesInMonth(2023, 10);
// fetch(page.value, toQueryString(queryString.value));
</script>