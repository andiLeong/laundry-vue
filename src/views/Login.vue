<template>
    <main
        class="min-h-screen flex justify-center items-center"
        style="background: #f8f9fe"
    >
        <section class="max-w-5xl mx-auto flex rounded-lg shadow-2xl">
            <div class="bg-white px-6 py-9" style="width: 498px">
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
                                    id="phone"
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
                                <input
                                    id="password"
                                    v-model="password"
                                    :class="
                                        errors.password
                                            ? 'input-error-border'
                                            : 'input-border'
                                    "
                                    class="rounded-lg py-3 px-4 placeholder:text-slate-400"
                                    placeholder="Password"
                                    type="password"
                                />
                                <p
                                    v-if="errors.password"
                                    class="validation-error"
                                >
                                    {{ errors.password }}
                                </p>
                            </div>

                            <div class="flex justify-between">
                                <div class="flex items-center">
                                    <input
                                        id="remember-me"
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
                            <button
                                :class="
                                    isLoading ? 'bg-loading-gray' : 'bg-primary'
                                "
                                class="rounded-md text-white w-full py-4"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div
                class="hidden gradient-bg md:flex flex-col justify-center items-center"
                style="width: 541px"
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
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import AppLink from '@/components/AppLink.vue';

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
</script>
<style>
.gradient-bg {
    background: url('/login-bg.png');
    background-size: cover;
}
</style>