<script setup>
import AppFooter from '@/components/AppFooter.vue';
import Breadcrumbs from '@/components/dashboard/Breadcrumbs.vue';
import MainLayout from '@/components/MainLayout.vue';
import { default as AppDashboardNavigation } from '@/components/dashboard/Navigation.vue';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { ref, watch } from 'vue';
import { useUserStore } from '@/store/user.js';
import Errors from '@/model/Errors.js';

const user = useUserStore();
const updated = ref(false);
const isLoading = ref(false);
const validationSchema = ref(
    object({
        // phone: string()
        //     .required()
        //     .min(11)
        //     .max(11)
        //     .matches(/^[0-9]+$/, 'Its not a number'),
        // password: string().required().min(8).max(90),
        first_name: string()
            .required()
            .max(50)
            .test('test-name', 'Number is not accepted', (value) =>
                /^([^0-9]*)$/.test(value),
            ),
        middle_name: string()
            .nullable(true)
            .max(50)
            .test('test-name', 'Number is not accepted', (value) =>
                /^([^0-9]*)$/.test(value),
            ),
        last_name: string()
            .required()
            .max(50)
            .test('test-name', 'Number is not accepted', (value) =>
                /^([^0-9]*)$/.test(value),
            ),
    }),
);

const { handleSubmit, errors } = useForm({
    validationSchema,
});

// const { value: phone } = useField('phone');
const { value: first_name } = useField('first_name', 'andi');
const { value: middle_name } = useField('middle_name');
const { value: last_name } = useField('last_name');
// const { value: password } = useField('password');

first_name.value = user.firstName;
middle_name.value = user.middleName;
last_name.value = user.lastName;

watch(updated, (newValue) => {
    if (newValue === true) {
        setTimeout(() => {
            updated.value = false;
            console.log('hide it');
        }, 1000);
    }
});

const submit = ref(
    handleSubmit((values) => {
        update(values);
    }),
);

function update(attributes) {
    isLoading.value = true;

    axios
        .patch('api/user/profile', attributes)
        .then(() => {
            let tem = user.user;
            tem.first_name = first_name.value;
            tem.last_name = last_name.value;
            tem.middle_name = middle_name.value;
            user.user = tem;
            updated.value = true;
        })
        .catch((error) => {
            let err = new Errors(error).handle();
            let firstKey = Object.keys(err)[0];
            errors.value[firstKey] = err[firstKey][0];
        })
        .finally(() => {
            isLoading.value = false;
        });
}
</script>

<template>
    <MainLayout>
        <main class="px-8 mx-auto max-w-screen-2xl w-full mb-16">
            <Breadcrumbs />

            <section class="md:grid grid-cols-5 gap-12">
                <AppDashboardNavigation />

                <div class="col-span-4">
                    <main class="px-4 sm:px-6 lg:flex-auto lg:px-0">
                        <div
                            class="md:grid grid-cols-3 space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none"
                        >
                            <div class="col-span-2">
                                <h2
                                    class="text-base font-semibold leading-7 text-slate-900"
                                >
                                    Profile
                                </h2>
                                <p
                                    class="mt-1 text-sm leading-6 text-slate-500"
                                >
                                    Update your personal information here, for
                                    updating your phone number please contact
                                    administrator
                                </p>

                                <form
                                    @submit.prevent="submit"
                                    class="mt-6 space-y-6 divide-y divide-slate-100 border-t border-slate-200 text-sm leading-6"
                                >
                                    <div class="pt-6 sm:flex items-center">
                                        <label
                                            for="first_name"
                                            class="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6"
                                        >
                                            First Name
                                        </label>
                                        <div
                                            class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto"
                                        >
                                            <input
                                                id="first_name"
                                                class="rounded-lg py-2 px-3 placeholder:text-slate-400 input-border"
                                                v-model="first_name"
                                            />
                                            <p
                                                v-if="errors.first_name"
                                                class="validation-error"
                                            >
                                                {{ errors.first_name }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="pt-6 sm:flex items-center">
                                        <label
                                            for="middle_name"
                                            class="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6"
                                        >
                                            Middle Name
                                        </label>
                                        <div
                                            class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto"
                                        >
                                            <input
                                                id="middle_name"
                                                class="rounded-lg py-2 px-3 placeholder:text-slate-400 input-border"
                                                placeholder="Your middle name"
                                                v-model="middle_name"
                                            />
                                            <p
                                                v-if="errors.middle_name"
                                                class="validation-error"
                                            >
                                                {{ errors.middle_name }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="pt-6 sm:flex items-center">
                                        <label
                                            for="last_name"
                                            class="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6"
                                        >
                                            Last Name
                                        </label>
                                        <div
                                            class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto"
                                        >
                                            <input
                                                id="last_name"
                                                class="rounded-lg py-2 px-3 placeholder:text-slate-400 input-border"
                                                v-model="last_name"
                                            />
                                            <p
                                                v-if="errors.last_name"
                                                class="validation-error"
                                            >
                                                {{ errors.last_name }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="pt-6">
                                        <button
                                            type="submit"
                                            :class="
                                                isLoading
                                                    ? 'bg-loading-gray'
                                                    : 'bg-sky-500'
                                            "
                                            class="text-white py-2 px-6 rounded text-center"
                                        >
                                            Update
                                        </button>

                                        <p
                                            v-if="updated"
                                            class="mt-2 text-green-500 font-medium text-sm"
                                        >
                                            Success Updated
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </main>
        <AppFooter />
    </MainLayout>
</template>

<style scoped></style>