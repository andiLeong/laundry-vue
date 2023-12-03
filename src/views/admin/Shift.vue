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
                                >{{ year }}, {{ currentMonthName }}
                            </time>
                        </h1>
                        <div class="flex items-center">
                            <div
                                class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch"
                            >
                                <button
                                    type="button"
                                    @click.prevent="switchMonth(month - 1)"
                                    class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                                >
                                    <span class="sr-only">Previous month</span>
                                    <ChevronLeft class="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    @click.prevent="setCurrentMonth()"
                                    class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
                                >
                                    Today
                                </button>
                                <span
                                    class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"
                                ></span>
                                <button
                                    type="button"
                                    @click.prevent="switchMonth(month + 1)"
                                    class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
                                >
                                    <span class="sr-only">Next month</span>
                                    <ChevronRight class="h-5 w-5" />
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
                                    <ol v-if="hasShift(dt.shifts)" class="mt-2">
                                        <li>
                                            <a href="#" class="group flex">
                                                <p
                                                    class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"
                                                >
                                                    work
                                                </p>
                                                <time
                                                    datetime="2022-01-03T10:00"
                                                    class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                                                >
                                                    {{ dt.shifts.from }}-{{
                                                        dt.shifts.to
                                                    }}
                                                </time>
                                            </a>
                                        </li>
                                    </ol>
                                </div>

                                <div
                                    v-for="index in secondDummyDates"
                                    :key="index"
                                    class="relative bg-gray-50 px-3 py-2 text-gray-500"
                                ></div>
                            </div>
                        </div>

                        <!--  mobile -->
                        <div
                            class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden"
                        >
                            <!--
                              Always include: "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
                              Is current month, include: "bg-white"
                              Is not current month, include: "bg-gray-50"
                              Is selected or is today, include: "font-semibold"
                              Is selected, include: "text-white"
                              Is not selected and is today, include: "text-indigo-600"
                              Is not selected and is current month, and is not today, include: "text-gray-900"
                              Is not selected, is not current month, and is not today: "text-gray-500"
                            -->
                            <button
                                type="button"
                                v-for="index in firstDummyDates"
                                :key="index"
                                class="flex h-24 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
                            >
                                <!--
                                  Always include: "ml-auto"
                                  Is selected, include: "flex h-6 w-6 items-center justify-center rounded-full"
                                  Is selected and is today, include: "bg-indigo-600"
                                  Is selected and is not today, include: "bg-gray-900"
                                -->
                                <!--                                <time datetime="2021-12-27" class="ml-auto"-->
                                <!--                                    >27 mobile-->
                                <!--                                </time>-->
                                <span class="sr-only">0 events</span>
                            </button>

                            <div
                                class="flex h-24 flex-col px-3 py-2 focus:z-10"
                                v-for="(dt, index) in dates"
                                :key="index"
                                :class="
                                    dt.is_today
                                        ? 'bg-indigo-300 text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-100'
                                "
                            >
                                <time
                                    :datetime="dt.full_date"
                                    class="ml-auto flex-1"
                                    >{{ dt.date }}
                                </time>
                                <template v-if="hasShift(dt.shifts)">
                                    <p class="text-xs">
                                        {{ dt.shifts.from }}-{{ dt.shifts.to }}
                                    </p>
                                </template>
                            </div>

                            <button
                                type="button"
                                v-for="index in secondDummyDates"
                                :key="index"
                                class="flex h-24 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
                            >
                                <span class="sr-only">0 events</span>
                            </button>
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
import ChevronRight from '@/svg/ChevronRight.vue';
import ChevronLeft from '@/svg/ChevronLeft.vue';
import moment from 'moment';

const route = useRoute();
const router = useRouter();
const endpoint = ref('/api/admin/shifts');
const shifts = ref([]);
const dates = ref([]);
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth());

const firstDummyDates = computed(() => {
    let dayNumber = dates.value[0].day_number;
    return dayNumber > 1 ? dayNumber - 1 : 0;
});

const secondDummyDates = computed(() => {
    return 42 - dates.value.length - firstDummyDates.value;
});

const currentMonthName = computed(() => {
    let instance = new Date();
    instance.setMonth(month.value);
    return instance.toLocaleString('default', {
        month: 'long',
    });
});

function switchMonth(toMonth) {
    if (toMonth < 0) {
        month.value = 11;
        year.value = year.value - 1;
    } else if (toMonth > 11) {
        month.value = 0;
        year.value = year.value + 1;
    } else {
        month.value = toMonth;
    }

    getAllDatesInMonth(year.value, month.value);
    fetch(`year=${year.value}&month=${month.value + 1}`);
}

function setCurrentMonth() {
    let instance = new Date();
    month.value = instance.getMonth();
    year.value = instance.getFullYear();
    getAllDatesInMonth(year.value, month.value);
    fetch(`year=${year.value}&month=${month.value + 1}`);
}

function hasShift(shift) {
    return Object.keys(shift).length > 0;
}

function getAllDatesInMonth(currentYear, currentMonth) {
    let startDate = new Date(currentYear, currentMonth, 1); // currentMonth is 0-indexed
    let endDate = new Date(currentYear, currentMonth + 1, 1);

    let dt = [];
    while (startDate < endDate) {
        let instance = new Date(startDate);

        dt.push({
            is_today: instance.toDateString() === new Date().toDateString(),
            day_number: instance.getDay() === 0 ? 7 : instance.getDay(),
            day_name: instance.toLocaleDateString('en-US', { weekday: 'long' }),
            date: instance.getDate(),
            full_date: `${instance.getFullYear()}-${instance.toLocaleDateString(
                'en-US',
                { month: '2-digit' },
            )}-${instance.toLocaleDateString('en-US', { day: '2-digit' })}`,
            shifts: {},
        });
        startDate.setDate(startDate.getDate() + 1);
    }

    dates.value = dt;
    return dt;
}

function fetch(query = '') {
    return axios.get(`${endpoint.value}?${query}`).then(response => {
        shifts.value = response.data;
        dates.value = dates.value.map(dt => {
            let shifts = {};
            let shift = response.data.filter(shifting => {
                return dt.full_date == shifting.date;
            });
            if (shift.length > 0) {
                shifts = {
                    from: moment(shift[0].from).format('HH:mm'),
                    to: moment(shift[0].to).format('HH:mm'),
                };
            }
            dt.shifts = shifts;
            return dt;
        });
    });
}

getAllDatesInMonth(year.value, month.value);
fetch();
</script>