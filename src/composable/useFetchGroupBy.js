import {ref} from "vue";
import Errors from "@/model/Errors.js";

export default function useFetchGroupBy(query) {

    const orderCount = ref([]);
    const orderTotalAmount = ref([]);
    const margins = ref([]);
    const labels = ref([]);
    const errors = ref(null);
    const loading = ref(false);

    const fetch = (query) => {
        loading.value = true
        orderCount.value = []
        axios
            .get(`/api/admin/order-stats?${query}`)
            .then(({data}) => {
                labels.value = data.map((order) => {
                    return order.dt;
                });
                orderTotalAmount.value = data.map((order) => {
                    return order?.order_total_amount;
                });
                orderCount.value = data.map((order) => {
                    return order?.order_count;
                });

                margins.value = data.map((order) => {
                    return order?.margin;
                });
            })
            .catch((error) => {
                let err = new Errors(error);
                errors.value = err.handle();
            })
            .finally(() => {
                loading.value = false
            });
    }

    fetch(query);
    return {
        loading,
        errors,
        orderCount,
        orderTotalAmount,
        labels,
        margins,
        fetch,
    }
}