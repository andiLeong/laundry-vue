<template>
    <button
        @click.prevent="openMobileNavigation"
        type="button"
        class="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
    >
        <span class="sr-only">Open sidebar</span>
        <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            />
        </svg>
    </button>
    <!-- Search bar -->
    <div
        class="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8"
    >
        <div class="flex flex-1">
            <form class="flex w-full md:ml-0" action="#" method="GET">
                <label for="search-field" class="sr-only">Search</label>
                <div
                    class="relative w-full text-gray-400 focus-within:text-gray-600"
                >
                    <div
                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center"
                        aria-hidden="true"
                    >
                        <MagnifyingGlass class="h-5 w-5"/>
                    </div>
                    <input
                        id="search-field"
                        name="search-field"
                        class="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        placeholder="Search transactions"
                        type="search"
                    />
                </div>
            </form>
        </div>
        <div class="ml-4 flex items-center md:ml-6">
            <button
                type="button"
                class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
                <span class="sr-only">View notifications</span>
                <Bell class="h-6 w-6"/>
            </button>

            <!-- Profile dropdown -->
            <div class="relative ml-3">
                <AppDropDown direction="right">
                    <template #trigger>
                        <div>
                            <button
                                type="button"
                                class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50"
                                id="user-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                            >
                                <img
                                    class="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <span
                                    class="ml-3 hidden text-sm font-medium text-gray-700 lg:block"
                                ><span class="sr-only">Open user menu for </span>{{ firstName }}</span>
                                <ArrowDown class="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"/>
                            </button>
                        </div>
                    </template>
                    <!--
        Dropdown menu, show/hide based on menu state.

        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
      -->
                    <div
                        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabindex="-1"
                    >
                        <!-- Active: "bg-gray-100", Not Active: "" -->
                        <a
                            href="#"
                            class="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabindex="-1"
                            id="user-menu-item-0"
                        >Your Profile</a
                        >
                        <a
                            href="#"
                            class="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabindex="-1"
                            id="user-menu-item-1"
                        >Settings</a
                        >
                        <a
                            @click.prevent="logout"
                            href="#"
                            class="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabindex="-1"
                            id="user-menu-item-2"
                        >
                            Logout
                        </a>
                    </div>
                </AppDropDown>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useNavigationStore} from '@/store/navigation';
import {useUserStore} from '@/store/user.js';
import AppDropDown from '@/components/AppDropDown.vue';
import {ref} from "vue";
import ArrowDown from "@/svg/ArrowDown.vue";
import Bell from "@/svg/Bell.vue";
import MagnifyingGlass from "@/svg/MagnifyingGlass.vue";

const navigationStore = useNavigationStore();
const userStore = useUserStore();

const firstName = ref(userStore.firstName);

function openMobileNavigation() {
    navigationStore.apply(true);
}

function logout() {
    userStore.logout();
}
</script>

<style scoped></style>
