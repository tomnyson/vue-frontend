<template>
  <div class="container my-5">
    <h2 class="mb-4">Blog Posts</h2>
    <div class="row">
      <div class="col-md-4" v-for="blog in blogs" :key="blog.id">
        <div class="card mb-4">
          <img :src="blog.image" class="card-img-top" alt="Blog Image" />
          <div class="card-body">
            <h5 class="card-title">{{ blog.title }}</h5>
            <p class="card-text">{{ blog.content }}</p>
            <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }" class="btn btn-primary">
              Read More
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BlogList',
  data() {
    return {
      blogs: [],
    };
  },
  mounted() {
    this.fetchBlogs();
  },
  methods: {
    async fetchBlogs() {
      try {
        const response = await axios.get('https://61a5e3c48395690017be8ed2.mockapi.io/blogs/blogs');
        this.blogs = response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 100%;
}
</style>