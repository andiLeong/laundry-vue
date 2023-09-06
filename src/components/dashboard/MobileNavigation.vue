<script setup>
import Bars3BottomRight from '@/svg/Bars3BottomRight.vue';
import X from '@/svg/X.vue';
import { ref } from 'vue';
import AppLink from '@/components/AppLink.vue';
import useDashboardNavigationLink from '@/composable/useDashboardNavigationLink.js';

const open = ref(false);
const { links } = useDashboardNavigationLink();
</script>

<template>
    <nav class="block md:hidden">
        <div class="flex justify-end">
            <button
                class="relative inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
                @click.prevent="open = !open"
            >
                <X v-if="open" class="w-6 h-6" />
                <Bars3BottomRight v-else class="w-6 h-6" />
            </button>
        </div>

        <section v-if="open" class="">
            <div class="space-y-1 pb-3 pt-2">
                <AppLink
                    v-for="(link, index) in links"
                    :key="index"
                    :to="{ name: link.route }"
                    active-class="text-violet-500"
                    class="font-medium block py-2 pl-3 pr-4"
                    inactive-class="sbin-text-gray-700"
                    style="font-size: 14px; line-height: 12px"
                    v-bind="$attrs"
                >
                    {{ link.name }}
                </AppLink>
            </div>
        </section>
    </nav>
</template>

<style scoped></style>
