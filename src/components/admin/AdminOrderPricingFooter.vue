<template>
    <div class="mx-auto max-w-xl bg-white py-4 px-4 rounded-md shadow mt-20">
        <ul class="mb-10 mt-2">
            <li class="flex justify-between border-b border-1 border-gray-200">
                <p class="text-gray-600">Service Price</p>
                <p class="text-gray-900">P{{ servicePrice }}</p>
            </li>
            <li class="flex justify-between border-b border-1 border-gray-200 mt-4">
                <p class="text-gray-600">Product Price</p>
                <p class="text-gray-900">P{{ productPrice }}</p>
            </li>
            <li class="flex justify-between border-b border-1 border-gray-200 mt-4">
                <p class="text-gray-600">Promotion Price</p>
                <p class="text-gray-900"> - P{{ promotionPrice }}</p>
            </li>
            <li class="flex justify-between mt-6">
                <p class="text-xl font-medium text-gray-700">Total:</p>
                <p class="text-xl font-medium text-gray-700">P{{ totalPrice }}</p>
            </li>
        </ul>
        <div class="flex justify-end">
            <slot/>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    totalPrice: {
        required: true,
    },
    servicePrice: {
        required: true,
    },
    promotionPrice: {
        required: false,
        default: 0,
    },
    productPrice: {
        required: false,
        default: 0,
    },
});
</script>

<style scoped>

</style>