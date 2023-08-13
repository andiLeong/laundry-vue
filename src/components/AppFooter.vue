<script setup>
import Youtube from '@/svg/Youtube.vue';
import Facebook from '@/svg/Facebook.vue';
import Instagram from '@/svg/Instagram.vue';
</script>

<template>
    <footer class="bg-white">
        <div class="py-4">
            <div class="mt-2 flex justify-center space-x-10">
                <a href="#" class="text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Facebook</span>
                    <Facebook class="h-6 w-6"/>
                </a>
                <a href="#" class="text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Instagram</span>
                    <Instagram class="h-6 w-6"/>
                </a>
                <a href="#" class="text-gray-400 hover:text-gray-500">
                    <span class="sr-only">YouTube</span>
                    <Youtube class="h-6 w-6"/>
                </a>
            </div>
            <p class="mt-2 text-center text-xs leading-5 text-gray-500">
                &copy; 2023 SBIN Laundry, Inc. All rights reserved.
            </p>
        </div>
    </footer>
</template>

<style scoped></style>
