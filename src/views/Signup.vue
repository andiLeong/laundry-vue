<script setup>
import LockClosed from '@/svg/LockClosed.vue';
import LockOpen from '@/svg/LockOpen.vue';
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useRouter } from 'vue-router';
import SignupLayout from '@/components/SignupLayout.vue';
import { useSignVerifyStore } from '@/store/signupVerify.js';
import PrimarySubmitButton from '@/components/forms/PrimarySubmitButton.vue';
import useGoogleRecaptcha from '@/composable/useGoogleRecaptcha.js';

const showPassword = ref(false);
const isLoading = ref(false);
const verifyStore = useSignVerifyStore();
const { loadRecaptcha, removeRecaptcha } = useGoogleRecaptcha();

const router = useRouter();
const validationSchema = ref(
    object({
        phone: string()
            .required()
            .min(11)
            .max(11)
            .matches(/^[0-9]+$/, 'Its not a number'),
        password: string().required().min(8).max(90),
        first_name: string()
            .required()
            .max(50)
            .test('test-name', 'Number is not accepted', value =>
                /^([^0-9]*)$/.test(value),
            ),
        middle_name: string()
            .nullable(true)
            .max(50)
            .test('test-name', 'Number is not accepted', value =>
                /^([^0-9]*)$/.test(value),
            ),
        last_name: string()
            .required()
            .max(50)
            .test('test-name', 'Number is not accepted', value =>
                /^([^0-9]*)$/.test(value),
            ),
    }),
);

const { handleSubmit, errors } = useForm({
    validationSchema,
});

const { value: phone } = useField('phone');
const { value: first_name } = useField('first_name');
const { value: middle_name } = useField('middle_name');
const { value: last_name } = useField('last_name');
const { value: password } = useField('password');
const { value: notification } = useField('notification');
const { value: recaptcha_token } = useField('recaptcha_token');

loadRecaptcha();

let recaptchaScriptIsReady = false;
let checkInterval = setInterval(function () {
    if (grecaptcha) {
        recaptchaScriptIsReady = true;
        clearInterval(checkInterval);
        grecaptcha.ready(function () {
            grecaptcha
                .execute('6Ld0LU0pAAAAAG1DfvNrfrJBkbQH4_MJ_OkcwQV_', {
                    action: 'signup',
                })
                .then(token => {
                    recaptcha_token.value = token;
                });
        });
    }
    return recaptchaScriptIsReady;
}, 500);

const submit = ref(
    handleSubmit(values => {
        signup(values);
    }),
);

async function signup(user) {
    isLoading.value = true;
    Object.keys(user).forEach(key =>
        user[key] === undefined ? delete user[key] : {},
    );

    axios
        .post('/api/signup', user)
        .then(() => {
            removeRecaptcha();
            verifyStore.setPhone(user.phone);
            router.push({ name: 'verify' });
        })
        .catch(err => {
            errors.value.password = err.response?.data?.message;
            console.log(err.response?.data);
        })
        .finally(() => {
            isLoading.value = false;
        });
}
</script>

<template>
    <SignupLayout>
        <template v-slot:header>
            <div class="flex justify-center items-center">
                <div>
                    <img
                        alt="logo"
                        class="w-24 h-24"
                        src="/white-logo-no-bg.png"
                    />
                </div>
                <div>
                    <h1
                        class="text-white font-medium text-center"
                        style="font-size: 32px; line-height: 44px"
                    >
                        SBIN laundry
                    </h1>
                </div>
            </div>
        </template>

        <form @submit.prevent="submit">
            <div class="space-y-5">
                <input type="text" v-model="notification" class="hidden" />
                <input type="text" v-model="recaptcha_token" class="hidden" />
                <div class="flex flex-col">
                    <label
                        class="mb-2.5 text-base font-medium label-color"
                        for="first_name"
                        >Phone
                        <span class="" style="color: #ff2e3b">*</span>
                    </label>
                    <input
                        id="phone"
                        v-model="phone"
                        class="rounded-lg py-3 px-4 placeholder:text-slate-400 input-border"
                        placeholder="Phone Number"
                        type="text"
                    />
                    <p v-if="errors.phone" class="validation-error">
                        {{ errors.phone }}
                    </p>
                </div>

                <div class="flex flex-col">
                    <label
                        class="mb-2.5 text-base font-medium label-color"
                        for="first_name"
                        >First Name
                        <span class="" style="color: #ff2e3b">*</span>
                    </label>
                    <input
                        id="first_name"
                        v-model="first_name"
                        class="rounded-lg py-3 px-4 placeholder:text-slate-400 input-border"
                        placeholder="first name"
                        type="text"
                    />
                    <p v-if="errors.first_name" class="validation-error">
                        {{ errors.first_name }}
                    </p>
                </div>

                <div class="flex flex-col">
                    <label
                        class="mb-2.5 text-base font-medium label-color"
                        for="middle_name"
                        >Middle Name
                    </label>
                    <input
                        id="middle_name"
                        v-model="middle_name"
                        class="rounded-lg py-3 px-4 placeholder:text-slate-400 input-border"
                        placeholder="middle name"
                        type="text"
                    />
                    <p v-if="errors.middle_name" class="validation-error">
                        {{ errors.middle_name }}
                    </p>
                </div>

                <div class="flex flex-col">
                    <label
                        class="mb-2.5 text-base font-medium label-color"
                        for="last_name"
                        >Last Name
                        <span class="" style="color: #ff2e3b">*</span>
                    </label>
                    <input
                        id="last_name"
                        v-model="last_name"
                        class="rounded-lg py-3 px-4 placeholder:text-slate-400 input-border"
                        placeholder="last name"
                        type="text"
                    />
                    <p v-if="errors.last_name" class="validation-error">
                        {{ errors.last_name }}
                    </p>
                </div>

                <div class="flex flex-col">
                    <label
                        class="mb-2.5 text-base font-medium label-color"
                        for="password"
                        >Password
                        <span class="" style="color: #ff2e3b">*</span>
                    </label>
                    <div class="relative">
                        <input
                            id="password"
                            v-model="password"
                            :type="showPassword ? 'text' : 'password'"
                            class="rounded-lg py-3 px-4 placeholder:text-slate-400 input-border w-full"
                            placeholder="enter your password"
                        />
                        <div
                            class="absolute bottom-0 right-0 mr-2 mb-3 cursor-pointer"
                            @click.prevent="showPassword = !showPassword"
                        >
                            <LockOpen
                                v-if="showPassword"
                                class="w-6 h-6"
                                style="color: #d9d9d9"
                            />
                            <LockClosed
                                v-else
                                class="w-6 h-6"
                                style="color: #d9d9d9"
                            />
                        </div>
                    </div>
                    <p v-if="errors.password" class="validation-error">
                        {{ errors.password }}
                    </p>
                </div>
            </div>

            <div class="mt-20">
                <PrimarySubmitButton :is-loading="isLoading" name="Sign Up" />
            </div>
        </form>
    </SignupLayout>
</template>

<style scoped></style>
