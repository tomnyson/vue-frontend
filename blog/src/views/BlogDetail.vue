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
        <!-- Add structured data for article content -->
        <!-- <meta itemProp="datePublished" :content="blog.publishDate" /> -->
        <meta itemProp="author" :content="blog.title" />
      </article>
    </div>
    <div v-else>
      <p>Loading blog post...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useHead } from '@vueuse/head';
import axios from 'axios';

// Props
const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

// State
const blog = ref(null);
const imageWidth = ref(800);
const imageHeight = ref(600);

// Methods
const fetchBlogDetail = async () => {
  try {
    const response = await axios.get(`https://61a5e3c48395690017be8ed2.mockapi.io/blogs/blogs/${props.id}`);
    blog.value = response.data;
    updateMetaTags();
  } catch (error) {
    console.error("Error fetching blog details:", error);
  }
};

// SEO Meta Tags using useHead
const updateMetaTags = () => {
  if (!blog.value) return;

  useHead({
    title: `${blog.value.title} | Your Site Name`,
    meta: [
      {
        name: 'description',
        content: blog.value.description
      },
      {
        name: 'author',
        content: blog.value.author
      },
      {
        property: 'og:title',
        content: blog.value.title
      },
      {
        property: 'og:description',
        content: blog.value.description
      },
      {
        property: 'og:image',
        content: blog.value.image
      },
      {
        property: 'og:type',
        content: 'article'
      },
      {
        property: 'og:url',
        content: window.location.href
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: blog.value.title
      },
      {
        name: 'twitter:description',
        content: blog.value.description
      },
      {
        name: 'twitter:image',
        content: blog.value.image
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: window.location.href
      }
    ]
  });
};

// Add JSON-LD structured data
const addJsonLd = () => {
  if (!blog.value) return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': blog.value.title,
    'image': blog.value.image,
    'author': {
      '@type': 'Person',
      'name': blog.value.author
    },
    'datePublished': blog.value.publishDate,
    'dateModified': blog.value.updateDate,
    'description': blog.value.description,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': window.location.href
    }
  });
  document.head.appendChild(script);
};

// Lifecycle hooks
onMounted(() => {
  fetchBlogDetail();
});

// Watch for changes in blog data
watch(blog, () => {
  if (blog.value) {
    updateMetaTags();
    addJsonLd();
  }
}, { deep: true });
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
  display: block; /* Prevents layout shift */
}

/* Add print styles for better accessibility */
@media print {
  .container {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  img {
    max-width: 100%;
    page-break-inside: avoid;
  }
}
</style>