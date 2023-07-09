<template>
    <!--
              Off-canvas menu backdrop, show/hide based on off-canvas menu state.

              Entering: "transition-opacity ease-linear duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "transition-opacity ease-linear duration-300"
                From: "opacity-100"
                To: "opacity-0"
            -->

    <Transition
        name="custom-classes"
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div v-if="show">

            <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>

            <div class="fixed inset-0 z-40 flex">
                <!--
                  Off-canvas menu, show/hide based on off-canvas menu state.

                  Entering: "transition ease-in-out duration-300 transform"
                    From: "-translate-x-full"
                    To: "translate-x-0"
                  Leaving: "transition ease-in-out duration-300 transform"
                    From: "translate-x-0"
                    To: "-translate-x-full"
                -->
                <Transition
                    enter-active-class="transition-opacity ease-linear duration-300"
                    enter-class="-translate-x-full"
                    enter-to-class="translate-x-0"
                    leave-active-class="transition ease-in-out duration-300 transform"
                    leave-class="translate-x-0"
                    leave-to-class="-translate-x-full"
                >
                    <div class="relative flex w-full max-w-xs flex-1 flex-col bg-cyan-700 pb-4 pt-5">
                        <!--
                          Close button, show/hide based on off-canvas menu state.

                          Entering: "ease-in-out duration-300"
                            From: "opacity-0"
                            To: "opacity-100"
                          Leaving: "ease-in-out duration-300"
                            From: "opacity-100"
                            To: "opacity-0"
                        -->

                        <Transition
                            enter-active-class="ease-linear duration-300"
                            enter-class="opacity-0"
                            enter-to-class="opacity-100"
                            leave-active-class="ease-in-out duration-300"
                            leave-class="opacity-100"
                            leave-to-class="opacity-0"
                        >
                            <div class="absolute right-0 top-0 -mr-12 pt-2">
                                <button type="button"
                                        @click.prevent="openNavigation"
                                        class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span class="sr-only">Close sidebar</span>
                                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                         stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                        </Transition>

                        <div class="flex flex-shrink-0 items-center px-4">
                            <img class="h-8 w-auto"
                                 src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
                                 alt="Easywire logo">
                        </div>
                        <nav class="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto"
                             aria-label="Sidebar">
                            <div class="space-y-1 px-2">
                                <AppLink
                                    v-for="(link,index) in links"
                                    :to="{name:link.route}"
                                    :key="index"
                                    v-bind="$attrs"
                                    class="group flex items-center rounded-md px-2 py-2 text-base font-medium"
                                    active-class="bg-cyan-800 text-white"
                                    inactive-class="text-cyan-100 hover:bg-cyan-600 hover:text-white"
                                >
                                    <component :is="link.svg"
                                               class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"></component>
                                    {{ link.name }}
                                </AppLink>
                            </div>
                            <div class="mt-6 pt-6">
                                <div class="space-y-1 px-2">


                                    <AppLink
                                        v-for="(link,index) in secondLinks"
                                        :to="{name:link.route}"
                                        :key="index"
                                        v-bind="$attrs"
                                        class="group flex items-center rounded-md px-2 py-2 text-base font-medium"
                                        active-class="bg-cyan-800 text-white"
                                        inactive-class="text-cyan-100 hover:bg-cyan-600 hover:text-white"
                                    >
                                        <component :is="link.svg"
                                                   class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"></component>
                                        {{ link.name }}
                                    </AppLink>
                                </div>
                            </div>
                        </nav>
                    </div>

                </Transition>
                <div class="w-14 flex-shrink-0" aria-hidden="true">
                    <!-- Dummy element to force sidebar to shrink to fit close icon -->
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import AppLink from "@/components/AppLink.vue";
import {ref, watch} from "vue";
import {useNavigationStore} from '@/store/navigation';

defineProps(['links', 'secondLinks'])
const store = useNavigationStore()
const show = ref(store.show)


function openNavigation() {
    store.apply(false)
}

watch(
    () => store.show,
    (newValue) => {
        show.value = newValue;
    }
);

</script>

<style scoped>

</style>