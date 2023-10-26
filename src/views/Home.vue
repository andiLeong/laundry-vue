<script setup>
import AppNavigation from '@/components/AppNavigation.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppLink from '@/components/AppLink.vue';
import AppFeature from '@/components/AppFeature.vue';
import AppStats from '@/components/AppStats.vue';
import RightArrow from '@/svg/RightArrow.vue';
</script>

<template>
    <AppNavigation />

    <main class="mx-auto max-w-screen-2xl">
        <section class="need-line-bg pt-10 px-20">
            <div class="md:grid grid-cols-2 gap-6 pb-40" style="">
                <div
                    class="space-y-4 flex flex-col justify-end pb-6 blue-bg-blur"
                    style=""
                >
                    <h1
                        class="text-5xl font-black"
                        style="color: #000; line-height: normal"
                    >
                        Connect, Choose, Save at our laundry.
                    </h1>
                    <p
                        class="font-normal text-base"
                        style="color: #6b7280; line-height: normal"
                    >
                        Welcome to SBIN Laundry, where we redefine the laundry
                        experience. Stay connected with our free Wi-Fi, choose
                        from our wide range of services, and enjoy the
                        affordability of our competitive prices. Your laundry,
                        your way<br />
                        it's all here at SBIN. Connect, Choose, Save - that's
                        our promise to you!
                    </p>
                    <div>
                        <AppLink
                            :to="{ name: 'signup' }"
                            class="inline-flex items-center justify-center rounded-md px-4 py-2 text-white font-medium text-sm mt-4"
                            style="
                                background: #5130d3;
                                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                            "
                        >
                            Get Started
                            <RightArrow class="w-5 h-5 text-white" />
                        </AppLink>
                    </div>
                </div>

                <div class="">
                    <img
                        alt="laundry-lady"
                        src="/src/assets/lady-laundry.png"
                    />
                </div>
            </div>
        </section>

        <section class="need-line-bg about-us mt-9 px-20">
            <div class="flex justify-center items-center">
                <div class="text-center">
                    <h2 class="text-black text-5xl font-black">About Us</h2>
                    <div class="max-w-2xl">
                        <p
                            class="mt-2.5 font-normal text-base"
                            style="color: #6b7280"
                        >
                            we're not just your average laundry shop, we're your
                            laundry partner. We take pride in making your
                            laundry experience hassle-free, cost-effective, and
                            even more enjoyable.
                        </p>
                    </div>
                </div>
            </div>
            <div class="my-6 md:grid grid-cols-2 gap-6">
                <div class="grid-rows-1">
                    <img
                        alt="about-us-first"
                        src="/src/assets/about-us-first.png"
                    />
                </div>
                <div
                    class="blue-bg-blur grid-rows-1 flex flex-col justify-end mt-6 md:mt-0"
                >
                    <div style="padding-bottom: 105px">
                        <h3 class="font-black text-5xl">Competitive Price</h3>
                        <p class="mt-4 text-base" style="color: #6b7280">
                            We believe that everyone deserves clean and fresh
                            clothes without breaking the bank. That's why we're
                            proud to offer competitive prices that don't
                            compromise on quality. With us, affordability meets
                            outstanding service. No hidden fees, no
                            surprises—just transparent, budget-friendly pricing
                            for all your laundry needs.
                        </p>
                    </div>
                </div>
            </div>
            <div class="my-6 md:flex gap-6 flex-col-reverse md:flex-row">
                <div class="block md:hidden w-full md:w-1/2">
                    <img
                        alt="about-us-second"
                        src="/src/assets/about-us-second.png"
                    />
                </div>
                <div
                    class="blue-bg-blur flex flex-col justify-end w-full md:w-1/2 mt-6 md:mt-0"
                >
                    <div class="bp-0 md:pb-28">
                        <h3 class="font-black text-5xl">Multiple Promotions</h3>
                        <p class="mt-4 text-base" style="color: #6b7280">
                            We are committed to making your laundry experience
                            not just hassle-free but also delightful. Our
                            multiple promotions are designed with you in mind,
                            and we believe that quality laundry service
                            shouldn't break the bank. Join us today and
                            experience it.
                        </p>
                    </div>
                </div>
                <div class="hidden md:block w-full md:w-1/2">
                    <img
                        alt="about-us-second"
                        src="/src/assets/about-us-second.png"
                    />
                </div>
            </div>
        </section>

        <AppFeature />
    </main>

    <AppStats />
    <AppFooter />
</template>

<style scoped>
.blue-bg-blur {
    position: relative;
}

.blue-bg-blur::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    border-radius: 413px;
    background:
        url('/src/assets/blue-bg.jpg'),
        lightgray 50% / cover no-repeat;
    -webkit-filter: blur(117px);
    -moz-filter: blur(117px);
    -o-filter: blur(117px);
    -ms-filter: blur(117px);
}

.blue-bg-blur > * {
    position: relative;
    z-index: 1;
}
</style>
