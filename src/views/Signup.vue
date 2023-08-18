<script setup>
import Check from '@/svg/Check.vue';

const features = [
    'SMS marketing',
    'Omnichannel contact center',
    'Call tracking',
    'Push notifications',
];
</script>

<template>
    <main id="main" class="min-h-screen">
        <div class="max-w-7xl mx-auto">
            <nav class="flex items-center justify-end px-9 py-4">
                <p class="text-white mr-4">Already have an account ?</p>
                <a href="" class="bg-white rounded-lg px-6 py-2 text-purple-500"
                    >Sign In</a
                >
            </nav>
            <section class="max-w-4xl mx-auto space-y-9 mt-6 pb-16">
                <div class="flex justify-center">
                    <img class="w-24 h-24" src="/logo-bnw.png" alt="logo" />
                </div>
                <h1
                    style="font-size: 32px; line-height: 44px"
                    class="text-white font-medium text-center"
                >
                    Get started with a free SBIN account.
                </h1>

                <div class="flex">
                    <div
                        style="border-radius: 8px 0px 0px 8px"
                        class="hidden md:block px-9 py-10 left-part bg-gray-100"
                    >
                        <p
                            style="color: #1e293b"
                            class="text-base font-medium mb-4"
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
                                    style="color: #475569"
                                    class="font-light text-sm"
                                >
                                    {{ feature }}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div
                        style="border-radius: 0px 8px 8px 0px"
                        class="bg-white px-9 py-6 flex-1"
                    >
                        <form action="">
                            <div class="space-y-5">
                                <div class="flex flex-col">
                                    <label
                                        style="color: #1c2434"
                                        class="mb-2.5 text-base font-medium"
                                        for="first_name"
                                        >First Name
                                        <span style="color: #ff2e3b" class=""
                                            >*</span
                                        >
                                    </label>
                                    <input
                                        style="border: 1px solid #e2e8f0"
                                        type="text"
                                        class="rounded-lg py-3 px-4"
                                        id="first_name"
                                        placeholder="enter your first name"
                                    />
                                </div>

                                <div class="flex flex-col">
                                    <label
                                        style="color: #1c2434"
                                        class="mb-2.5 text-base font-medium"
                                        for="last_name"
                                        >Last Name
                                    </label>
                                    <input
                                        style="border: 1px solid #e2e8f0"
                                        type="text"
                                        class="rounded-lg py-3 px-4"
                                        id="last_name"
                                        placeholder="enter your last name"
                                    />
                                </div>

                                <div class="flex flex-col">
                                    <label
                                        style="color: #1c2434"
                                        class="mb-2.5 text-base font-medium"
                                        for="middle_name"
                                        >Middle Name
                                    </label>
                                    <input
                                        style="border: 1px solid #e2e8f0"
                                        type="text"
                                        class="rounded-lg py-3 px-4"
                                        id="middle_name"
                                        placeholder="enter your middle name"
                                    />
                                </div>

                                <div class="flex flex-col">
                                    <label
                                        style="color: #1c2434"
                                        class="mb-2.5 text-base font-medium"
                                        for="middle_name"
                                        >Password
                                        <span style="color: #ff2e3b" class=""
                                            >*</span
                                        >
                                    </label>
                                    <input
                                        style="border: 1px solid #e2e8f0"
                                        type="password"
                                        class="rounded-lg py-3 px-4"
                                        id="password"
                                        placeholder="enter your password"
                                    />
                                </div>

                                <div class="flex flex-col">
                                    <label
                                        style="color: #1c2434"
                                        class="mb-2.5 text-base font-medium"
                                        for="phone"
                                        >Phone Number
                                        <span style="color: #ff2e3b" class=""
                                            >*</span
                                        >
                                    </label>
                                    <input
                                        style="border: 1px solid #e2e8f0"
                                        type="text"
                                        class="rounded-lg py-3 px-4"
                                        id="phone"
                                        placeholder="enter your phone number"
                                    />
                                </div>
                            </div>

                            <div class="mt-20">
                                <button
                                    style="background: #5130d3"
                                    class="rounded-md text-white w-full py-4"
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
