<script setup>
import Home from '@/svg/Home.vue';
import ChevronRight from '@/svg/ChevronRight.vue';
import { useRoute } from 'vue-router';
import AppLink from '@/components/AppLink.vue';
import _ from 'lodash';

const route = useRoute();

function toTitle(str) {
    return _.startCase(str);
}
</script>
<template>
    <div class="my-6 items-center space-x-2 px-8 hidden md:flex">
        <div>
            <Home class="h-5 w-5 text-slate-600" />
        </div>
        <div>
            <AppLink :to="{ name: 'home' }">
                <p class="font-normal text-xs">Home</p>
            </AppLink>
        </div>
        <div>
            <ChevronRight class="h-5 w-5 text-slate-600" />
        </div>
        <div>
            <p class="font-bold text-xs capitalize text-sky-600">
                {{ toTitle(route.name) }}
            </p>
        </div>
    </div>
</template>
