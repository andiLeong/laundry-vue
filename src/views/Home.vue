<script setup>
import AppNavigation from '@/components/AppNavigation.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppLink from '@/components/AppLink.vue';
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
                        We’re changing the way people connect.
                    </h1>
                    <p
                        class="font-normal text-base"
                        style="color: #6b7280; line-height: normal"
                    >
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                        irure qui lorem cupidatat commodo. Elit sunt amet fugiat
                        veniam occaecat fugiat aliqua. Anim aute id magna aliqua
                        ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                        commodo.
                    </p>
                    <div>
                        <AppLink
                            :to="{ name: 'signup' }"
                            class="inline-flex items-center justify-center rounded-md px-4 py-2 text-white font-medium text-sm mt-4"
                            style="
                                background: #b170c3;
                                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                            "
                        >
                            Get Started
                            <svg
                                fill="none"
                                height="20"
                                viewBox="0 0 21 20"
                                width="21"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clip-rule="evenodd"
                                    d="M5.77502 10C5.77502 9.58579 6.11081 9.25 6.52502 9.25H13.1629L11.0052 7.29063C10.7066 7.00353 10.6973 6.52875 10.9844 6.23017C11.2715 5.93159 11.7463 5.92228 12.0449 6.20938L15.5449 9.45938C15.6919 9.60078 15.775 9.79599 15.775 10C15.775 10.204 15.6919 10.3992 15.5449 10.5406L12.0449 13.7906C11.7463 14.0777 11.2715 14.0684 10.9844 13.7698C10.6973 13.4713 10.7066 12.9965 11.0052 12.7094L13.1629 10.75H6.52502C6.11081 10.75 5.77502 10.4142 5.77502 10Z"
                                    fill="white"
                                    fill-rule="evenodd"
                                />
                            </svg>
                        </AppLink>
                    </div>
                </div>

                <div class="">
                    <img alt="lady" src="/src/assets/lady-laundry.png" />
                </div>
            </div>
        </section>

        <section class="need-line-bg about-us mt-9 px-20">
            <div class="flex justify-center items-center">
                <div class="text-center">
                    <h2 class="text-black text-5xl font-black">About Us</h2>
                    <p
                        class="mt-2.5 font-normal text-base"
                        style="color: #6b7280"
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                    </p>
                    <p class="font-normal text-base" style="color: #6b7280">
                        Maiores impedit perferendis suscipit eaque, iste dolor
                        cupiditate blanditiis.
                    </p>
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
                        <h3 class="font-black text-5xl">
                            We’re changing the way people connect.
                        </h3>
                        <p class="mt-4 text-base" style="color: #6b7280">
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
                        alt="about-us-second"
                        src="/src/assets/about-us-second.png"
                    />
                </div>
                <div
                    class="blue-bg-blur flex flex-col justify-end w-full md:w-1/2 mt-6 md:mt-0"
                >
                    <div class="bp-0 md:pb-28">
                        <h3 class="font-black text-5xl">
                            We’re changing the way people connect.
                        </h3>
                        <p class="mt-4 text-base" style="color: #6b7280">
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
                        alt="about-us-second"
                        src="/src/assets/about-us-second.png"
                    />
                </div>
            </div>
        </section>

        <div class="py-24 sm:py-32">
            <div
                class="px-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start"
            >
                <div class="px-6 lg:px-0 lg:pr-4 lg:pt-4">
                    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                        <h2
                            class="text-base font-semibold leading-7 text-primary"
                        >
                            All Data is store
                        </h2>
                        <p
                            class="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                        >
                            A better workflow
                        </p>
                        <p class="mt-6 text-lg leading-8 text-slate-600">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Maiores impedit perferendis suscipit eaque,
                        </p>
                        <dl
                            class="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-600 lg:max-w-none"
                        >
                            <div class="relative pl-9">
                                <dt class="inline font-semibold text-slate-900">
                                    <svg
                                        class="absolute left-1 top-1 h-5 w-5 text-primary"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    Push to deploy.
                                </dt>
                                <dd class="inline">
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Maiores impedit
                                    perferendis suscipit eaque, iste dolor
                                    cupiditate blanditiis ratione.
                                </dd>
                            </div>
                            <div class="relative pl-9">
                                <dt class="inline font-semibold text-slate-900">
                                    <svg
                                        class="absolute left-1 top-1 h-5 w-5 text-primary"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    SSL certificates.
                                </dt>
                                <dd class="inline">
                                    Anim aute id magna aliqua ad ad non deserunt
                                    sunt. Qui irure qui lorem cupidatat commodo.
                                </dd>
                            </div>
                            <div class="relative pl-9">
                                <dt class="inline font-semibold text-slate-900">
                                    <svg
                                        class="absolute left-1 top-1 h-5 w-5 text-primary"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    Database backups.
                                </dt>
                                <dd class="inline">
                                    Ac tincidunt sapien vehicula erat auctor
                                    pellentesque rhoncus. Et magna sit morbi
                                    lobortis.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="sm:px-6 lg:px-0">
                    <img
                        src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                        alt="Product screenshot"
                        class="rounded-tl-xl bg-slate-800 ring-1 ring-white/10"
                    />
                </div>
            </div>
        </div>
    </main>

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
