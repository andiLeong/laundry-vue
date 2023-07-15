<template>
    <div>
        <div class="sm:hidden">
            <label for="tabs" class="sr-only">Select a tab</label>
            <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
            <select
                id="tabs"
                name="tabs"
                class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            >
                <option>My Account</option>
                <option>Company</option>
                <option selected>Team Members</option>
                <option>Billing</option>
            </select>
        </div>

        <div class="hidden sm:block">
            <nav class="flex space-x-4" aria-label="Tabs">
                <a
                    v-for="(tab, index) in tabs"
                    :key="index"
                    href="#"
                    :class="{
                        'bg-sky-100 text-sky-700':
                            selectedTitle === tab.props.title,
                        'text-gray-500 hover:text-gray-700':
                            selectedTitle !== tab.props.title,
                    }"
                    class="rounded-md px-3 py-2 text-sm font-medium"
                    @click.prevent="selectTab(tab.props.title)"
                >
                    {{ tab.props.title }}
                </a>
            </nav>
        </div>
    </div>

    <!--    <ul class="flex">-->
    <!--        <li v-for="(tab, index) in tabs" :key="index">-->
    <!--            <button-->
    <!--                :class="{-->
    <!--                    'bg-blue-500': selectedTitle === tab.props.title,-->
    <!--                    'bg-gray-500': selectedTitle !== tab.props.title,-->
    <!--                }"-->
    <!--                class="py-2 px-4 text-white"-->
    <!--                @click.prevent="selectTab(tab.props.title)"-->
    <!--            >-->
    <!--                {{ tab.props.title }}-->
    <!--            </button>-->
    <!--        </li>-->
    <!--    </ul>-->
    <slot></slot>
</template>

<script setup>
import {onMounted, provide, ref, useSlots, watch} from 'vue';
import {useTabsStore} from '@/store/tabs';

const props = defineProps({
    id: {
        required: true,
        type: String,
    },
});

provide('tab-id', props.id);
const selectedTitle = ref();
const tabs = ref();
const slots = useSlots();
const tabsStore = useTabsStore();

onMounted(() => {
    tabsStore.select({
        id: props.id,
        title: getTabTitle(),
    });
    tabs.value = slots.default();
    selectedTitle.value = tabsStore.tab(props.id)
});

watch(
    () => tabsStore.selected,
    () => {
        selectedTitle.value = tabsStore.tab(props.id);
    },
    {deep: true},
);

function getTabTitle() {
    if (tabsStore.selected.length > 0) {
        return tabsStore.selected[0].title;
    }
    let defaultActive = slots.default().filter((tab) => tab.props.active);
    if (defaultActive.length > 0) {
        return defaultActive[0].props.title;
    }
    return slots.default()[0].props.title;
}

function selectTab(title) {
    tabsStore.select({
        id: props.id,
        title,
    });
}
</script>
