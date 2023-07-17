<template>
    <button
        :type="type"
        :disabled="loading"
        :class="{
            'cursor-not-allowed text-sky-400': loading,
            'text-sky-600': !loading,
        }"
        class="inline-flex items-center justify-center rounded bg-sky-100 px-2 py-1 text-xs font-semibold shadow-sm hover:bg-sky-100"
    >
        <LoadingIndicator
            v-if="loading"
            class="animate-spin -ml-1 mr-2 h-5 w-5 text-sky-400"
        />
        {{ loading ? saving : notSaving }}
    </button>
</template>

<script setup>
import LoadingIndicator from '@/svg/LoadingIndicator.vue';

const props = defineProps({
    loading: Boolean,
    saving: {
        default: 'Saving',
    },
    notSaving: {
        default: 'Save',
    },
    type: {
        default: 'submit',
    },
});
</script>
