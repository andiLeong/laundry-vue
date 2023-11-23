<template>
    <form class="space-y-3 my-6" @submit.prevent="submit">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            Search Panel
        </h3>

        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-2">
                <BaseInput
                    labelClass="form-label"
                    placeHolder="Search user phone number"
                    class="mt-1 form-input"
                    label="Phone"
                    type="text"
                    v-model="search.phone"
                />
            </div>

            <div class="sm:col-span-2">
                <BaseInput
                    labelClass="form-label"
                    placeHolder="Search customer first name"
                    class="mt-1 form-input"
                    label="First Name"
                    type="text"
                    v-model="search.first_name"
                />
            </div>

            <div class="sm:col-span-2">
                <BaseInput
                    labelClass="form-label"
                    placeHolder="Search order description"
                    class="mt-1 form-input"
                    label="Description"
                    type="text"
                    v-model="search.description"
                />
            </div>

            <div class="sm:col-span-1">
                <label class="form-label">Paid</label>
                <select class="field form-select mt-1" v-model="search.paid">
                    <option disabled value="null">please select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>

            <div class="sm:col-span-1">
                <label class="form-label">Payments</label>
                <select class="field form-select mt-1" v-model="search.payment">
                    <option disabled value="null">please select</option>
                    <option value="1">Cash</option>
                    <option value="2">Gcash</option>
                </select>
            </div>

            <div class="sm:col-span-1">
                <label class="form-label">Confirmed</label>
                <select
                    class="field form-select mt-1"
                    v-model="search.confirmed"
                >
                    <option disabled value="null">please select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>

            <div
                class="sm:col-span-1 flex justify-center items-center flex-col"
            >
                <p class="form-label">Make By User</p>
                <div class="mt-2">
                    <toggle-button
                        :state="search.include_user"
                        @changed="setMakeByUser"
                    ></toggle-button>
                </div>
            </div>

            <div class="sm:col-span-1">
                <BaseInput
                    labelClass="form-label"
                    placeHolder="Search customer id"
                    class="mt-1 form-input"
                    label="User Id"
                    type="text"
                    v-model="search.user_id"
                />
            </div>

            <div class="sm:col-span-2">
                <BaseSelect
                    labelClass="form-label"
                    class="mt-1 form-select"
                    :options="days"
                    v-model="search.filter_by_days"
                    label="Select Days"
                />
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
                include_user: null,
                paid: null,
                payment: null,
                phone: null,
                first_name: null,
                user_id: null,
                description: null,
                filter_by_days: null,
                confirmed: null,
                date: null,
            },
            startTime: [
                { hours: 0, minutes: 0 },
                { hours: 23, minutes: 59 },
            ],
            perPage: [10, 50, 100, 200],
            days: ['today', 'week', 7, 10, 14],
        };
    },

    computed: {},

    methods: {
        reset() {
            this.search = {
                per_page: 10,
                include_user: null,
                paid: null,
                payment: null,
                phone: null,
                first_name: null,
                user_id: null,
                description: null,
                filter_by_days: null,
                confirmed: null,
                date: null,
            };

            this.$emit('reset-query');
        },

        setMakeByUser(value) {
            this.search.include_user = value;
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

            if ('paid' in search) {
                search.paid = Number(search.paid);
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