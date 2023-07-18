<template>
    <button
        :type="type"
        :disabled="loading"
        :class="{ 'cursor-not-allowed ': loading }"
        class="inline-flex justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
    >
        <LoadingIndicator
            v-if="loading"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
