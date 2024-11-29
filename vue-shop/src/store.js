// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const item = state.cart.find((i) => i.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  actions: {
    addToCart({ commit }, product) {
      console.log('Action: addToCart');
      console.log('Payload:', product);
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, productId) {
      console.log('Action: addToCart');
      console.log('Payload:', productId);
      commit('REMOVE_FROM_CART', productId);
    },
  },
  getters: {
    
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    products(state) {
      return state.products;
    },
    cartItems(state) {
      return state.cart
    }
  },
});