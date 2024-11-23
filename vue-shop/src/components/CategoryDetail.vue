<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { API_URL } from "../const.js";
import { useRoute } from "vue-router";
const category = reactive({});
// const selectedId = ref(null);
// call khi ui render
const route = useRoute()
const id = route.params.id 

onMounted(async () => {
  if(id) {
    const reponse = await axios.get(`${API_URL}/categories/${id}`);
  if (reponse.status === 200) {
    // categories.push(...reponse.data);
    Object.assign(category, {...reponse.data})
  }
  }
});

</script>
<template>
  <div class="container py-5">
    <!-- <p>{{ category.value?.name }}</p> -->
     <div v-if="category">
      <p >name: {{ category.name }}</p>
     </div>
  
  </div>
</template>
<style scoped>
.sale {
  color: red;
  font-weight: bold;
}
.ml-3 {
  margin-left: 1rem;
}
</style>
