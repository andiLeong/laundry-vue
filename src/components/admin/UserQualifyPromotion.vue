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
                        @change="add(promotion, $event)"
                        :id="promotion.id"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                    />
                </div>
                <div class="text-sm leading-6">
                    <label
                        :for="promotion.id"
                        class="form-label flex items-center"
                    >
                        {{ promotion.name }} -
                        <p
                            class="ml-2 text-xs font-semibold text-gray-400"
                            :class="{
                                'line-through': selected.includes(promotion.id),
                            }"
                        >
                            {{ discount(promotion.discount) }} off
                        </p>
                    </label>
                </div>
            </div>
        </div>
    </fieldset>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['promotionAdded', 'promotionRemoved']);
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

const selected = ref([]);

const discount = (dis) => dis * 100;
function add(promotion, e) {
    let id = promotion.id;
    if (e.target.checked) {
        selected.value.push(id);
        emit('promotionAdded', promotion);
    } else {
        selected.value = selected.value.filter(
            (selectedId) => selectedId !== id,
        );
        emit('promotionRemoved', promotion);
    }
}
</script>

<style scoped></style>
