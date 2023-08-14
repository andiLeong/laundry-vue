<template>
    <nav style="background: #EEF1FA" class="w-full">
        <section
            class="mx-auto max-w-screen-2xl flex justify-between items-center px-10 py-2"
        >
            <div>

                <AppLink :to="{name: 'home'}"
                >
                    <img :src="logo" alt="logo">
                </AppLink>
            </div>

            <div>
                <ul class="flex space-x-3">
                    <li
                        v-for="(link, index) in links"
                        :key="index"
                    >
                        <AppLink
                            style=" font-size: 14px;line-height: 12px;"
                            :to="{ name: link.route }"
                            v-bind="$attrs"
                            class="font-medium"
                            active-class="text-violet-500"
                            inactive-class="sbin-text-gray-100"
                        >
                            {{ link.name }}
                        </AppLink>
                    </li>
                </ul>
            </div>

            <div>
                <button
                    style="background: #5130D3"
                    class="flex items-center font-bold text-sm text-white rounded px-3 py-2"
                >
                    Sign In
                    <RightArrow class="ml-1 w-5 h-5 text-white"/>
                </button>
            </div>
        </section>
    </nav>
</template>

<script setup>
import RightArrow from '@/svg/RightArrow.vue';
import AppLink from '@/components/AppLink.vue';
import {shallowRef} from "vue";
import logo from '@/assets/logo60x61.png'

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
</script>

<style scoped>

.router-link-exact-active {
    color: #8B5CF6;
}
</style>