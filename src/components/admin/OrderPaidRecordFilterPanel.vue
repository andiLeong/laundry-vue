<template>
    <form class="space-y-3 my-6" @submit.prevent="submit">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            Search Panel
        </h3>

        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-1">
                <label class="form-label">Payments</label>
                <select class="field form-select mt-1" v-model="search.payment">
                    <option disabled value="null">please select</option>
                    <option value="1">Cash</option>
                    <option value="2">Gcash</option>
                </select>
            </div>

            <div class="sm:col-span-2 flex flex-col">
                <p class="form-label mb-1">Start & End</p>
                <VueDatePicker
                    v-model="search.date"
                    range
                    multi-calendars
                    format="yyyy-MM-dd HH:mm"
                    :start-time="startTime"
                    placeholder="Search By Date"
                />
            </div>
        </div>

        <div class="pt-1">
            <div class="flex justify-end">
                <button
                    type="button"
                    @click.prevent="reset"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Search
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import BaseInput from '@/components/forms/BaseInput.vue';
import BaseSelect from '@/components/forms/BaseSelect.vue';
import ToggleButton from '@/components/forms/ToggleButton.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import moment from 'moment/moment.js';

export default {
    components: {
        VueDatePicker,
        ToggleButton,
        BaseInput,
        BaseSelect,
    },

    emits: ['search-query', 'reset-query'],
    data() {
        return {
            search: {
                per_page: 10,
                payment: null,
                date: null,
            },
            startTime: [
                { hours: 0, minutes: 0 },
                { hours: 23, minutes: 59 },
            ],
            perPage: [10, 50, 100, 200],
        };
    },

    computed: {},

    methods: {
        reset() {
            this.search = {
                per_page: 10,
                payment: null,
                date: null,
            };

            this.$emit('reset-query');
        },

        submit() {
            let search = Object.fromEntries(
                Object.entries(this.search).filter(([_, v]) => v != null),
            );

            if (search.per_page === 10) {
                delete search.per_page;
            }

            if (Object.keys(search).length === 0) {
                return;
            }

            if ('date' in search) {
                search.start = moment(search.date[0]).format(
                    'YYYY-MM-DD HH:mm',
                );
                search.end = moment(search.date[1]).format('YYYY-MM-DD HH:mm');
                delete search.date;
            }
            this.$emit('search-query', search);
        },
    },
};
</script>