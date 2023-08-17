import { ref } from 'vue';

export default function useFetchServices() {
    const services = ref([]);
    const error = ref(null);
    const loading = ref(false);

    function fetchService() {
        loading.value = true;
        axios
            .get('api/service')
            .then(({ data }) => (services.value = data))
            .catch((e) => (error.value = e))
            .finally(() => (loading.value = false));
    }

    fetchService();
    return {
        loading,
        services,
        error,
    };
}
