<template>
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
    <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
        <AdminMobileNavigation
            :links="links"
            :second-links="secondLinks"
        ></AdminMobileNavigation>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div
            class="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pb-4 pt-5"
        >
            <div class="flex flex-shrink-0 items-center px-4">
                <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
                    alt="Easywire logo"
                />
            </div>
            <nav
                class="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto"
                aria-label="Sidebar"
            >
                <div class="space-y-1 px-2">
                    <!-- Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:bg-cyan-600 hover:text-white" -->
                    <AppLink
                        v-for="(link, index) in links"
                        :to="{ name: link.route }"
                        :key="index"
                        v-bind="$attrs"
                        class="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6"
                        active-class="bg-cyan-800 text-white"
                        inactive-class="text-cyan-100 hover:bg-cyan-600 hover:text-white"
                    >
                        <component
                            :is="link.svg"
                            class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"
                        ></component>
                        {{ link.name }}
                    </AppLink>
                </div>
                <div class="mt-6 pt-6">
                    <div class="space-y-1 px-2">
                        <AppLink
                            v-for="(link, index) in secondLinks"
                            :to="{ name: link.route }"
                            :key="index"
                            v-bind="$attrs"
                            class="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6"
                            active-class="bg-cyan-800 text-white"
                            inactive-class="text-cyan-100 hover:bg-cyan-600 hover:text-white"
                        >
                            <component
                                :is="link.svg"
                                class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"
                            ></component>
                            {{ link.name }}
                        </AppLink>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup>
import HomeSvg from '@/svg/Home.vue';
import HistorySvg from '@/svg/Clock.vue';
import RecipientSvg from '@/svg/People.vue';
import CardSvg from '@/svg/Card.vue';
import ReportSvg from '@/svg/Report.vue';
import BalanceSvg from '@/svg/Balance.vue';
import AppLink from '@/components/AppLink.vue';
import AdminMobileNavigation from '@/components/admin/AdminMobileNavigation.vue';
import {useUserStore} from "@/store/user.js";
import {ref, shallowRef} from "vue";


const user = useUserStore();
const links = shallowRef([
    {
        name: 'Home',
        route: 'admin-home',
        svg: HomeSvg,
    },
    {
        name: 'Order',
        route: 'admin-order',
        svg: HistorySvg,
    },
    {
        name: 'Product',
        route: 'admin-product',
        svg: HistorySvg,
    },
    {
        name: 'Service',
        route: 'admin-service',
        svg: HistorySvg,
    },
]);

const secondLinks = shallowRef([
    {
        name: 'Promotion',
        route: 'admin-promotion',
        svg: HomeSvg,
    },
]);

if (user.isAdmin) {
    links.value.push({
        name: 'User',
        route: 'admin-user',
        svg: BalanceSvg,
    })
    links.value.push({
        name: 'Stats',
        route: 'admin-stat',
        svg: ReportSvg,
    })

    secondLinks.value.push({
        name: 'Expense',
        route: 'admin-expense',
        svg: HistorySvg,
    })
}
</script>

<style scoped></style>
