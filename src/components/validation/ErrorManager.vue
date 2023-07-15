<template>

    <template v-if="typeof errors === 'string'">
        <Error>
            {{ errors }}
        </Error>
    </template>
    <template v-else>
        <Error
            v-for="(error, index) in errors"
            :key="index"
        >
            {{ error[0] }}
        </Error>
    </template>
</template>

<script setup>
import Error from '@/components/validation/Error.vue';

defineProps(['errors']);
</script>
