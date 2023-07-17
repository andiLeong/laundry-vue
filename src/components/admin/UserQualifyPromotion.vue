<template>
    <fieldset>
        <legend class="form-label">{{ title }}</legend>
        <div class="mt-2 space-y-1">
            <div
                v-for="promotion in promotions"
                :key="promotion.id"
                class="relative flex gap-x-3"
            >
                <div class="flex h-6 items-center">
                    <input
                        @change="$emit('promotionAdded',promotion.id)"
                        :id="promotion.id" type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600">
                </div>
                <div class="text-sm leading-6">
                    <label :for="promotion.id" class="form-label">{{ promotion.name }}</label>
                </div>
            </div>
        </div>
    </fieldset>
</template>

<script setup>

defineEmits(['promotionAdded']);
const props = defineProps({
    promotions: {
        type: Array,
        default: [],
    },
    title: {
        type: String,
        required: true,
    },
});
</script>

<style scoped>

</style>