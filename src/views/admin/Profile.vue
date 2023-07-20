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

const userStore = useUserStore();
const notificationStore = useNotificationStore();
const last_name = ref(userStore.lastName);
const first_name = ref(userStore.firstName);
const middle_name = ref(userStore.middleName);
const loading = ref(false);
const errors = ref({});

function submit() {
    loading.value = true;
    // notificationStore.show = true;
    // return;
    axios
        .patch(`api/admin/user/${userStore.phone}`, {
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
            console.log('update profile success');
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
                            <!-- Current: "bg-gray-50 text-indigo-700 hover:bg-white hover:text-indigo-700", Default: "text-gray-900 hover:bg-gray-50 hover:text-gray-900" -->
                            <a
                                href="#"
                                class="bg-gray-50 text-indigo-700 hover:bg-white hover:text-indigo-700 group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                                aria-current="page"
                            >
                                <!-- Current: "text-indigo-500 group-hover:text-indigo-500", Default: "text-gray-400 group-hover:text-gray-500" -->
                                <UserCircle
                                    class="text-indigo-500 group-hover:text-indigo-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                                />
                                <span class="truncate">Profile</span>
                            </a>
                            <a
                                href="#"
                                class="text-gray-900 hover:bg-gray-50 hover:text-gray-900 group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                            >
                                <svg
                                    class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
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
                            </a>
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