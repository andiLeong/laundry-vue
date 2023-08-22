<script setup>
import { onMounted, ref } from 'vue';
import { useSignVerifyStore } from '@/store/signupVerify.js';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        required: false,
        type: String,
    },
});

const signupVerifyStore = useSignVerifyStore();
const error = ref(null);
const isLoading = ref(false);
const showTimer = ref(false);
const second = ref(20);
const onFocus = ref(false);
const canNotEdit = ref(false);

function send() {
    error.value = null;

    if (props.modelValue === null) {
        error.value = 'phone is required to proceed';
        return;
    }

    if (showTimer.value) {
        return;
    }

    isLoading.value = true;
    axios
        .post('/api/verification-code/send/' + props.modelValue)
        .then(() => {
            // router.push({ name: 'login' });
        })
        .catch((err) => {
            error.value = err.response?.data?.message;
        })
        .finally(() => {
            isLoading.value = false;
            showTimer.value = true;
            second.value = 60;
            timer();
        });
}

function timer() {
    if (second.value === 0) {
        showTimer.value = false;
    }

    if (second.value > 0) {
        setTimeout(() => {
            second.value -= 1;
            timer();
        }, 1000);
        return;
    }
}

function disableEdit() {
    if (signupVerifyStore.needVerify) {
        canNotEdit.value = true;
        showTimer.value = true;
    }
}

function whenTyping(event) {
    emit('update:modelValue', event.target.value);
    if (error.value !== null) {
        error.value = null;
    }
}

onMounted(() => {
    if (canNotEdit.value) {
        timer();
    }
});

disableEdit();
</script>

<template>
    <div class="flex flex-col">
        <label class="mb-2.5 text-base font-medium label-color" for="phone"
            >Phone
            <span class="" style="color: #ff2e3b">*</span>
        </label>
        <div class="relative">
            <input
                id="phone"
                :class="
                    canNotEdit
                        ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                        : ''
                "
                :disabled="canNotEdit"
                :value="modelValue"
                class="input-border rounded-lg py-3 px-4 placeholder:text-slate-400 w-full focus:outline-none focus:ring focus:ring-purple-400 focus:border-purple-400"
                placeholder="Phone Number"
                type="text"
                @blur="onFocus = false"
                @focus="onFocus = true"
                @input="whenTyping"
            />

            <template v-if="showTimer">
                <div
                    class="absolute right-0 bottom-0 flex justify-center items-center bg-gray-100 px-3 text-gray-400 rounded-r-lg"
                    style="height: 49px"
                >
                    {{ second }}
                </div>
            </template>
            <template v-else>
                <button
                    :class="isLoading ? 'bg-loading-gray' : 'bg-purple-400'"
                    class="absolute right-0 bottom-0 px-3 text-white rounded-r-lg"
                    style="height: 50px"
                    @click.prevent="send"
                >
                    Send
                </button>
            </template>
        </div>

        <p v-if="error" class="validation-error">
            {{ error }}
        </p>
    </div>
</template>

<style scoped></style>