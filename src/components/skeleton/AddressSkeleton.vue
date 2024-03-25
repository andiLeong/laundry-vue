<script setup>
import { ref } from 'vue';

const items = ref(8);
</script>

<template>
    <div class="mt-6 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-10 py-1">
                <div v-for="index in items" :key="index" class="space-y-2">
                    <div class="grid grid-cols-3 gap-4 items-end">
                        <div class="h-3 bg-slate-200 rounded col-span-1"></div>
                        <div
                            class="rounded-md col-start-3 col-end-4 bg-slate-200 h-5 w-11 justify-self-end"
                        ></div>
                    </div>
                    <div class="h-3 bg-slate-200 rounded w-48"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
