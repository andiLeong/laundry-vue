<script setup>
import Bars3BottomRight from '@/svg/Bars3BottomRight.vue';
import X from '@/svg/X.vue';
import { ref } from 'vue';
import AppLink from '@/components/AppLink.vue';
import useDashboardNavigationLink from '@/composable/useDashboardNavigationLink.js';
import Power from '@/svg/Power.vue';
import { useUserStore } from '@/store/user.js';

const open = ref(false);
const { links } = useDashboardNavigationLink();
const userStore = useUserStore();

function logout() {
    userStore.logout();
}
</script>

<template>
    <div class="block md:hidden">
        <div class="flex justify-end mt-2">
            <button
                class="relative inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
                @click.prevent="open = !open"
            >
                <X v-if="open" class="w-6 h-6" />
                <Bars3BottomRight v-else class="w-6 h-6" />
            </button>
        </div>

        <nav v-if="open" class="col-span-1 p-3 border-gray-100">
            <ul class="space-y-1">
                <li v-for="link in links" :key="link.name">
                    <AppLink
                        :to="{ name: link.route }"
                        class="group flex items-center border-l-4 px-3 py-2 text-sm"
                        :class="
                            link.active
                                ? 'border-sky-600 bg-sky-100 text-sky-600 font-medium'
                                : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-normal'
                        "
                    >
                        <component
                            :is="link.svg"
                            :class="
                                link.active ? 'text-sky-500' : 'text-slate-400'
                            "
                            class="h-5 w-5 shrink-0 mr-3"
                        ></component>
                        {{ link.name }}
                    </AppLink>
                </li>

                <li>
                    <a
                        @click.prevent="logout"
                        href="#"
                        class="border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium group flex items-center border-l-4 px-3 py-2 text-sm"
                    >
                        <Power class="h-6 w-6 shrink-0 mr-3 text-slate-400" />
                        Logout
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped></style>