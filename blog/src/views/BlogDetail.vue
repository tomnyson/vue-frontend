<template>
  <div class="container my-5">
    <div v-if="blog">
      <h1 class="mb-4">{{ blog.title }}</h1>
      <img 
        :src="blog.image" 
        :alt="blog.title"
        class="img-fluid mb-4"
        :width="imageWidth"
        :height="imageHeight"
        loading="lazy"
      />
      <article>
        <p>{{ blog.description }}</p>
        <meta itemprop="datePublished" :content="blog.publishDate" />
        <meta itemprop="author" :content="blog.author" />
      </article>
    </div>
    <div v-else>
      <p>Loading blog post...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useHead } from '@vueuse/head';
import axios from 'axios';

export default {
  name: 'BlogDetail',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const blog = ref(null);
    const imageWidth = ref(1200);
    const imageHeight = ref(630);
    const siteUrl = window.location.origin;
    const siteName = 'Your Site Name';

    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(`https://61a5e3c48395690017be8ed2.mockapi.io/blogs/blogs/${props.id}`);
        blog.value = response.data;
        updateMetaTags();
        addJsonLd();

        // Dispatch render-event to notify PrerenderSPAPlugin that content is ready
        document.dispatchEvent(new Event('render-event'));
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    const updateMetaTags = () => {
      if (!blog.value) return;

      const fullImageUrl = blog.value.image.startsWith('http') 
        ? blog.value.image 
        : `${siteUrl}${blog.value.image}`;

      const truncatedDescription = blog.value.description.length > 200 
        ? `${blog.value.description.substring(0, 197)}...` 
        : blog.value.description;

      useHead({
        title: `${blog.value.title} | ${siteName}`,
        meta: [
          { name: 'description', content: truncatedDescription },
          { name: 'author', content: blog.value.author },
          
          { property: 'og:site_name', content: siteName },
          { property: 'og:title', content: blog.value.title },
          { property: 'og:description', content: truncatedDescription },
          { property: 'og:image', content: fullImageUrl },
          { property: 'og:image:width', content: imageWidth.value.toString() },
          { property: 'og:image:height', content: imageHeight.value.toString() },
          { property: 'og:type', content: 'article' },
          { property: 'og:url', content: `${siteUrl}/blog/${props.id}` },
          { property: 'og:locale', content: 'en_US' },
          { property: 'article:published_time', content: blog.value.publishDate },
          { property: 'article:modified_time', content: blog.value.updateDate },
          { property: 'article:author', content: blog.value.author },
          
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: blog.value.title },
          { name: 'twitter:description', content: truncatedDescription },
          { name: 'twitter:image', content: fullImageUrl }
        ],
        link: [
          { rel: 'canonical', href: `${siteUrl}/blog/${props.id}` }
        ]
      });
    };

    const addJsonLd = () => {
      if (!blog.value) return;

      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': blog.value.title,
        'image': blog.value.image,
        'author': { '@type': 'Person', 'name': blog.value.author },
        'publisher': {
          '@type': 'Organization',
          'name': siteName,
          'logo': { '@type': 'ImageObject', 'url': `${siteUrl}/logo.png` }
        },
        'datePublished': blog.value.publishDate,
        'dateModified': blog.value.updateDate,
        'description': blog.value.description,
        'mainEntityOfPage': { '@type': 'WebPage', '@id': `${siteUrl}/blog/${props.id}` }
      });
      document.head.appendChild(script);
    };

    onMounted(() => {
      fetchBlogDetail();
    });

    watch(blog, () => {
      if (blog.value) {
        updateMetaTags();
        addJsonLd();
      }
    }, { deep: true });

    return {
      blog,
      imageWidth,
      imageHeight,
    };
  }
};
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>