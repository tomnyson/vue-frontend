<template>
  <div class="container my-5">
    <div v-if="blog">
      <h2 class="mb-4">{{ blog.title }}</h2>
      <img :src="blog.image" class="img-fluid mb-4" alt="Blog Image" />
      <p>{{ blog.description }}</p>
    </div>
    <div v-else>
      <p>Loading blog post...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BlogDetail',
  props: ['id'],
  data() {
    return {
      blog: null,
    };
  },
  mounted() {
    this.fetchBlogDetail();
  },
  methods: {
    async fetchBlogDetail() {
      try {
        const response = await axios.get(`https://61a5e3c48395690017be8ed2.mockapi.io/blogs/blogs/${this.id}`);
        this.blog = response.data;
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    },

    setMetaTags() {
      this.$meta().refresh({
        title: this.blog.title,
        meta: [
          { name: 'description', content: this.blog.description },
          { property: 'og:title', content: this.blog.title },
          { property: 'og:description', content: this.blog.description },
          { property: 'og:image', content: this.blog.image },
          { property: 'og:type', content: 'article' },
          { property: 'og:url', content: window.location.href },
        ],
      });
    },

  },
};
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>