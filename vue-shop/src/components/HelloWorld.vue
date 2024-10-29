<script setup>
defineProps({
  mon_hoc: {
    type: String,
    required: true
  },
  lop: {
    type: String,
  }
})
</script>

<template>
  <h1>{{ mon_hoc }}</h1> <br/>
  <h2>{{ lop }}</h2>
</template>

<style scoped>

</style>
