<script setup>
import LoadingIndicator from '@/svg/LoadingIndicator.vue';

defineProps(['isLoading', 'name']);
</script>

<template>
    <button
        :class="isLoading ? 'bg-slate-200' : 'bg-primary'"
        class="rounded-md text-white w-full py-5 bg-primary"
        type="submit"
    >
        <template v-if="isLoading">
            <div class="flex items-center justify-center">
                <LoadingIndicator
                    class="text-primary h-6 w-6 mr-3 animate-spin"
                />
                <p class="text-sm text-slate-400">{{ name }}</p>
            </div>
        </template>
        <template v-else>
            {{ name }}
        </template>
    </button>
</template>

<style scoped></style>