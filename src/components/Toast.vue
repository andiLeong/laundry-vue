<script setup>
import { computed, ref, watch } from 'vue';
import { useNotificationStore } from '@/store/Notification.js';

const notificationStore = useNotificationStore();
const show = ref(false);

watch(
    () => notificationStore.show,
    newValue => {
        if (newValue) {
            open();
        }
    },
    { deep: true },
);

function open() {
    show.value = true;
    setTimeout(close, 2000);
}

function close() {
    show.value = false;
    notificationStore.show = false;
}

const getType = computed(() => {
    if (notificationStore.type === 'success') {
        return 'bg-gradient-to-r from-teal-500 to-teal-300';
    }

    if (notificationStore.type === 'danger') {
        return 'bg-gradient-to-r from-rose-400 to-rose-300';
    }

    if (notificationStore.type === 'warning') {
        return 'bg-gradient-to-r from-amber-500 to-amber-300';
    }
    return 'bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-400';
});
</script>

<template>
    <div v-auto-animate>
        <div v-if="show" class="fixed w-full top-0 left-0 flex justify-center">
            <div
                class="text-white px-8 py-2 rounded-lg text-sm mt-6"
                :class="getType"
            >
                {{ notificationStore.message }}
            </div>
        </div>
    </div>
</template>
