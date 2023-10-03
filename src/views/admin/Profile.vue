<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import UserCircle from '@/svg/UserCircle.vue';
import BaseInput from '@/components/forms/BaseInput.vue';
import { ref } from 'vue';
import PrimaryButton from '@/components/forms/PrimaryButton.vue';
import { useUserStore } from '@/store/user.js';
import Errors from '@/model/Errors.js';
import ErrorManager from '@/components/validation/ErrorManager.vue';
import { useNotificationStore } from '@/store/Notification.js';
import AppLink from '@/components/AppLink.vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const notificationStore = useNotificationStore();
const last_name = ref(userStore.lastName);
const first_name = ref(userStore.firstName);
const middle_name = ref(userStore.middleName);
const loading = ref(false);
const errors = ref({});
const routeName = useRoute().name;

function submit() {
    loading.value = true;
    axios
        .patch(`api/user/profile`, {
            last_name: last_name.value,
            first_name: first_name.value,
            middle_name: middle_name.value,
        })
        .then(() => {
            let tem = userStore.user;
            tem.first_name = first_name.value;
            tem.last_name = last_name.value;
            tem.middle_name = middle_name.value;
            userStore.user = tem;
            notificationStore.title = 'Saved!';
            notificationStore.message = 'Your information has saved';
            notificationStore.show = true;
        })
        .catch((error) => {
            let err = new Errors(error);
            errors.value = err.handle();
            console.log(errors.value);
        })
        .finally(() => {
            loading.value = false;
        });
}
</script>

<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl lg:mx-auto mt-10 mx-4">
                <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <aside
                        class="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0"
                    >
                        <nav class="space-y-1">
                            <AppLink
                                :to="{ name: 'admin-profile' }"
                                :class="
                                    routeName === 'admin-profile'
                                        ? 'bg-gray-50 text-sky-700 hover:bg-white hover:text-sky-700'
                                        : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                                "
                                class="group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                            >
                                <UserCircle
                                    :class="
                                        routeName === 'admin-profile'
                                            ? 'text-sky-500 group-hover:text-sky-500'
                                            : 'text-gray-400 group-hover:text-gray-500'
                                    "
                                    class="-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                                />
                                <span class="truncate">Profile</span>
                            </AppLink>

                            <AppLink
                                :to="{ name: 'admin-password' }"
                                :class="
                                    routeName === 'admin-password'
                                        ? 'bg-gray-50 text-sky-700 hover:bg-white hover:text-sky-700'
                                        : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                                "
                                class="group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                            >
                                <svg
                                    :class="
                                        routeName === 'admin-password'
                                            ? 'text-sky-500 group-hover:text-sky-500'
                                            : 'text-gray-400 group-hover:text-gray-500'
                                    "
                                    class="-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                    />
                                </svg>
                                <span class="truncate">Password</span>
                            </AppLink>
                        </nav>
                    </aside>

                    <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                        <form action="#" method="POST" @submit.prevent="submit">
                            <div
                                class="shadow sm:overflow-hidden sm:rounded-md"
                            >
                                <div
                                    class="space-y-6 bg-white px-4 py-6 sm:p-6"
                                >
                                    <div>
                                        <h3
                                            class="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Account Information
                                        </h3>
                                    </div>

                                    <div class="grid grid-cols-6 gap-6">
                                        <div class="col-span-6 sm:col-span-3">
                                            <BaseInput
                                                labelClass="form-label"
                                                placeHolder="First Name"
                                                class="mt-1 form-input"
                                                label="First Name"
                                                type="text"
                                                v-model="first_name"
                                            />
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <BaseInput
                                                labelClass="form-label"
                                                placeHolder="Last Name"
                                                class="mt-1 form-input"
                                                label="Last Name"
                                                type="text"
                                                v-model="last_name"
                                            />
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <BaseInput
                                                labelClass="form-label"
                                                placeHolder="Middle Name"
                                                class="mt-1 form-input"
                                                label="Middle Name"
                                                type="text"
                                                v-model="middle_name"
                                            />
                                        </div>
                                    </div>
                                    <div class="mb-2">
                                        <ErrorManager
                                            v-if="errors"
                                            :errors="errors"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="bg-gray-100 px-4 py-3 text-right sm:px-6"
                                >
                                    <PrimaryButton :loading="loading" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    </AdminLayout>
</template>

<style scoped></style>
