<template>
    <label>label outside form</label>

    <form>
        <div class="space-y-3 my-6">
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-2">
                    <label class="form-label"
                        >With form label class without for attribute</label
                    >
                    <select class="field form-select mt-1">
                        <option value="1">Cash</option>
                        <option value="2">Gcash</option>
                    </select>
                </div>

                <div class="sm:col-span-2">
                    <label class=""> original label no class no for </label>
                </div>

                <div class="sm:col-span-2">
                    <label class="" for="dummy">
                        original label no class has fot
                    </label>
                    <input type="text" id="dummy" />
                </div>

                <div class="sm:col-span-2">
                    <p>paragraph tag</p>
                    <input type="text" id="paragraph" />
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    services: {
        type: Array,
        default: [],
    },
});

const router = useRouter();
</script>

<style scoped></style>
