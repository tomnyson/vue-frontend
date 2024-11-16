<script setup>
import HelloWorld from './components/HelloWorld.vue'
// import ThongTin from './components/ThongTin.vue'
import Login from './components/Login.vue'
import ProductList from './components/ProductList.vue';
import CategoryList from './components/CategoryList.vue';
</script>

<template>
      <!-- <HelloWorld mon_hoc="Frontend framework" lop="wdk19" /> -->
      <!-- <ThongTin diemyeu ="ngu" diemmanh="gioi" mon_hoc="Frontend framework" lop="wdk19" /> -->
      <!-- <Login /> -->
       <!-- <ProductList/> -->
        <!-- <CategoryList/> -->
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
