<template>
    <div v-if="promotions !== null" class="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-2">
            <fieldset>
                <legend class="form-label">Isolated</legend>
                <div class="mt-2 space-y-1">
                    <div
                        v-for="promotion in isolatedPromotions"
                        :key="promotion.id"
                        class="relative flex gap-x-3"
                    >
                        <div class="flex h-6 items-center">
                            <input
                                @change="addPromotions(promotion.id)"
                                :id="promotion.id" type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600">
                        </div>
                        <div class="text-sm leading-6">
                            <label :for="promotion.id" class="form-label">{{ promotion.name }}</label>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>

        <div class="sm:col-span-2">
            <fieldset>
                <legend class="form-label">Non Isolated</legend>
                <div class="mt-2 space-y-1">
                    <div
                        v-for="promotion in nonIsolatedPromotions"
                        :key="promotion.id"
                        class="relative flex gap-x-3"
                    >
                        <div class="flex h-6 items-center">
                            <input
                                @change="addPromotions(promotion.id)"
                                :id="promotion.id" type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600">
                        </div>
                        <div class="text-sm leading-6">
                            <label :for="promotion.id" class="form-label">{{ promotion.name }}</label>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>

        <div class="sm:col-span-2">
            <label class="form-label mb-3">Is Isolated</label>
            <ToggleButton :state="isolated" @changed="setIsolated"/>
        </div>

    </div>

    <MountedTeleport to="#fetch-promotion-button">
        <button
            @click.prevent="fetchPromotions"
            type="button"
            class="rounded bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-600 shadow-sm hover:bg-sky-100">
            Promotion
        </button>
    </MountedTeleport>

</template>

<script setup>
import ToggleButton from "@/components/forms/ToggleButton.vue";
import {computed, ref} from "vue";
import Errors from "@/model/Errors.js";
import MountedTeleport from "@/components/MountedTeleport.vue";


const props = defineProps({
    service_id: {required: true},
    user_id: {required: true},
});
const emit = defineEmits(['promotionUpdated', 'getError']);

const promotions = ref(null);
const promotion_ids = ref([]);
const isolated = ref(false);
const isolatedPromotions = computed(() => promotions.value?.isolated)
const nonIsolatedPromotions = computed(() => promotions.value !== null ? promotions.value['non-isolated'] : null)

function setIsolated(value) {
    isolated.value = value
}

function addPromotions(id) {
    if (promotion_ids.value.includes(id)) {
        let index = promotion_ids.value.indexOf(id);
        promotion_ids.value.splice(index, 1);
        emit('promotionUpdated', promotion_ids.value)
        return;
    }
    promotion_ids.value.push(id);
    emit('promotionUpdated', promotion_ids.value)
}

function fetchPromotions() {
    if (props.user_id === null || props.service_id === null) {
        return;
    }

    axios
        .get(`api/admin/user/qualified-promotion/${props.user_id}/${props.service_id}`)
        .then(({data}) => {
            promotions.value = data;
            console.log(data)
        })
        .catch((error) => {
            let err = new Errors(error);
            emit('getError', err.handle())
        });
}

</script>

<style scoped>

</style>