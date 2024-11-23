<template>
  <div class="container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3 mt-3">
        <label for="email" class="form-label">Username:</label>
        <input
          v-model="email"
          type="text"
          class="form-control"
          id="username"
          placeholder="Enter email"
          name="email"
        />
      </div>
      <div class="mb-3">
        <label for="pwd" class="form-label">Password:</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          id="pwd"
          placeholder="Enter password"
          name="pswd"
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
      <p v-if="isLogin" class="text-success">Login success</p>
      <p v-else class="text-danger">Login failed</p>
      <RouterLink class="nav-link" to="/register">Đăng ký</RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { API_URL } from "../const.js";
import { useRouter } from 'vue-router'
const isLogin = ref(false);
const email = ref("");
const password = ref("");
const router = useRouter()
const handleSubmit = async () => {
  if (name.value !== "" && password.value !== "") {
    const data = {
      email: email.value,
      password: password.value,
    };
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.name);
      router.push('categories')
    }
  }
};
</script>
