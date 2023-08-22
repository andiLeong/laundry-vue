<script setup>
import { ref, watch } from 'vue';
import { useSignVerifyStore } from '@/store/signupVerify.js';
import SignupLayout from '@/components/SignupLayout.vue';
import PrimarySubmitButton from '@/components/forms/PrimarySubmitButton.vue';
import { useRouter } from 'vue-router';
import SendVerificationCode from '@/components/SendVerificationCode.vue';

const isLoading = ref(false);
const token = ref(null);
const error = ref(null);
const phone = ref(null);
const signupVerifyStore = useSignVerifyStore();
const router = useRouter();

watch(phone, (newValue) => {
    resetError();
});

watch(token, (newValue) => {
    resetError();
});

function resetError() {
    if (error.value !== null) {
        error.value = null;
    }
}

function setPhone() {
    if (signupVerifyStore.needVerify) {
        phone.value = signupVerifyStore.getPhone;
    }
}

function submit() {
    isLoading.value = true;

    if (token.value === null) {
        error.value = 'OTP is required to proceed';
        return;
    }

    if (phone.value === null) {
        error.value = 'phone is required to proceed';
        return;
    }

    axios
        .post('/api/verification', {
            phone: phone.value,
            token: token.value,
        })
        .then(() => {
            signupVerifyStore.setPhone(null);
            router.push({ name: 'login' });
        })
        .catch((err) => {
            error.value = err.response?.data?.message;
        })
        .finally(() => {
            isLoading.value = false;
        });
}

setPhone();
</script>

<template>
    <SignupLayout>
        <template v-slot:header>
            <h1
                class="text-white font-medium text-center"
                style="font-size: 32px; line-height: 44px"
            >
                Verification
            </h1>
        </template>

        <form @submit.prevent="submit">
            <div class="space-y-5">
                <SendVerificationCode v-model="phone"></SendVerificationCode>
                <div class="flex flex-col relative">
                    <label
                        class="mb-2.5 text-base font-medium label-color"
                        for="token"
                        >OTP
                        <span class="" style="color: #ff2e3b">*</span>
                    </label>
                    <input
                        id="token"
                        v-model="token"
                        class="rounded-lg py-3 px-4 placeholder:text-slate-400 input-border"
                        placeholder="OTP"
                        required
                        type="text"
                    />
                </div>
            </div>

            <div class="mt-4">
                <p class="text-xs text-gray-600 font-medium italic">
                    OTP expires in 5 minutes
                </p>
            </div>

            <div v-if="error">
                <p class="validation-error">{{ error }}</p>
            </div>

            <div class="mt-20">
                <PrimarySubmitButton :is-loading="isLoading" name="Verify" />
            </div>
        </form>
    </SignupLayout>
</template>

<style scoped></style>