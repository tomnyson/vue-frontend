<template>
    <h2>Login</h2>
    <form>
  <div class="mb-3 mt-3">
    <label for="email" class="form-label">Username:</label>
    <input type="text" v-model="username" class="form-control" id="username" placeholder="Enter email" name="email">
  </div>
  <div class="mb-3">
    <label for="pwd" class="form-label">Password:</label>
    <input type="password" v-model="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
  </div>
  <button @click.prevent="login" type="button" class="btn btn-primary">Submit</button>
  <p v-if="isLogin" class="text-success">Login success</p>
  <p v-else class="text-danger">Login failed</p>
</form>

</template>

<script setup>
import { ref, reactive } from 'vue';

const isLogin = ref(false);
const username = ref('');
const password = ref('');

const login = () => {
    console.log(username);
    console.log(password);
    
    if(username.value == "admin" && password.value == "123456") {
        isLogin.value = true;
    } else {
        isLogin.value = false;
    }
}

</script>