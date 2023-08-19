<script setup>
import Check from '@/svg/Check.vue';
import AppLink from '@/components/AppLink.vue';
import LockClosed from '@/svg/LockClosed.vue';
import LockOpen from '@/svg/LockOpen.vue';
import { ref } from 'vue';

const features = [
    'SMS marketing',
    'Omnichannel contact center',
    'Call tracking',
    'Push notifications',
];

const showPassword = ref(false);
</script>

<template>
    <main id="main" class="min-h-screen">
        <div class="max-w-7xl mx-auto">
            <nav class="md:flex items-center justify-end px-9 py-4">
                <p class="text-white mr-4">Already have an account ?</p>
                <div class="mt-3 md:mt-0">
                    <AppLink
                        :to="{ name: 'login' }"
                        class="bg-white rounded-lg px-6 py-2 text-purple-500"
                    >
                        Sign In
                    </AppLink>
                </div>
            </nav>
            <section
                class="max-w-4xl mx-auto space-y-9 mt-6 px-6 pb-0 md:pb-16"
            >
                <div class="flex justify-center">
                    <img alt="logo" class="w-24 h-24" src="/logo-bnw.png" />
                </div>
                <h1
                    class="text-white font-medium text-center"
                    style="font-size: 32px; line-height: 44px"
                >
                    Sign Up To Wash Now
                </h1>

                <div class="flex">
                    <div
                        class="hidden md:block px-9 py-10 left-part bg-gray-100 rounded-l-lg"
                    >
                        <p
                            class="text-base font-medium mb-4"
                            style="color: #1e293b"
                        >
                            WITH SBIN LAUNDRY YOU CAN BUILD:
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
                        <form action="">
                            <div class="space-y-5">
                                <div class="flex flex-col">
                                    <label
                                        class="mb-2.5 text-base font-medium"
                                        for="first_name"
                                        style="color: #1c2434"
                                        >First Name
                                        <span class="" style="color: #ff2e3b"
                                            >*</span
                                        >
                                    </label>
                                    <input
                                        id="first_name"
                                        class="rounded-lg py-3 px-4"
                                        placeholder="enter your first name"
                                        style="border: 1px solid #e2e8f0"
                                        type="text"
                                    />
                                </div>

                                <div class="flex flex-col">
                                    <label
                                        class="mb-2.5 text-base font-medium"
                                        for="last_name"
                                        style="color: #1c2434"
                                        >Last Name
                                    </label>
                                    <input
                                        id="last_name"
                                        class="rounded-lg py-3 px-4"
                                        placeholder="enter your last name"
                                        style="border: 1px solid #e2e8f0"
                                        type="text"
                                    />
                                </div>

                                <div class="flex flex-col">
                                    <label
                                        class="mb-2.5 text-base font-medium"
                                        for="middle_name"
                                        style="color: #1c2434"
                                        >Middle Name
                                    </label>
                                    <input
                                        id="middle_name"
                                        class="rounded-lg py-3 px-4"
                                        placeholder="enter your middle name"
                                        style="border: 1px solid #e2e8f0"
                                        type="text"
                                    />
                                </div>

                                <div class="flex flex-col relative">
                                    <label
                                        class="mb-2.5 text-base font-medium"
                                        for="middle_name"
                                        style="color: #1c2434"
                                        >Password
                                        <span class="" style="color: #ff2e3b"
                                            >*</span
                                        >
                                    </label>
                                    <input
                                        id="password"
                                        :type="
                                            showPassword ? 'text' : 'password'
                                        "
                                        class="rounded-lg py-3 px-4"
                                        placeholder="enter your password"
                                        style="border: 1px solid #e2e8f0"
                                    />
                                    <div
                                        class="absolute bottom-0 right-0 mr-2 mb-3 cursor-pointer"
                                        @click.prvent="
                                            showPassword = !showPassword
                                        "
                                    >
                                        <LockOpen
                                            v-if="showPassword"
                                            class="w-6 h-6"
                                            style="color: #d9d9d9"
                                        />
                                        <LockClosed
                                            v-else
                                            class="w-6 h-6"
                                            style="color: #d9d9d9"
                                        />
                                    </div>
                                </div>

                                <div class="flex flex-col">
                                    <label
                                        class="mb-2.5 text-base font-medium"
                                        for="phone"
                                        style="color: #1c2434"
                                        >Phone Number
                                        <span class="" style="color: #ff2e3b"
                                            >*</span
                                        >
                                    </label>
                                    <input
                                        id="phone"
                                        class="rounded-lg py-3 px-4"
                                        placeholder="enter your phone number"
                                        style="border: 1px solid #e2e8f0"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="mt-20">
                                <button
                                    class="rounded-md text-white w-full py-4"
                                    style="background: #5130d3"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped>
#main {
    background-image: url('/signup-bg.png');
    background-size: cover;
}

.left-part {
    opacity: 0.7;
}
</style>
