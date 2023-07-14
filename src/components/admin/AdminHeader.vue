<script setup>
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
import { ref } from 'vue';
import Check from '@/svg/Check.vue';
import Building from '@/svg/Building.vue';

const firstName = ref(userStore.firstName);
</script>

<template>
    <div class="bg-white shadow">
        <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div
                class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
            >
                <div class="min-w-0 flex-1">
                    <!-- Profile -->
                    <div class="flex items-center">
                        <img
                            class="hidden h-16 w-16 rounded-full sm:block"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                            alt=""
                        />
                        <div>
                            <div class="flex items-center">
                                <img
                                    class="h-16 w-16 rounded-full sm:hidden"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                                    alt=""
                                />
                                <h1
                                    class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9"
                                >
                                    Good morning, {{ firstName }}
                                </h1>
                            </div>
                            <dl
                                class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap"
                            >
                                <dt class="sr-only">Company</dt>
                                <dd
                                    class="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6"
                                >
                                    <Building
                                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                    />
                                    SBIN Laundry, Saint Paul Branch
                                </dd>
                                <dt class="sr-only">Account status</dt>
                                <dd
                                    class="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0"
                                >
                                    <Check
                                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                    />
                                    Verified
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="mt-6 flex space-x-3 md:ml-4 md:mt-0">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
