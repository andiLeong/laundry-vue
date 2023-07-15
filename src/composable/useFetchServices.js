import {ref} from "vue";

export default function useFetchServices() {

    const services = ref([]);
    const error = ref(null);
    const loading = ref(false);

    function fetchService() {
        axios.get('api/service')
            .then(({data}) => services.value = data)
            .catch(e => error.value = e);
    }

    fetchService();
    return {
        loading,
        services,
        error
    }
}