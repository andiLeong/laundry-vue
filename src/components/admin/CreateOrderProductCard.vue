<template>

    <div class="flex w-full items-center justify-between space-x-6 py-3 px-4">
        <h3 class="truncate text-sm font-medium text-gray-900">
            {{ product.name }}
            <span>{{ originalPrice }}</span>
            * <span>{{ product.quantity }}</span>
        </h3>
        <p class=" font-bold text-gray-900">
            P{{ product.price }}
        </p>
    </div>
    <div class="flex justify-between items-center py-3 px-4">
        <div class="flex items-end">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4 text-green-600">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
            </svg>
            <p class="text-gray-700 ml-0.5 text-xs">{{ product.stock }}</p>
        </div>
        <div class="space-x-3">
            <button @click.prevent="decrease" class="font-semibold text-xl text-red-500">&minus;</button>
            <button @click.prevent="increase" class="font-semibold text-xl text-green-500">&plus;</button>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['product', 'index'])
const emit = defineEmits(['updateProduct', 'productRemoved']);
const originalPrice = props.product.price

function increase() {
    let stock = props.product.stock - 1
    let quantity = props.product.quantity + 1
    let price = props.product.price + originalPrice
    if (stock < 0) {
        return;
    }
    emit('updateProduct', [stock, quantity, price], props.index)
}

function decrease() {
    let stock = props.product.stock + 1
    let quantity = props.product.quantity - 1
    let price = props.product.price - originalPrice
    if (quantity === 0) {
        emit('productRemoved', props.index, props.product.id)
        return;
    }
    emit('updateProduct', [stock, quantity, price], props.index)
}

</script>

<style scoped>

</style>