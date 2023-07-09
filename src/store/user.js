import {defineStore} from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: null,
    }),
    getters: {
        isLoggedIn: (state) => {
            return state.user !== null || localStorage.getItem('user') !== null;
        },

        isAdmin(state) {
            const user = localStorage.getItem('user');

            if (!this.isLoggedIn || user === null) {
                return false;
            }

            const userData = JSON.parse(user);
            return userData.type === 'admin' || state.user?.type === 'admin';
        },

        isStaff(state) {
            const user = localStorage.getItem('user');

            if (!this.isLoggedIn || user === null) {
                return false;
            }

            const userData = JSON.parse(user);
            return userData.type === 'employee'
                || userData.type === 'admin'
                || state.user?.type === 'employee'
                || state.user?.type === 'admin';
        },

        isCustomer(state) {
            const user = localStorage.getItem('user');

            if (!this.isLoggedIn || user === null) {
                return false;
            }

            const userData = JSON.parse(user);
            return userData.type === 'customer' || state.user?.type === 'customer';
        },
    },
    actions: {
        setUser(user, ref = null) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            if (ref !== null) {
                ref.value = this.user;
            }
            return this.user;
        },

        setUserFromStorage() {
            const user = localStorage.getItem('user');
            if (user) {
                this.setUser(JSON.parse(user));
            }
        },

        logout() {
            localStorage.removeItem('user');
            this.user = null;
            // location.reload();
        },

        async login(credentials) {
            await axios.get('/sanctum/csrf-cookie');
            return await axios.post('/api/login', credentials).then(({data}) => {
                this.setUser(data);
            });
        },

        async fetchUser() {
            return await axios.get('/api/user').then(({data}) => {
                this.setUser(data);
            }).catch(() => this.logout());
        },
    },
});