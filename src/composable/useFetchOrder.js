import { ref } from 'vue';

export default function useFetchOrder(endpoint) {
    const order = ref(null);
    const error = ref(null);
    const loading = ref(false);

    function fetch() {
        loading.value = true;
        axios
            .get(endpoint)
            .then(({ data }) => (order.value = data))
            .catch(e => (error.value = e))
            .finally(() => (loading.value = false));
    }

    fetch();
    return {
        loading,
        order,
        error,
    };
}
