<script setup>
import HelloWorld from './components/HelloWorld.vue'
// import ThongTin from './components/ThongTin.vue'
import Login from './components/Login.vue'
import ProductList from './components/ProductList.vue';
import CategoryList from './components/CategoryList.vue';
import { useRouter } from 'vue-router'
import {ref, onMounted} from 'vue'
const isLogin = ref(false)
const router = useRouter()
  onMounted(async () => {
    if(localStorage.getItem('token')){
      isLogin.value = true
    }
});

const handleLogout = () => {
  localStorage.removeItem('token')
  isLogin.value = false
}
</script>

<template>
      <!-- <HelloWorld mon_hoc="Frontend framework" lop="wdk19" /> -->
      <!-- <ThongTin diemyeu ="ngu" diemmanh="gioi" mon_hoc="Frontend framework" lop="wdk19" /> -->
      <!-- <Login /> -->
       <!-- <ProductList/> -->
        <!-- <CategoryList/> -->
         <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Home</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <RouterLink class="nav-link" to="/">Home</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/categories">Danh Mục</RouterLink>
      </li>
    <li v-if="!isLogin" class="nav-item">
        <RouterLink class="nav-link"  to="/Login">Đăng Nhập</RouterLink>
     
      </li>
      <li v-if="isLogin" class="nav-item">
        <button  @click="handleLogout" class="btn btn-link">Logout</button>
      </li>  
    </ul>
  </div>
</nav>
<router-view></router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

</style>
