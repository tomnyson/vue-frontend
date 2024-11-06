<script setup>
import HelloWorld from './components/HelloWorld.vue'
// import ThongTin from './components/ThongTin.vue'
import Login from './components/Login.vue'
</script>

<template>
  <header>
    <div class="container mt-3">
      <!-- <HelloWorld mon_hoc="Frontend framework" lop="wdk19" /> -->
      <!-- <ThongTin diemyeu ="ngu" diemmanh="gioi" mon_hoc="Frontend framework" lop="wdk19" /> -->
      <Login />
    </div>
  </header>
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
