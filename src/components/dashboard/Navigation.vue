<script setup>
import AppLink from '@/components/AppLink.vue';
import { useRoute } from 'vue-router';
import Power from '@/svg/Power.vue';
import { useUserStore } from '@/store/user.js';
import useDashboardNavigationLink from '@/composable/useDashboardNavigationLink.js';
import MobileNavigation from '@/components/dashboard/MobileNavigation.vue';

const props = defineProps({
    needBorder: {
        required: false,
        default: true,
    },
});
const userStore = useUserStore();
const route = useRoute();
const { links } = useDashboardNavigationLink();

function logout() {
    userStore.logout();
}
</script>

<template>
    <nav
        :class="needBorder ? 'border-r-2' : ''"
        class="md:col-span-1 lg:col-span-1 p-4 border-gray-100 hidden md:block"
    >
        <ul class="space-y-2">
            <!--            <li-->
            <!--                v-for="link in links"-->
            <!--                :key="link.name"-->
            <!--                :class="link.active ? 'rounded-md' : ''"-->
            <!--                :style="[-->
            <!--                    link.active-->
            <!--                        ? {-->
            <!--                              background:-->
            <!--                                  'linear-gradient( 165deg, #ca92f9 0%, #8ce4ee 100% )',-->
            <!--                          }-->
            <!--                        : {},-->
            <!--                ]"-->
            <!--                class="flex items-center py-3 px-4"-->
            <!--            >-->
            <!--                <div class="mr-2">-->
            <!--                    <component-->
            <!--                        :is="link.svg"-->
            <!--                        :class="link.active ? 'text-white' : 'text-slate-200'"-->
            <!--                        class="h-5 w-5"-->
            <!--                    ></component>-->
            <!--                </div>-->

            <!--                <div>-->
            <!--                    <AppLink-->
            <!--                        :class="link.active ? 'text-white' : 'text-slate-200'"-->
            <!--                        :to="{ name: link.route }"-->
            <!--                        class="text-sm font-semibold"-->
            <!--                    >-->
            <!--                        {{ link.name }}-->
            <!--                    </AppLink>-->
            <!--                </div>-->
            <!--            </li>-->

            <li v-for="link in links" :key="link.name">
                <AppLink
                    :to="{ name: link.route }"
                    class="group flex items-center border-l-4 px-3 py-2 text-sm"
                    :class="
                        link.active
                            ? 'border-sky-600 bg-sky-100 text-sky-600 font-bold'
                            : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                    "
                >
                    <component
                        :is="link.svg"
                        :class="link.active ? 'text-sky-500' : 'text-slate-400'"
                        class="h-6 w-6 shrink-0 mr-3"
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

    <MobileNavigation />
</template>

<style scoped></style>