<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { API_URL } from "../const.js";
const categories = reactive([]);
const name = ref("aaa");
const selectedId = ref(null);
// call khi ui render
onMounted(async () => {
  const reponse = await axios.get(`${API_URL}/categories`);
  if (reponse.status === 200) {
    console.log(reponse.data);
    categories.push(...reponse.data);
  }
});

const handleSubmit = async () => {
  if (name.value !== "") {
    const data = {
      name: name.value,
    };
    if (selectedId.value) {
      const reponse = await axios.put(
        `${API_URL}/categories/${selectedId.value}`,
        data
      );
      if (reponse.status === 200) {
        alert("cap nhat thanh cong");
        const index = categories.findIndex(
          (item) => item.id === selectedId.value
        );
        if (index !== -1) {
          categories[index] = reponse?.data?.data;
        }
      }
    } else {
      const reponse = await axios.post(`${API_URL}/categories`, data);
      if (reponse.status === 201) {
        alert("thêm thành công");
        console.log(reponse.data);
        categories.push(reponse?.data?.data);
        name.value = "";
      }
    }
    // post

    //update
  }
};
const handleDelete = async (id) => {
  if (confirm("bạn có muốn xoá không ?") == true) {
    const reponse = await axios.delete(`${API_URL}/categories/${id}`);
    if (reponse.status === 200) {
      alert("xóa thành công");
      console.log(reponse.data);
      // categories = categories.filter((item) => item.id !== id);
      const newCategory = categories.filter((item) => item.id !== id);
      categories.splice(0, categories.length, ...newCategory);
    }
  }
};

const handleEdit = async (item) => {
  selectedId.value = item.id;
  name.value = item.name;
};
</script>
<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-4">
        <h2>Thêm sản phẩm</h2>
        <form @submit.prevent="handleSubmit" class="d-flex">
          <input
            :class="{ 'is-invalid': !name }"
            type="text"
            class="form-control"
            name="name"
            v-model="name"
            placeholder="Tên danh mục"
          />
          <button class="btn btn-primary ml-3">Save</button>
        </form>
      </div>
      <div class="col-md-8">
        <h2>Danh mục sản phẩm</h2>
        name: {{ name }}
        <ul class="list-group col-md-6">
          <li
            class="list-group-item d-flex justify-content-between"
            v-for="item in categories"
            :key="item.id"
          >
            <a href="#">{{ item.name }}</a>
            <div>
              <button
                @click="handleDelete(item.id)"
                class="btn btn-danger ml-3"
              >
                xoá
              </button>
              <button @click="handleEdit(item)" class="btn btn-info ml-3">
                sửa
              </button>
              <router-link class="ml-3" :to="`/categories/${item.id}`">Hiển thị</router-link>
            </div>
          </li>
        </ul>
      </div>
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
