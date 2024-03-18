<script setup></script>

<template>
    <!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
    <div class="bg-white">
        <section aria-labelledby="features-heading" class="relative">
            <div
                class="aspect-h-2 aspect-w-3 overflow-hidden sm:aspect-w-5 lg:aspect-none lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-16"
            >
                <img
                    src="https://tailwindui.com/img/ecommerce-images/confirmation-page-01-hero.jpg"
                    alt="Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen."
                    class="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>

            <div
                class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-32"
            >
                <div class="lg:col-start-2">
                    <h2 id="features-heading" class="font-medium text-gray-500">
                        SBIN Laundry
                    </h2>
                    <p
                        class="mt-4 text-4xl font-bold tracking-tight text-gray-900"
                    >
                        🌟 20PESO off on every full service laundry
                    </p>
                    <p class="mt-4 text-gray-500">
                        Enjoy a fantastic ₱20 OFF min(150) on all full-service
                        laundry orders to all residence from The City Flats at
                        Sacred Heart! 💰💼 But wait, there's more!
                    </p>

                    <dl
                        class="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 text-sm sm:grid-cols-2"
                    >
                        <div>
                            <dt class="font-medium text-gray-900">
                                Free Pickup/Delivery
                            </dt>
                            <dd class="mt-2 text-gray-500">
                                🚚 Avail of our FREE delivery and pick-up
                                service to experience utmost convenience. Sit
                                back, relax. 🚛💨
                            </dd>
                        </div>
                        <div>
                            <dt class="font-medium text-gray-900">
                                Bedding & Towel
                            </dt>
                            <dd class="mt-2 text-gray-500">
                                And here's an added bonus: During this promotion
                                period, we're extending our usual 5kg limit for
                                bedding and towel wash to a generous 8kg! 🛌🚿`
                            </dd>
                        </div>
                        <div>
                            <dt class="font-medium text-gray-900">
                                Promo expiration
                            </dt>
                            <dd class="mt-2 text-gray-500">
                                Hurry, offer ends May 31st, 2024! Take advantage
                                of this promotion and give your laundry the
                                treatment it deserves. We can't wait to serve
                                you! 🎊👕🧺
                            </dd>
                        </div>
                        <div>
                            <dt class="font-medium text-gray-900">
                                Downy and tide/ariel include
                            </dt>
                            <dd class="mt-2 text-gray-500">
                                We prioritize quality and exclusively use
                                trusted brands like Ariel and Downy for that
                                extra freshness and softness you love. Say
                                goodbye to unknown brands – with us, your
                                fabrics are in good hands! 💪👚🧼
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped></style>
