<script setup>
import Toast from '@/components/Toast.vue';
</script>

<template>
    <div class="flex flex-col items-stretch min-h-screen">
        <slot />
        <Toast />
    </div>
</template>

<style scoped></style>
