import {defineStore} from 'pinia';

export const useNavigationStore = defineStore({
    id: 'navigation',
    state: () => ({
        show: false,
    }),
    getters: {},
    actions: {
        apply(show = true) {
            this.show = show;
        },
    },
});