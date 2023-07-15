<template>
    <div v-if="show">
        <slot/>
    </div>
</template>

<script setup>
import {inject, onMounted, ref, watch} from 'vue';
import {useTabsStore} from '@/store/tabs';

const tabsStore = useTabsStore();
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    active: {
        required: false,
        type: Boolean,
    },
});

const show = ref(false);

const tabId = inject('tab-id');

watch(
    () => tabsStore.selected,
    () => display(),
    {deep: true}
);


onMounted(() => {
    display()
});

function display() {
    let title = tabsStore.tab(tabId);
    if (title === props.title) {
        show.value = true;
    } else {
        show.value = false;
    }
}
</script>
