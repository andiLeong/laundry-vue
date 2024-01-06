<script setup>
import CountUp from '@/components/CountUp.vue';
</script>

<template>
    <div class="stat-bg">
        <div class="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
            <dl
                class="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8"
            >
                <div class="flex flex-col">
                    <dt
                        class="order-2 mt-2 text-lg font-medium leading-6 text-white"
                    >
                        Users
                    </dt>
                    <dd
                        class="order-1 text-5xl font-bold tracking-tight text-white"
                    >
                        <CountUp :to="4" />
                    </dd>
                </div>
                <div class="mt-10 flex flex-col sm:mt-0">
                    <dt
                        class="order-2 mt-2 text-lg font-medium leading-6 text-white"
                    >
                        Orders
                    </dt>
                    <dd
                        class="order-1 text-5xl font-bold tracking-tight text-white"
                    >
                        <CountUp :to="467" />
                    </dd>
                </div>
                <div class="mt-10 flex flex-col sm:mt-0">
                    <dt
                        class="order-2 mt-2 text-lg font-medium leading-6 text-white"
                    >
                        Promotions
                    </dt>
                    <dd
                        class="order-1 text-5xl font-bold tracking-tight text-white"
                    >
                        <CountUp :to="1" />
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>

<style scoped>
.stat-bg {
    background: linear-gradient(165deg, #ca92f9 0%, #8ce4ee 100%);
}
</style>