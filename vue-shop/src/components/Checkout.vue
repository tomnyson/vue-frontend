<script setup>
import { useStore } from "vuex"; // Import Vuex store
import { computed, ref } from "vue"; // Import computed and ref for reactive properties

// Access the store
const store = useStore();

// Map Vuex getters to computed properties
const cartItems = computed(() => store.getters.cartItems);
const cartTotal = computed(() => store.getters.cartTotal);

// Map Vuex actions to methods
const removeFromCart = (productId) => {
  store.dispatch("removeFromCart", productId);
};

// Reactive form data
const formData = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
});

// Submit form handler
const submitOrder = () => {
  if (
    !formData.value.name ||
    !formData.value.email ||
    !formData.value.phone ||
    !formData.value.address
  ) {
    alert("Please fill out all fields.");
    return;
  }

  // Simulate order submission
  console.log("Order submitted:", {
    customerDetails: formData.value,
    cartItems: cartItems.value,
    total: cartTotal.value,
  });

  // Clear form and cart
  alert("Order placed successfully!");
  formData.value = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };
  store.dispatch("clearCart"); // Assuming a clearCart action is defined in Vuex
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8">
        <div v-if="cartItems.length > 0">
          <h3>Checkout</h3>
          <form @submit.prevent="submitOrder">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                id="name"
                class="form-control"
                v-model="formData.name"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                v-model="formData.email"
              />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Phone</label>
              <input
                type="text"
                id="phone"
                class="form-control"
                v-model="formData.phone"
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Address</label>
              <textarea
                id="address"
                class="form-control"
                rows="3"
                v-model="formData.address"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Place Order</button>
          </form>
        </div>
      </div>
      <div class="col-md-4" style="margin-top: 75px;">
        <div v-if="cartItems.length === 0" class="alert alert-info text-center">
          Cart is empty
        </div>
        <ul v-if="cartItems.length > 0" class="list-group">
          <li
            v-for="item in cartItems"
            :key="item.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{{ item.name }}</h5>
              <p>
                ${{ item.price }} x {{ item.quantity }} = ${{
                  item.price * item.quantity
                }}
              </p>
            </div>
            <button
              @click="removeFromCart(item.id)"
              class="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </li>
        </ul>
        <div v-if="cartItems.length > 0" class="mt-4">
          <div class="d-flex justify-content-end">
            <h4>
              Total: <span class="text-success">${{ cartTotal }}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Checkout Form -->
  </div>
</template>
