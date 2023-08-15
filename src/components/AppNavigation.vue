<template>
    <nav style="background: #eef1fa" class="w-full hidden md:block">
        <section
            class="mx-auto max-w-screen-2xl flex justify-between items-center px-10 py-2"
        >
            <div>
                <AppLink :to="{ name: 'home' }">
                    <img :src="logo" alt="logo" />
                </AppLink>
            </div>

            <div>
                <ul class="flex space-x-3">
                    <li v-for="(link, index) in links" :key="index">
                        <AppLink
                            style="font-size: 14px; line-height: 12px"
                            :to="{ name: link.route }"
                            v-bind="$attrs"
                            class="font-medium"
                            active-class="text-violet-500"
                            inactive-class="sbin-text-gray-700"
                        >
                            {{ link.name }}
                        </AppLink>
                    </li>
                </ul>
            </div>

            <div>
                <button
                    style="background: #5130d3"
                    class="flex items-center font-bold text-sm text-white rounded px-3 py-2"
                >
                    Sign In
                    <RightArrow class="ml-1 w-5 h-5 text-white" />
                </button>
            </div>
        </section>
    </nav>

    <nav style="background: #eef1fa" class="block md:hidden">
        <section
            class="mx-auto max-w-screen-2xl flex justify-between items-center px-4 py-4"
        >
            <div>
                <AppLink :to="{ name: 'home' }">
                    <img class="h-12 w-12" :src="logo" alt="logo" />
                </AppLink>
            </div>

            <div>
                <button
                    @click.prevent="open = !open"
                    class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                    <X v-if="open" class="w-6 h-6" />
                    <Bars3BottomRight v-else class="w-6 h-6" />
                </button>
            </div>
        </section>
    </nav>

    <section v-if="open" class="block md:hidden">
        <div class="lg:hidden" id="mobile-menu">
            <div class="space-y-1 pb-3 pt-2">
                <AppLink
                    v-for="(link, index) in links"
                    :key="index"
                    style="font-size: 14px; line-height: 12px"
                    :to="{ name: link.route }"
                    v-bind="$attrs"
                    class="font-medium block py-2 pl-3 pr-4"
                    active-class="text-violet-500"
                    inactive-class="sbin-text-gray-700"
                >
                    {{ link.name }}
                </AppLink>
            </div>
            <div class="border-t border-gray-200 pb-3 pt-4">
                <div class="flex items-center px-4">
                    <div class="flex-shrink-0">
                        <img
                            class="h-9 w-9 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                    </div>
                    <div class="ml-3">
                        <div class="text-sm font-medium sbin-text-gray-900">
                            Tom Cook
                        </div>
                        <div class="text-xs font-medium sbin-text-gray-700">
                            09272714233
                        </div>
                    </div>
                </div>
                <div class="mt-3 space-y-1">
                    <a
                        href="#"
                        class="block px-4 py-2 text-sm font-normal sbin-text-gray-900"
                        >Sign out</a
                    >
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import RightArrow from '@/svg/RightArrow.vue';
import AppLink from '@/components/AppLink.vue';
import { ref, shallowRef } from 'vue';
import logo from '@/assets/logo60x61.png';
import Bars3BottomRight from '@/svg/Bars3BottomRight.vue';
import X from '@/svg/X.vue';

const links = shallowRef([
    {
        name: 'Home',
        route: 'home',
    },
    {
        name: 'Promotion',
        route: 'promotion',
    },
    {
        name: 'Service',
        route: 'service',
    },
]);
const open = ref(false);
</script>

<style scoped>
.router-link-exact-active {
    color: #8b5cf6;
}
</style>
