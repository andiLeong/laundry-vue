<script setup>
import AppLink from '@/components/AppLink.vue';
import Cog6Tooth from '@/svg/Cog6Tooth.vue';
import Document from '@/svg/Document.vue';
import ProfileUser from '@/svg/ProfileUser.vue';
import { shallowRef } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const links = shallowRef([
    {
        name: 'Home',
        route: 'home',
        svg: ProfileUser,
        active: false,
    },
    {
        name: 'Order',
        route: 'order',
        svg: Document,
        active: false,
    },
    {
        name: 'Setting',
        route: 'home',
        svg: Cog6Tooth,
        active: false,
    },
]);

function setActiveLink() {
    let routeName = route.name;
    links.value = links.value.map((link) => {
        if (routeName === link.route) {
            link.active = true;
        }

        if (link.route === 'order' && routeName === 'order-detail') {
            link.active = true;
        }
        return link;
    });
}

setActiveLink();
</script>

<template>
    <nav class="col-span-1 p-4 border-r-2 border-gray-100">
        <ul class="space-y-2">
            <li
                v-for="link in links"
                :key="link.name"
                :class="link.active ? 'rounded-md' : ''"
                :style="[
                    link.active
                        ? {
                              background:
                                  'linear-gradient( 165deg, #ca92f9 0%, #8ce4ee 100% )',
                          }
                        : {},
                ]"
                class="flex items-center py-3 px-4"
            >
                <div class="mr-2">
                    <component
                        :is="link.svg"
                        :class="link.active ? 'text-white' : 'text-gray-400'"
                        class="h-5 w-5"
                    ></component>
                </div>

                <div>
                    <AppLink
                        :class="link.active ? 'text-white' : 'text-gray-400'"
                        :to="{ name: link.route }"
                        class="text-sm font-normal"
                    >
                        {{ link.name }}
                    </AppLink>
                </div>
            </li>
        </ul>
    </nav>
</template>

<style scoped></style>