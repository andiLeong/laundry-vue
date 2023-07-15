<template>
    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-1">
            <BaseInput
                labelClass="form-label"
                placeHolder="search user phone"
                class="mt-1 form-input"
                label="User"
                type="text"
                v-model="phone"
            />
        </div>
        <div class="sm:col-span-1 flex items-center">
            <div v-if="isLoading" class="mt-5">
                <LoadingIndicator class="animate-spin -ml-1 mr-3 h-6 w-6 text-sky-500"/>
            </div>
            <div v-if="user" class="mt-5 flex items-center">
                <button
                    class="mr-2 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    @click.prevent="clear">
                    &#10005
                </button>
                <p class="form-label">
                    {{ user.first_name }}.{{ user.last_name }}
                </p>
            </div>
            <div v-if="noUser" class="mt-5 flex items-center">
                <button
                    class="mr-2 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    @click.prevent="clear">
                    &#10005
                </button>
                <p class="text-xs text-red-400">No User Found</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseInput from '@/components/forms/BaseInput.vue';
import LoadingIndicator from '@/svg/LoadingIndicator.vue';
import {ref, watch} from "vue";

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const isLoading = ref(false);
const phone = ref(null);
const user = ref(null);
const noUser = ref(false);

watch(phone, async (newPhone, oldPhone) => {
    noUser.value = false;
    searchUser(newPhone)
})

function searchUser(phone) {

    if (phone !== null && phone.length === 11) {

        isLoading.value = true
        axios.get('api/admin/user/' + phone)
            .then(({data}) => {
                user.value = data
                emit('update:modelValue', user.value.id)
                isLoading.value = false
            })
            .catch(() => {
                isLoading.value = false
                noUser.value = true
            });
    }
}

function clear() {
    phone.value = null
    user.value = null
    emit('update:modelValue', null)
    noUser.value = false
}
</script>

<style scoped>

</style>