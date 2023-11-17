<template>
    <AdminLayout>
        <main class="flex-1 pb-8">
            <div class="mt-8">
                <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <h2 class="text-lg font-medium leading-6 text-gray-900">
                        Overview
                    </h2>
                    <StatCollection />

                    <div class="my-11 flex justify-center">
                        <AppTabs id="create-order-tab">
                            <AppTab title="Daily Orders" :active="true">
                                <GroupByDays />
                            </AppTab>
                            <AppTab title="Monthly Orders">
                                <GroupByMonths />
                            </AppTab>
                            <AppTab title="Monthly Margin">
                                <MarginGroupByMonths />
                            </AppTab>
                        </AppTabs>
                    </div>
                </div>
            </div>
        </main>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue';
import StatCollection from '@/components/admin/stats/StatCollection.vue';
import MarginGroupByMonths from '@/components/admin/stats/MarginGroupByMonths.vue';
import GroupByDays from '@/components/admin/stats/GroupByDays.vue';
import GroupByMonths from '@/components/admin/stats/GroupByMonths.vue';
import AppTab from '@/components/AppTab.vue';
import AppTabs from '@/components/AppTabs.vue';
</script>

<style scoped></style>
