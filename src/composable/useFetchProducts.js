import {ref} from "vue";

export default function useFetchProducts() {

    const products = ref([]);
    const error = ref(null);
    const loading = ref(false);

    function fetch() {
        axios.get('api/product?all=1')
            .then(({data}) => products.value = data)
            .catch(e => error.value = e);
    }

    fetch();
    return {
        loading,
        products,
        error
    }
}