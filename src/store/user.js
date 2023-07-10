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

        firstName: (state) => {
            return state.user.first_name;
        },

        isAdmin(state) {
            if (!this.isLoggedIn) {
                return false;
            }

            return state.user.type === 'admin';
        },

        isStaff(state) {
            if (!this.isLoggedIn){
                return false;
            }

            return state.user.type === 'employee' || state.user.type === 'admin';
        },

        isCustomer(state) {
            if (!this.isLoggedIn){
                return false;
            }

            return state.user.type === 'customer';
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

        logoutFromLocal() {
            localStorage.removeItem('user');
            this.user = null;
        },

        logout() {
            return axios.post('/api/logout')
                .then(() => this.logoutFromLocal())
                .catch(() => this.logoutFromLocal());
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
            }).catch(() => {
                this.logoutFromLocal()
            });
        },
    },
});