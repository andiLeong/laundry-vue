<script setup>
import {ref} from 'vue';
import RightArrow from '@/svg/RightArrow.vue';
import AppFooter from '@/components/AppFooter.vue';


const count = ref(0);
</script>

<template>

    <nav class="bg-gray-50 w-full">
        <section
            class="mx-auto max-w-screen-2xl flex justify-between px-10 py-4"
        >
            <div>
                <p class="font-semibold">logo</p>
            </div>

            <div>
                <ul class="flex space-x-3">
                    <li>
                        <a
                            href=""
                            class="font-bold text-sm"
                            style="color: #374151"
                        >Home</a
                        >
                    </li>
                    <li>
                        <a
                            href=""
                            class="font-bold text-sm"
                            style="color: #374151"
                        >Service</a
                        >
                    </li>
                    <li>
                        <a
                            href=""
                            class="font-bold text-sm"
                            style="color: #374151"
                        >Promotions</a
                        >
                    </li>
                </ul>
            </div>

            <div>
                <button
                    style="color: #374151"
                    class="flex items-center font-bold text-sm"
                >
                    Login
                    <RightArrow class="ml-2 w-5 h-5"/>
                </button>
            </div>
        </section>
    </nav>

    <main class="mx-auto max-w-screen-2xl my-9 space-y-9">


        <div class="">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-4xl text-center">
                    <h2 class="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
                    <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Pricing plans for teams
                        of&nbsp;all&nbsp;sizes</p>
                </div>
                <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">Choose an affordable plan
                    that’s packed with the best features for engaging your audience, creating customer loyalty, and
                    driving sales.</p>
                <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <div class="rounded-3xl p-8 xl:p-10 ring-1 ring-gray-200">
                        <div class="flex items-center justify-between gap-x-4">
                            <h3 id="tier-freelancer" class="text-lg font-semibold leading-8 text-gray-900">
                                Freelancer</h3>
                        </div>
                        <p class="mt-4 text-sm leading-6 text-gray-600">The essentials to provide your best work for
                            clients.</p>
                        <p class="mt-6 flex items-baseline gap-x-1">
                            <!-- Price, update based on frequency toggle state -->
                            <span class="text-4xl font-bold tracking-tight text-gray-900">$15</span>
                            <!-- Payment frequency, update based on frequency toggle state -->
                            <span class="text-sm font-semibold leading-6 text-gray-600">/month</span>
                        </p>
                        <a href="#" aria-describedby="tier-freelancer"
                           class="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300">Buy
                            plan</a>
                        <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                5 products
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Up to 1,000 subscribers
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Basic analytics
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                48-hour support response time
                            </li>
                        </ul>
                    </div>
                    <div class="rounded-3xl p-8 xl:p-10 ring-2 ring-indigo-600">
                        <div class="flex items-center justify-between gap-x-4">
                            <h3 id="tier-startup" class="text-lg font-semibold leading-8 text-indigo-600">Startup</h3>
                            <p class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                                Most popular</p>
                        </div>
                        <p class="mt-4 text-sm leading-6 text-gray-600">A plan that scales with your rapidly growing
                            business.</p>
                        <p class="mt-6 flex items-baseline gap-x-1">
                            <!-- Price, update based on frequency toggle state -->
                            <span class="text-4xl font-bold tracking-tight text-gray-900">$30</span>
                            <!-- Payment frequency, update based on frequency toggle state -->
                            <span class="text-sm font-semibold leading-6 text-gray-600">/month</span>
                        </p>
                        <a href="#" aria-describedby="tier-startup"
                           class="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 text-white shadow-sm hover:bg-indigo-500">Buy
                            plan</a>
                        <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                25 products
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Up to 10,000 subscribers
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Advanced analytics
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                24-hour support response time
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Marketing automations
                            </li>
                        </ul>
                    </div>
                    <div class="rounded-3xl p-8 xl:p-10 ring-1 ring-gray-200">
                        <div class="flex items-center justify-between gap-x-4">
                            <h3 id="tier-enterprise" class="text-lg font-semibold leading-8 text-gray-900">
                                Enterprise</h3>
                        </div>
                        <p class="mt-4 text-sm leading-6 text-gray-600">Dedicated support and infrastructure for your
                            company.</p>
                        <p class="mt-6 flex items-baseline gap-x-1">
                            <!-- Price, update based on frequency toggle state -->
                            <span class="text-4xl font-bold tracking-tight text-gray-900">$60</span>
                            <!-- Payment frequency, update based on frequency toggle state -->
                            <span class="text-sm font-semibold leading-6 text-gray-600">/month</span>
                        </p>
                        <a href="#" aria-describedby="tier-enterprise"
                           class="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300">Buy
                            plan</a>
                        <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Unlimited products
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Unlimited subscribers
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Advanced analytics
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                1-hour, dedicated support response time
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Marketing automations
                            </li>
                            <li class="flex gap-x-3">
                                <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Custom reporting tools
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>


        <div class="max-w-xl mx-auto px-2">
            <div class="space-y-2.5 text-center">
                <p style="color: #5130D3;line-height: normal" class="text-base text-center">Branches</p>
                <h1 class="text-2xl md:text-4xl font-black text-black">Search Branches</h1>
                <p class="font-normal text-sm md:text-base text-gray-500">Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit.
                    Maiores
                    impedit
                    perferendis suscipit eaque, iste dolor cupiditate blanditiis.</p>
            </div>
            <div class="mt-4 grid grid-cols-3 px-8 md:px-1">
                <input
                    type="text"
                    class="col-span-2 p-2 md:p-3 rounded-md mr-2 border border-neutral-200"
                    placeholder="Enter Location"
                >
                <button style="background: #6366F1" class="text-white rounded">SEARCH</button>
            </div>
        </div>

        <div class="px-8 md:px-20">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.5832137785897!2d121.00890747465701!3d14.56581067792838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9982bce975b%3A0x8b9cacd7ecc29e64!2sThe%20Spex!5e0!3m2!1sen!2sph!4v1691932194624!5m2!1sen!2sph"
                width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

    </main>

    <AppFooter/>

</template>

<style scoped>
</style>
