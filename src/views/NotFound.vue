<script setup>
import AppLink from '@/components/AppLink.vue';
</script>
<template>
    <main class="md:hidden flex justify-center items-center min-h-screen">
        <img src="/not-found.png" alt="404" />
    </main>

    <main
        class="hidden md:flex justify-center items-center min-h-screen background"
    >
        <div class="flex flex-col items-center">
            <img src="/not-found.png" alt="404" />
            <AppLink :to="{ name: 'home' }" class="text-primary font-semibold"
                >Home
            </AppLink>
        </div>
    </main>
</template>

<style>
.background {
    position: relative;
}

.background::before {
    content: '';
    background-image: url('/src/assets/about-bg.jpg');
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.5;
}

.background > * {
    position: relative;
}
</style>