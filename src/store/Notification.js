import { defineStore } from 'pinia';

export const useNotificationStore = defineStore({
    id: 'notification',
    state: () => ({
        name: '',
        show: false,
        title: 'notification title',
        message: 'message',
    }),
    getters: {},
    actions: {},
});
