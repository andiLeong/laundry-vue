<script setup>
import Check from '@/svg/Check.vue';
import router from '@/router/index.js';
import useGoogleRecaptcha from '@/composable/useGoogleRecaptcha.js';

const features = [
    'Each full service use downy facon and ariel',
    'Frequently promotion',
    'Wifi zone for self service',
    'Free delivery and pickup',
    'Dry clothes',
];
const { removeRecaptcha } = useGoogleRecaptcha();

function toLogIn() {
    removeRecaptcha();
    router.push({ name: 'login' });
}
</script>

<template>
    <main class="min-h-screen need-signup-bg">
        <div class="max-w-7xl mx-auto">
            <nav class="md:flex items-center justify-end px-9 py-4">
                <p class="text-white mr-4">Already have an account ?</p>
                <div class="mt-3 md:mt-0">
                    <button
                        @click.prevent="toLogIn()"
                        class="bg-white rounded-lg px-6 py-2 text-purple-500"
                    >
                        Sign In
                    </button>
                </div>
            </nav>
            <section
                class="max-w-4xl mx-auto space-y-9 mt-6 px-6 pb-0 md:pb-16"
            >
                <slot name="header"></slot>

                <div class="flex">
                    <div
                        class="hidden md:block px-9 py-10 opacity-70 bg-gray-100 rounded-l-lg"
                    >
                        <p
                            class="text-base font-medium mb-4"
                            style="color: #1e293b"
                        >
                            IN SBIN YOU CAN AVAIL :
                        </p>
                        <ul class="space-y-4">
                            <li
                                v-for="feature in features"
                                :key="feature"
                                class="flex items-center"
                            >
                                <check class="text-green-500 h-6 w-6 mr-3" />
                                <p
                                    class="font-light text-sm"
                                    style="color: #475569"
                                >
                                    {{ feature }}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="bg-white px-9 py-6 flex-1 md:rounded-r-lg">
                        <slot />
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped></style>
