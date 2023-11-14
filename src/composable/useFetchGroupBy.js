import { ref } from 'vue';
import Errors from '@/model/Errors.js';

export default function useFetchGroupBy(query) {
    const orderCount = ref([]);
    const orderTotalAmount = ref([]);
    const avgAmount = ref(null);
    const avgCount = ref(null);
    const margins = ref([]);
    const labels = ref([]);
    const errors = ref(null);
    const loading = ref(false);

    const fetch = query => {
        loading.value = true;
        orderCount.value = [];
        axios
            .get(`/api/admin/order-stats?${query}`)
            .then(({ data }) => {
                if (data.data) {
                    labels.value = data.data.map(order => order.dt);
                    orderTotalAmount.value = data.data.map(
                        order => order.order_total_amount,
                    );
                    orderCount.value = data.data.map(
                        order => order.order_count,
                    );

                    avgAmount.value = data.amount_avg;
                    avgCount.value = data.order_avg;
                } else {
                    margins.value = data.map(order => order.margin);
                    labels.value = data.map(order => order.dt);
                }
            })
            .catch(error => {
                let err = new Errors(error);
                errors.value = err.handle();
            })
            .finally(() => {
                loading.value = false;
            });
    };

    fetch(query);
    return {
        loading,
        errors,
        avgAmount,
        avgCount,
        orderCount,
        orderTotalAmount,
        labels,
        margins,
        fetch,
    };
}
