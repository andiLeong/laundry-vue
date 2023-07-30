import {ref} from "vue";

export default function useFetchOrder(id) {

    const order = ref(null);
    const error = ref(null);
    const loading = ref(false);

    function fetch() {
        axios.get(`api/admin/order/${id}`)
            .then(({data}) => order.value = data)
            .catch(e => error.value = e);
    }

    fetch();
    return {
        loading,
        order,
        error
    }
}