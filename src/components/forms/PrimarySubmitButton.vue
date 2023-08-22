<script setup>
defineProps(['isLoading', 'name']);
</script>

<template>
    <button
        :class="isLoading ? 'bg-loading-gray' : 'bg-primary'"
        class="rounded-md text-white w-full py-4 bg-primary"
        type="submit"
    >
        {{ name }}
    </button>
</template>

<style scoped></style>
