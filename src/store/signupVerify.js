import { defineStore } from 'pinia';

export const useSignVerifyStore = defineStore({
    id: 'signupVerify',
    state: () => ({
        phone: null,
    }),
    getters: {
        needVerify(state) {
            return state.phone !== null;
        },
        getPhone(state) {
            return state.phone;
        },
    },
    actions: {
        setPhone(phone) {
            this.phone = phone;
        },
    },
});
