<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";

const categories = reactive([]);

// call khi ui render
onMounted(async () => {
  const reponse = await axios.get("http://127.0.0.1:8000/categories");
  if (reponse.status === 200) {
    console.log(reponse.data);
    categories.push(...reponse.data);
  }
});
</script>
<template>
  <div class="container py-5">
    <div class="row">
      <h2>Danh mục sản phẩm</h2>
      <ul class="list-group col-md-6">
        <li class="list-group-item" v-for="item in categories" :key="item.id">
          <a href="#">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.sale {
  color: red;
  font-weight: bold;
}
</style>
