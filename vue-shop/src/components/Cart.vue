<script setup>
import { useStore } from 'vuex'; // Import Vuex store
import { computed } from 'vue'; // Import computed for reactive properties

// Access the store
const store = useStore();

// Map Vuex getters to computed properties
const cartItems = computed(() => store.getters.cartItems);
const cartTotal = computed(() => store.getters.cartTotal);

// Map Vuex actions to methods
const removeFromCart = (productId) => {
  store.dispatch('removeFromCart', productId);
};

</script>

<template>
  {{ console.log('cartItems', cartItems) }}
  <div class="container mt-5">
    <h2 class="text-center mb-4">Shopping Cart</h2>
    <div v-if="cartItems.length === 0" class="alert alert-info text-center">
      Cart is empty
    </div>
    <ul v-if="cartItems.length > 0" class="list-group">
      <li v-for="item in cartItems" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h5>{{ item.name }}</h5>
          <p>
            ${{ item.price }} x {{ item.quantity }} = ${{ item.price * item.quantity }}
          </p>
        </div>
        <button @click="removeFromCart(item.id)" class="btn btn-danger btn-sm">
          Remove
        </button>
      </li>
    </ul>
    <div v-if="cartItems.length > 0" class="mt-4">
      <div class="d-flex justify-content-end">
        <h4>Total: <span class="text-success">{{ cartTotal }} $</span></h4>
      </div>
    </div>
    <RouterLink to="checkout">Checkout</RouterLink>
  </div>
</template>