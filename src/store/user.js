import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: null,
    }),
    getters: {
        isLoggedIn: (state) => {
            return state.user !== null;
            // return state.user !== null || localStorage.getItem('user') !== null;
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
            if (!this.isLoggedIn) {
                return false;
            }

            return ['employee', 'admin'].includes(state.user.type);
        },

        isCustomer(state) {
            if (!this.isLoggedIn) {
                return false;
            }

            return state.user.type === 'customer';
        },

        redirectTo(state) {
            return this.isCustomer ? 'home' : 'admin-home';
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

        logoutFromLocal() {
            localStorage.removeItem('user');
            this.user = null;
        },

        logout() {
            return axios
                .post('/api/logout')
                .then(() => this.logoutFromLocal())
                .catch(() => this.logoutFromLocal());
        },

        async login(credentials) {
            await axios.get('/sanctum/csrf-cookie');
            return await axios
                .post('/api/login', credentials)
                .then(({ data }) => {
                    this.setUser(data);
                });
        },

        fetchUser(app, router) {
            axios
                .get('/api/user')
                .then((response) => {
                    this.setUser(response.data);
                })
                .catch((error) => {
                    this.logoutFromLocal();
                })
                .finally(() => {
                    this.setUser({
                        id: 1,
                        type: 'admin',
                        phone: '09272714285',
                        first_name: 'anthony',
                    });
                    app.use(router).mount('#app');
                });
        },
    },
});
