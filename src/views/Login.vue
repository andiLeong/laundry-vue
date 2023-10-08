<template>
    <main
        class="min-h-screen flex justify-center items-center"
        style="background: #f8f9fe"
    >
        <section
            class="w-full md:max-w-5xl mx-auto md:flex rounded-lg shadow-2xl hidden"
        >
            <div class="bg-white md:px-6 lg:px-8 py-9 flex-1">
                <h1 class="text-3xl" style="color: #212b36">Sign In</h1>
                <div class="my-5">
                    <form @submit.prevent="submit">
                        <div class="space-y-5">
                            <div class="flex flex-col">
                                <label
                                    class="mb-2.5 text-base font-medium label-color"
                                    for="phone"
                                    >Phone
                                </label>
                                <input
                                    v-model="phone"
                                    :class="
                                        errors.phone
                                            ? 'input-error-border'
                                            : 'input-border'
                                    "
                                    class="rounded-lg py-3 px-4 placeholder:text-slate-400"
                                    placeholder="Phone"
                                    type="text"
                                />
                                <p v-if="errors.phone" class="validation-error">
                                    {{ errors.phone }}
                                </p>
                            </div>

                            <div class="flex flex-col">
                                <label
                                    class="mb-2.5 text-base font-medium label-color"
                                    for="password"
                                    >Password
                                </label>
                                <div class="relative w-full">
                                    <div
                                        class="absolute bottom-0 right-0 mr-3 mb-2 text-slate-400"
                                    >
                                        <button
                                            @click.prevent="showPasswordInput"
                                        >
                                            <LockOpen
                                                v-if="showPassword"
                                                class="w-5 h-5"
                                            />
                                            <LockClosed
                                                v-else
                                                class="w-5 h-5"
                                            />
                                        </button>
                                    </div>
                                    <input
                                        v-model="password"
                                        :class="
                                            errors.password
                                                ? 'input-error-border'
                                                : 'input-border'
                                        "
                                        class="rounded-lg py-3 px-4 placeholder:text-slate-400 w-full"
                                        placeholder="Password"
                                        :type="
                                            showPassword ? 'text' : 'password'
                                        "
                                    />
                                </div>
                                <p
                                    v-if="errors.password"
                                    class="validation-error"
                                >
                                    {{ errors.password }}
                                </p>
                            </div>

                            <div class="flex items-center">
                                <input
                                    class="h-4 w-4 rounded border-gray-300"
                                    name="remember-me"
                                    type="checkbox"
                                />
                                <label
                                    class="ml-3 block text-sm leading-6 label-color"
                                    for="remember-me"
                                    >Remember me</label
                                >
                            </div>

                            <div class="flex justify-between">
                                <div class="flex items-center">
                                    <AppLink
                                        :to="{ name: 'verify' }"
                                        class="text-gray-400 text-sm font-normal underline"
                                        >Need Verify?
                                    </AppLink>
                                </div>
                                <div>
                                    <AppLink
                                        :to="{ name: 'signup' }"
                                        class="text-violet-500 text-sm font-normal underline"
                                        >Forgot Password?
                                    </AppLink>
                                </div>
                            </div>
                        </div>

                        <div class="mt-32">
                            <PrimarySubmitButton
                                :is-loading="isLoading"
                                name="Login"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div
                class="hidden gradient-bg md:flex flex-col justify-center items-center flex-1 md:px-5 lg:px-10"
            >
                <h1 class="text-4xl font-semibold text-white text-center">
                    Welcome to SBIN!
                </h1>
                <p class="text-sm font-normal text-white text-center mt-1">
                    Don’t have an account?
                </p>
                <AppLink
                    :to="{ name: 'signup' }"
                    class="underline underline-offset-2 mt-3 text-white"
                >
                    Sign Up
                </AppLink>
            </div>
        </section>

        <!-- mobile view-->
        <section class="md:hidden w-full px-9 py-7 bg-white shadow-lg">
            <h1 class="text-3xl" style="color: #212b36">Sign In</h1>
            <div class="my-5">
                <form @submit.prevent="submit">
                    <div class="space-y-5">
                        <div class="flex flex-col">
                            <label
                                class="mb-2.5 text-base font-medium label-color"
                                for="phone"
                                >Phone
                            </label>
                            <input
                                v-model="phone"
                                :class="
                                    errors.phone
                                        ? 'input-error-border'
                                        : 'input-border'
                                "
                                class="rounded-lg py-3 px-4 placeholder:text-slate-400"
                                placeholder="Phone"
                                type="text"
                            />
                            <p v-if="errors.phone" class="validation-error">
                                {{ errors.phone }}
                            </p>
                        </div>

                        <div class="flex flex-col">
                            <label
                                class="mb-2.5 text-base font-medium label-color"
                                for="password"
                                >Password
                            </label>

                            <div class="relative w-full">
                                <div
                                    class="absolute bottom-0 right-0 mr-3 mb-2 text-slate-400"
                                >
                                    <button @click.prevent="showPasswordInput">
                                        <LockOpen
                                            v-if="showPassword"
                                            class="w-5 h-5"
                                        />
                                        <LockClosed v-else class="w-5 h-5" />
                                    </button>
                                </div>
                                <input
                                    v-model="password"
                                    :class="
                                        errors.password
                                            ? 'input-error-border'
                                            : 'input-border'
                                    "
                                    class="rounded-lg py-3 px-4 placeholder:text-slate-400 w-full"
                                    placeholder="Password"
                                    :type="showPassword ? 'text' : 'password'"
                                />
                            </div>
                            <p v-if="errors.password" class="validation-error">
                                {{ errors.password }}
                            </p>
                        </div>

                        <div class="flex items-center">
                            <input
                                class="h-4 w-4 rounded border-gray-300"
                                name="remember-me"
                                type="checkbox"
                            />
                            <label
                                class="ml-3 block text-sm leading-6 label-color"
                                for="remember-me"
                                >Remember me</label
                            >
                        </div>

                        <div class="flex justify-between">
                            <div class="flex items-center">
                                <AppLink
                                    :to="{ name: 'verify' }"
                                    class="text-gray-400 text-sm font-normal underline"
                                    >Need Verify?
                                </AppLink>
                            </div>
                            <div>
                                <AppLink
                                    :to="{ name: 'signup' }"
                                    class="text-violet-500 text-sm font-normal underline"
                                    >Forgot Password?
                                </AppLink>
                            </div>
                        </div>
                    </div>

                    <div class="mt-10">
                        <PrimarySubmitButton
                            :is-loading="isLoading"
                            name="Login"
                        />
                    </div>
                </form>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import AppLink from '@/components/AppLink.vue';
import PrimarySubmitButton from '@/components/forms/PrimarySubmitButton.vue';
import LockClosed from '@/svg/LockClosed.vue';
import LockOpen from '@/svg/LockOpen.vue';

const showPassword = ref(false);
const userStore = useUserStore();
const router = useRouter();
const validationSchema = ref(
    object({
        phone: string()
            .required()
            .min(11)
            .min(11)
            .matches(/^[0-9]+$/, 'Its not a number'),
        password: string().required().min(8),
    }),
);

const { handleSubmit, errors } = useForm({
    validationSchema,
});

const { value: phone } = useField('phone');
const { value: password } = useField('password');

const isLoading = ref(false);

const submit = ref(
    handleSubmit((values) => {
        login(values);
    }),
);

async function login(credentials) {
    isLoading.value = true;
    userStore
        .login(credentials)
        .then(() => {
            isLoading.value = false;
            let to = userStore.redirectTo;
            router.push({ name: to });
        })
        .catch((err) => {
            isLoading.value = false;
            errors.value.password = err.response.data.message;
            console.log(err.response.data.message);
        });
}

function showPasswordInput() {
    showPassword.value = !showPassword.value;
}
</script>
<style>
.gradient-bg {
    background: url('/login-bg.png');
    background-size: cover;
}
</style>