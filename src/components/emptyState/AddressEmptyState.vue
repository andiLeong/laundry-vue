<script setup>
import Home from '@/svg/Home.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
function toCreate() {
    router.push({
        name: 'address-create',
    });
}
</script>

<template>
    <div class="mx-auto max-w-3xl">
        <button
            @click.prevent="toCreate"
            type="button"
            class="relative block w-full rounded-lg border-2 border-dashed border-sky-300 p-12 text-center hover:border-sky-400 focus:outline-none"
        >
            <Home class="mx-auto h-10 w-10 text-sky-400" />
            <span class="mt-4 block text-sm font-semibold text-sky-800"
                >add address to laundry
            </span>
        </button>
    </div>
</template>

<style scoped></style>
