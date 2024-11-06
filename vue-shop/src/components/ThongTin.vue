<script setup>

import { ref, reactive } from 'vue';
defineProps({
  mon_hoc: {
    type: String,
    required: true,
  },
  lop: {
    type: String,
  },
  mssv: {
    typeof: String,
  },
  tuoi: {
    typeof: String,
  },
  sothich: {
    typeof: String,
  },
  diemmanh: {
    typeof: String,
  },
  diemyeu: {
    typeof: String,
  },
});
// string, number, boolean
const avatar = ref("https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-003.jpg")
const status = ref("looking for ...")
const dtb = ref(9.0)
const isDau = ref(true)
// dung cho truong hop array, object
const student = reactive({
  name: 'nguyen van a',
  class: 'wdk19',
  status: 'buon qua !!'
})


const changeName = () => {
  let newname = prompt ("edit name")
  if(newname !==null) {
    student.name = newname
  }

}

const changeAvatar = () => {
  let newStatus = prompt ("edit image")
  if(newStatus !==null) {
    avatar.value = newStatus
  }

}

</script>

<template>
  <div class="container">
 
    <div class="card card-custom">
      <img class="card-img-top" :src="avatar" @click="changeAvatar"/>
      <div class="card-body">
      <h1 class="card-title">Thông tin cá nhân</h1>
      <input class="form-control" name="status" type="text" v-model="status"/>
      <button @click="changeStatus" type="button" class="btn btn-primary mt-5 mb-5">Edit Status</button>
      <p class="alert text-success">{{ status }}</p>
      <h2>tên: {{ student.name }}</h2>
      <button @click="changeName" type="button" class="btn btn-primary mt-5 mb-5">Edit name</button>
      <h2>môn học: {{ mon_hoc }}</h2>
      <br />
      <h2>lớp: {{ lop }}</h2>
      <h2>mss: {{ mssv }}</h2>
      <h2>tuổi: {{ tuoi }}</h2>
      <h2>sở thích: {{ sothich }}</h2>
      <h2>điểm mạnh: {{ diemmanh }}</h2>
      <h2>điểm yếu: {{ diemyeu }}</h2>
    </div>
    </div>
    <h1>v-if and v-show</h1>
      <p class="text-success" v-if="isDau">đã pass môn</p>
      <p class="text-danger" v-if="!isDau">đã failed</p>
      
  <h1> điểm trung bình</h1>
  <input class="form-control" name="dtb" type="number" min="0" max="10" v-model.number="dtb"/>
  <span v-if="dtb<=3.0">yếu</span>
  <span v-else-if="dtb<=5.0">tb</span>
  <span v-else-if="dtb<=7.0">khá</span>
  <span v-else-if="dtb<=8.0">giỏi</span>
  <span v-else>xuất sắc</span> <br/>
  <h4 v-show="isDau">Show thong tin dau</h4>
  </div>


</template>

  
<style scoped>
  .card-custom {
    width: 50%;
  }
  .card-custom img {
  }
</style>
