import {useUserStore} from "@/store/user.js";
import router from "@/router/index.js";

class Errors {

    constructor(err = null) {
        this.error = err;
    }

    handle() {
        let status = this.error.response?.status;
        let message = this.error.response?.data?.message;

        if (status === 401 || status === 419) {
            useUserStore().logoutFromLocal();
            return router.push({name: 'login'});
        }

        if (status === 422) {
            return this.error.response.data.errors;
        }
        return message;
    }
}

export default Errors;