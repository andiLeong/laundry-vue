<script setup>
import {ref} from 'vue';
import AppNavigation from '@/components/AppNavigation.vue'
import AppFooter from '@/components/AppFooter.vue';
</script>

<template>
    <AppNavigation/>

    <main class="mx-auto max-w-screen-2xl">
        <section class="need-line-bg pt-10 px-20">
            <div style="" class="md:grid grid-cols-2 gap-6 pb-40">
                <div
                    style=""
                    class="space-y-4 flex flex-col justify-end pb-6 blue-bg-blur"
                >
                    <h1
                        style="color: #000; line-height: normal"
                        class="text-5xl font-black"
                    >
                        We’re changing the way people connect.
                    </h1>
                    <p
                        style="color: #6b7280; line-height: normal"
                        class="font-normal text-base"
                    >
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                        irure qui lorem cupidatat commodo. Elit sunt amet fugiat
                        veniam occaecat fugiat aliqua. Anim aute id magna aliqua
                        ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                        commodo.
                    </p>
                    <div>
                        <button
                            style="
                                background: #b170c3;
                                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                            "
                            class="flex items-center justify-center rounded-md px-4 py-2 text-white font-medium text-sm mt-4"
                        >
                            Get Started
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M5.77502 10C5.77502 9.58579 6.11081 9.25 6.52502 9.25H13.1629L11.0052 7.29063C10.7066 7.00353 10.6973 6.52875 10.9844 6.23017C11.2715 5.93159 11.7463 5.92228 12.0449 6.20938L15.5449 9.45938C15.6919 9.60078 15.775 9.79599 15.775 10C15.775 10.204 15.6919 10.3992 15.5449 10.5406L12.0449 13.7906C11.7463 14.0777 11.2715 14.0684 10.9844 13.7698C10.6973 13.4713 10.7066 12.9965 11.0052 12.7094L13.1629 10.75H6.52502C6.11081 10.75 5.77502 10.4142 5.77502 10Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="">
                    <img src="/src/assets/lady-laundry.png" alt="lady"/>
                </div>
            </div>
        </section>

        <section class="need-line-bg about-us mt-9 px-20">
            <div class="flex justify-center items-center">
                <div class="text-center">
                    <h2 class="text-black text-5xl font-black">About Us</h2>
                    <p
                        style="color: #6b7280"
                        class="mt-2.5 font-normal text-base"
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                    </p>
                    <p style="color: #6b7280" class="font-normal text-base">
                        Maiores impedit perferendis suscipit eaque, iste dolor
                        cupiditate blanditiis.
                    </p>
                </div>
            </div>
            <div class="my-6 md:grid grid-cols-2 gap-6">
                <div class="grid-rows-1">
                    <img
                        src="/src/assets/about-us-first.png"
                        alt="about-us-first"
                    />
                </div>
                <div
                    class="blue-bg-blur grid-rows-1 flex flex-col justify-end mt-6 md:mt-0"
                >
                    <div style="padding-bottom: 105px">
                        <h3 class="font-black text-5xl">
                            We’re changing the way people connect.
                        </h3>
                        <p style="color: #6b7280" class="mt-4 text-base">
                            Anim aute id magna aliqua ad ad non deserunt sunt.
                            Qui irure qui lorem cupidatat commodo. Elit sunt
                            amet fugiat veniam occaecat fugiat aliqua. Anim aute
                            id magna aliqua ad ad non deserunt sunt. Qui irure
                            qui lorem cupidatat commodo.
                        </p>
                    </div>
                </div>
            </div>
            <div class="my-6 md:flex gap-6 flex-col-reverse md:flex-row">
                <div class="block md:hidden w-full md:w-1/2">
                    <img
                        src="/src/assets/about-us-second.png"
                        alt="about-us-second"
                    />
                </div>
                <div
                    class="blue-bg-blur flex flex-col justify-end w-full md:w-1/2 mt-6 md:mt-0"
                >
                    <div class="bp-0 md:pb-28">
                        <h3 class="font-black text-5xl">
                            We’re changing the way people connect.
                        </h3>
                        <p style="color: #6b7280" class="mt-4 text-base">
                            Anim aute id magna aliqua ad ad non deserunt sunt.
                            Qui irure qui lorem cupidatat commodo. Elit sunt
                            amet fugiat veniam occaecat fugiat aliqua. Anim aute
                            id magna aliqua ad ad non deserunt sunt. Qui irure
                            qui lorem cupidatat commodo.
                        </p>
                    </div>
                </div>
                <div class="hidden md:block w-full md:w-1/2">
                    <img
                        src="/src/assets/about-us-second.png"
                        alt="about-us-second"
                    />
                </div>
            </div>
        </section>
    </main>

    <AppFooter/>
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
    background: url('src/assets/blue-bg.jpg'),
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
