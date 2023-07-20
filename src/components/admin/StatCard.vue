<script setup>
import CountUp from '@/components/CountUp.vue';

defineProps({
    title: {
        required: true,
    },
    number: { required: true },
    percentage: { default: false },
});
</script>

<template>
    <div class="overflow-hidden rounded-lg bg-white shadow">
        <div class="p-5">
            <div class="flex items-center">
                <div class="ml-5 w-0 flex-1">
                    <dl>
                        <dt class="truncate text-sm font-medium text-gray-500">
                            {{ title }}
                        </dt>
                        <dd>
                            <div class="text-lg font-medium text-gray-900">
                                <CountUp :to="number" :key="number" />
                                <span v-if="percentage">%</span>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
