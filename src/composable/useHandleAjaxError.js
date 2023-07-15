import {useUserStore} from '@/store/user';
import router from '@/router';
import {ref} from "vue";

export default function useHandleAjaxError(error = null) {
    let err = error;
    let status = err.response.status;
    let message = err.response?.data?.message;

    const validationErrors = ref(null);
    const forbiddenErrors = ref(null);
    const otherErrors = ref(null);

    if (status === 401 || status === 419) {
        useUserStore().logoutFromLocal();
        return router.push({name: 'login'});
    }

    if (status === 403) {
        forbiddenErrors.value = message
    } else if (status === 442) {
        validationErrors.value = message
    } else {
        otherErrors.value = message
    }

    function updateError(e) {
        err = e;
    }

    return {
        updateError,
        forbiddenErrors,
        validationErrors,
        otherErrors,
    }
}