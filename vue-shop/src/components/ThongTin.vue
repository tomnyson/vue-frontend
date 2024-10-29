<script setup>
defineProps({
  mon_hoc: {
    type: String,
    required: true
  },
  lop: {
    type: String,
  }
  ,mssv: {
    typeof: String,
  }
  ,tuoi: {
    typeof: String,
  }
  ,sothich: {
    typeof: String,
  }
  ,diemmanh: {
    typeof: String,
  }
  ,diemyeu: {
    typeof: String,
  }
})
</script>

<template>
  <h1>môn học: {{ mon_hoc }}</h1> <br/>
  <h2>lớp: {{ lop }}</h2>
  <h2>mss: {{ mssv }}</h2>
  <h2>tuổi: {{ tuoi }}</h2>
  <h2>sở thích: {{ sothich }}</h2>
  <h2>điểm mạnh: {{ diemmanh }}</h2>
  <h2>điểm yếu: {{ diemyeu }}</h2>
</template>

<style scoped>

</style>
