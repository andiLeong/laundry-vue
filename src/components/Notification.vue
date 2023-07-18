<script setup>
import { ref, watch } from 'vue';
import X from '@/svg/X.vue';
import Check from '@/svg/Check.vue';
import { useNotificationStore } from '@/store/Notification.js';

const notificationStore = useNotificationStore();
const show = ref(false);

watch(
    () => notificationStore.show,
    (newValue) => {
        if (newValue) {
            open();
        } else {
            close();
        }
    },
    { deep: true },
);

function open() {
    show.value = true;
}

function close() {
    console.log('close');
    show.value = false;
    notificationStore.show = false;
}

setTimeout(close, 2000);
</script>

<template>
    <div
        v-show="show"
        aria-live="assertive"
        class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <Transition
                name="custom-classes"
                enter-active-class="transform ease-out duration-300 transition"
                enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition ease-in duration-100"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                >
                    <div class="p-4">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <Check class="h-6 w-6 text-green-400" />
                            </div>
                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                <p class="text-sm font-medium text-gray-900">
                                    {{ notificationStore.title }}
                                </p>
                                <p class="mt-1 text-sm text-gray-500">
                                    {{ notificationStore.message }}
                                </p>
                            </div>
                            <div class="ml-4 flex flex-shrink-0">
                                <button
                                    @click.prevent="close"
                                    type="button"
                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span class="sr-only">Close</span>
                                    <X class="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped></style>
