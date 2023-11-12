<script setup>
import RightArrow from '@/svg/RightArrow.vue';
import AppLink from '@/components/AppLink.vue';
import { ref, shallowRef } from 'vue';
import { useUserStore } from '@/store/user.js';
import Bars3BottomRight from '@/svg/Bars3BottomRight.vue';
import X from '@/svg/X.vue';
import AppDropDown from '@/components/AppDropDown.vue';
import UserCircle from '@/svg/UserCircle.vue';
import ArrowLeftOnRectangle from '@/svg/ArrowLeftOnRectangle.vue';
import Home from '@/svg/Home.vue';

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
const userStore = useUserStore();

const loggedIn = ref(userStore.isLoggedIn);
</script>
<template>
    <nav class="w-full hidden md:block bg-white">
        <section
            class="mx-auto max-w-screen-2xl flex justify-between items-center px-10 py-3"
        >
            <div>
                <AppLink :to="{ name: 'home' }">
                    <img src="/purple-logo.png" alt="logo" class="w-14 h-14" />
                </AppLink>
            </div>

            <div>
                <ul class="flex space-x-3">
                    <li v-for="(link, index) in links" :key="index">
                        <AppLink
                            :to="{ name: link.route }"
                            active-class="text-violet-500 font-semibold"
                            class="font-medium text-sm"
                            inactive-class="text-slate-700"
                            v-bind="$attrs"
                        >
                            {{ link.name }}
                        </AppLink>
                    </li>
                </ul>
            </div>

            <template v-if="loggedIn">
                <AppDropDown width-class="w-32">
                    <template #trigger>
                        <div class="flex items-center">
                            <div class="text-slate-500 mr-2">
                                {{ userStore.firstName }}
                            </div>
                            <div>
                                <img
                                    alt="logo-avatar"
                                    class="h-9 w-9 rounded-full"
                                    src="/purple-logo.png"
                                />
                            </div>
                        </div>
                    </template>

                    <div class="p-2 space-y-2">
                        <!-- Active: "bg-gray-100", Not Active: "" -->
                        <div class="flex items-center p-1">
                            <UserCircle class="h-5 w-5 text-slate-400 mr-2" />
                            <router-link
                                :to="{ name: 'admin-profile' }"
                                class="block text-sm text-slate-500"
                                >Profile
                            </router-link>
                        </div>

                        <template v-if="userStore.canAccessDashboard">
                            <div class="flex items-center p-1">
                                <Home class="h-5 w-5 text-slate-400 mr-2" />
                                <router-link
                                    :to="{ name: 'admin-home' }"
                                    class="block text-sm text-slate-500"
                                    >Dashboard
                                </router-link>
                            </div>
                        </template>

                        <div class="flex items-center p-1">
                            <ArrowLeftOnRectangle
                                class="h-5 w-5 text-slate-400 mr-2"
                            />
                            <a
                                @click.prevent="userStore.logout()"
                                href="#"
                                class="block text-sm text-slate-500"
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </AppDropDown>
            </template>
            <template v-else>
                <div>
                    <AppLink
                        :to="{ name: 'login' }"
                        class="flex items-center font-bold text-sm text-white rounded px-5 py-2"
                        style="background: #5130d3"
                    >
                        Sign In
                        <RightArrow class="w-5 h-5 text-white" />
                    </AppLink>
                </div>
            </template>
        </section>
    </nav>

    <nav class="block md:hidden bg-white">
        <section
            class="mx-auto max-w-screen-2xl flex justify-between items-center px-4 py-4"
        >
            <div>
                <button
                    class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    @click.prevent="open = !open"
                >
                    <X v-if="open" class="w-6 h-6" />
                    <Bars3BottomRight v-else class="w-6 h-6" />
                </button>
            </div>

            <div>
                <template v-if="loggedIn">
                    <AppDropDown width-class="w-32">
                        <template #trigger>
                            <div class="flex items-center">
                                <div class="text-slate-500 mr-2">
                                    {{ userStore.firstName }}
                                </div>
                                <div>
                                    <img
                                        alt="logo-avatar"
                                        class="h-9 w-9 rounded-full"
                                        src="/purple-logo.png"
                                    />
                                </div>
                            </div>
                        </template>
                        <div class="p-2 space-y-2">
                            <!-- Active: "bg-gray-100", Not Active: "" -->
                            <div class="flex items-center p-1">
                                <UserCircle
                                    class="h-5 w-5 text-slate-400 mr-2"
                                />
                                <router-link
                                    :to="{ name: 'admin-profile' }"
                                    class="block text-sm text-slate-500"
                                    >Profile
                                </router-link>
                            </div>

                            <template v-if="userStore.canAccessDashboard">
                                <div class="flex items-center p-1">
                                    <Home class="h-5 w-5 text-slate-400 mr-2" />
                                    <router-link
                                        :to="{ name: 'admin-home' }"
                                        class="block text-sm text-slate-500"
                                        >Dashboard
                                    </router-link>
                                </div>
                            </template>

                            <div class="flex items-center p-1">
                                <ArrowLeftOnRectangle
                                    class="h-5 w-5 text-slate-400 mr-2"
                                />
                                <a
                                    @click.prevent="userStore.logout()"
                                    href="#"
                                    class="block text-sm text-slate-500"
                                >
                                    Logout
                                </a>
                            </div>
                        </div>
                    </AppDropDown>
                </template>
                <template v-else>
                    <AppLink :to="{ name: 'home' }">
                        <img
                            src="/purple-logo.png"
                            alt="logo"
                            class="h-10 w-10"
                        />
                    </AppLink>
                </template>
            </div>
        </section>
    </nav>

    <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
        <section v-if="open" class="block md:hidden">
            <div id="mobile-menu" class="lg:hidden">
                <div class="space-y-1 px-3 py-5">
                    <AppLink
                        v-for="(link, index) in links"
                        :key="index"
                        :to="{ name: link.route }"
                        active-class="text-violet-500"
                        class="font-medium block py-2"
                        inactive-class="sbin-text-gray-700"
                        style="font-size: 14px; line-height: 12px"
                        v-bind="$attrs"
                    >
                        {{ link.name }}
                    </AppLink>
                    <template v-if="!loggedIn">
                        <div>
                            <AppLink
                                :to="{ name: 'login' }"
                                class="flex items-center font-bold text-sm text-white rounded px-3 py-2 mt-2"
                                style="background: #5130d3"
                            >
                                Sign In
                            </AppLink>
                        </div>
                    </template>
                </div>
            </div>
        </section>
    </transition>
</template>

<style scoped>
.router-link-exact-active {
    color: #8b5cf6;
}
</style>