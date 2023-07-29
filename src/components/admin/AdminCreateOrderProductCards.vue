<template>

    <MountedTeleport to="#products-selection">
        <label class="form-label">Products</label>
        <select
            class="field form-select mt-1"
            @change="selectProduct"
        >
            <option disabled value selected>
                please select
            </option>
            <option
                v-for="product in products"
                :value="product.id"
                :key="product.id"
            >
                {{ product.name }}
            </option>
        </select>
    </MountedTeleport>

    <div
        v-for="(product,index) in product_ids"
        :key="index"
        class="sm:col-span-2 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
        <CreateOrderProductCard
            :product="product"
            :index="index"
            @updateProduct="setProduct"
            @productRemoved="removeProduct"
        />
    </div>
</template>

<script setup>
import CreateOrderProductCard from '@/components/admin/CreateOrderProductCard.vue'
import useFetchProducts from "@/composable/useFetchProducts.js";
import {ref, watch} from "vue";
import MountedTeleport from '@/components/MountedTeleport.vue';

const emit = defineEmits(['productUpdated']);
const {products, error} = useFetchProducts();
const product_ids = ref([]);
const selectedProductIds = ref([]);

watch(product_ids, (newValue) => {
        console.log('fire product updated event')
        emit('productUpdated', newValue)
    }, {deep: true}
)

function selectProduct(e) {
    let productId = parseInt(e.target.value);
    if (!productIdIsSelected(productId)) {
        let product = products.value.filter((p) => {
            return p.id === productId;
        })[0]
        product.quantity = 1
        product.originalPrice = product.price
        product_ids.value.push(product);
        selectedProductIds.value.push(productId)
    }
}

function productIdIsSelected(id) {

    return selectedProductIds.value.includes(id);
    let filtered = product_ids.value.filter((product) => {
        return product.id === id
    });
    return filtered.length > 0;
}

function setProduct(product, index) {

    let oldProduct = product_ids.value[index]
    oldProduct.stock = product[0]
    oldProduct.quantity = product[1]
    oldProduct.price = product[2]

    product_ids.value[index] = oldProduct
}

function removeProduct(index, id) {
    product_ids.value = product_ids.value.filter((product, key) => {
        return key !== index
    })

    selectedProductIds.value = selectedProductIds.value.filter((prodId) => {
        return prodId !== id
    })
}
</script>

<style scoped>

</style>