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
                    placeHolder="Search customer last name"
                    class="mt-1 form-input"
                    label="Last Name"
                    type="text"
                    v-model="search.last_name"
                />
            </div>

            <div
                class="sm:col-span-1 flex justify-center items-center flex-col"
            >
                <p class="form-label">Last Order Current Month</p>
                <div class="mt-2">
                    <toggle-button
                        v-model="search.last_order_this_month"
                    ></toggle-button>
                </div>
            </div>

            <div class="sm:col-span-1">
                <BaseInput
                    labelClass="form-label"
                    placeHolder="Order Amount"
                    class="mt-1 form-input"
                    label="Amount Larger Than"
                    type="text"
                    v-model="search.order_amount_larger_than"
                />
            </div>

            <div class="sm:col-span-1">
                <BaseSelect
                    labelClass="form-label"
                    class="mt-1 form-select"
                    :options="perPage"
                    v-model="search.per_page"
                    label="Display Per Page"
                />
            </div>
        </div>

        <!-- {{ search }} -->

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

export default {
    components: {
        ToggleButton,
        BaseInput,
        BaseSelect,
    },

    emits: ['search-query', 'reset-query'],
    data() {
        return {
            search: {
                per_page: 10,
                last_order_this_month: null,
                phone: null,
                first_name: null,
                last_name: null,
                order_amount_larger_than: null,
            },
            perPage: [10, 50, 100, 200],
        };
    },

    computed: {},

    methods: {
        reset() {
            this.search = {
                per_page: 10,
                last_order_this_month: null,
                phone: null,
                first_name: null,
                last_name: null,
                order_amount_larger_than: null,
            };

            this.$emit('reset-query');
        },

        submit() {
            if (this.search.last_order_this_month === false) {
                this.search.last_order_this_month = null;
            }

            let search = Object.fromEntries(
                Object.entries(this.search).filter(([_, v]) => v != null),
            );

            if (search.per_page == 10) {
                delete search.per_page;
            }

            if (Object.keys(search).length === 0) {
                return;
            }

            this.$emit('search-query', search);
        },
    },
};
</script>
