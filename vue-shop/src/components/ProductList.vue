<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import axios from "axios";
import { API_URL } from "../const.js";
import { useStore } from 'vuex';
const store = useStore();
const products = reactive([
  // {
  //   id: 1,
  //   name: "Sản phẩm 1",
  //   description: "Mô tả sản phẩm 1, rất chất lượng và đáng mua.",
  //   price: 500000,
  //   image: "http://picsum.photos/id/1/300/300",
  // },
  // {
  //   id: 2,
  //   name: "Sản phẩm 2",
  //   description: "Mô tả sản phẩm 2, chất lượng tốt và giá phải chăng.",
  //   price: 300000,
  //   image: "http://picsum.photos/id/2/300/300",
  // },
  // {
  //   id: 3,
  //   name: "Sản phẩm 3",
  //   description: "Mô tả sản phẩm 3, sản phẩm cao cấp và nhiều tính năng.",
  //   price: 1000000,
  //   image: "http://picsum.photos/id/3/300/300",
  // },
]);

const isDiscount = ref(false);
onMounted(async () => {
  const reponse = await axios.get(`${API_URL}/products`);
  if (reponse.status === 200) {
    console.log(reponse.data);
    products.push(...reponse.data);
  }
});


const addToCart = (product) => {
  alert("add to cart")
  store.dispatch('addToCart', product);
};
const cartItems = computed(() => store.getters.cartItems);
</script>
<template>
  <div class="container py-5">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <!-- Product 1 -->
      <div class="col" v-for="(product, index) in products" :key="index">
        <div  class="card h-100 shadow-sm">
          <img
            src="https://placehold.co/600x400"
            class="card-img-top"
            alt="Product 1"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-muted">
              index: {{ index }} <br/>
             {{ product.description }}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <span :class="['h5', 'mb-0', {sale: product.price > 300000}]">{{ product.price }}vnd</span>
              <button @click="addToCart(product)" class="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
    .sale {
        color: red;
        font-weight: bold;
    }
</style>
