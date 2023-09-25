<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Errors from '@/model/Errors.js';

const router = useRouter();
const error = ref(null);
const punching = ref(false);

function punchIn() {
    punching.value = true;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            fire(position);
        },
        (error) => {
            punching.value = false;
            console.log(error);
        },
    );
}

function punchOut() {
    punching.value = true;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            fire(position, 'out');
        },
        (error) => {
            punching.value = false;
            console.log(error);
        },
    );
}

function fire(position, type = 'in') {
    axios
        .post('api/admin/attendance', {
            type: type === 'in' ? 0 : 1,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
        })
        .then(() =>
            router.push({
                name: 'admin-attendance',
            }),
        )
        .catch((error) => {
            let err = new Errors(error);
            errors.value = err.handle();
        })
        .finally(() => {
            punching.value = false;
        });
}
</script>

<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <section class="max-w-6xl mx-auto mt-40 flex justify-center">
                <div class="flex flex-col space-y-10">
                    <p v-if="error" class="validation-error">error occurred</p>
                    <button
                        @click.prevent="punchIn"
                        :disabled="punching"
                        :class="
                            punching
                                ? 'bg-slate-400 text-white cursor-not-allowed'
                                : 'bg-sky-500 text-white'
                        "
                        class="py-3 px-2 rounded text-sm tracking-tight"
                    >
                        Punch In
                    </button>
                    <button
                        @click.prevent="punchOut"
                        :disabled="punching"
                        :class="
                            punching
                                ? 'bg-slate-400 text-white cursor-not-allowed'
                                : 'bg-sky-500 text-white'
                        "
                        class="bg-slate-500 text-slate-200 py-3 px-2 rounded text-sm tracking-tight"
                    >
                        Punch Out
                    </button>
                </div>
            </section>
        </main>
    </AdminLayout>
</template>

<style scoped></style>