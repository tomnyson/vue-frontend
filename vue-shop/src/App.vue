<script setup>
import HelloWorld from './components/HelloWorld.vue'
// import ThongTin from './components/ThongTin.vue'
import Login from './components/Login.vue'
import ProductList from './components/ProductList.vue';
import CategoryList from './components/CategoryList.vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import {ref, onMounted, computed} from 'vue'
const isLogin = ref(false)
const router = useRouter()
const store = useStore();

const cartItems = computed(() => store.getters.cartItems);

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
  <div class="container-fluid">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <!-- Left-aligned items -->
        <RouterLink class="navbar-brand" to="/">Home</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu items -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <!-- Left-aligned links -->
            <li class="nav-item">
              <RouterLink class="nav-link" to="/categories">Danh Mục</RouterLink>
            </li>
          </ul>

          <!-- Right-aligned links -->
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/carts">Carts [{{ cartItems.length || 0 }}]</RouterLink>
            </li>
            <li v-if="!isLogin" class="nav-item">
              <RouterLink class="nav-link" to="/login">Đăng Nhập</RouterLink>
            </li>
            <li v-else class="nav-item">
              <button @click="handleLogout" class="btn btn-link nav-link">Logout</button>
            </li>
            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <router-view />

    <!-- Footer -->
    <footer class="footer bg-light text-center py-3">
      <div class="container">
        <p class="mb-0">© 2024 My Shop. All rights reserved.</p>
        <p class="mb-0">
          <a href="/privacy-policy" class="text-decoration-none">Privacy Policy</a> |
          <a href="/terms" class="text-decoration-none">Terms of Service</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-top: 50px;
  background-color: #f8f9fa;
}

</style>
