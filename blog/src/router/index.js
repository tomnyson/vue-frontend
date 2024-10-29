import { createRouter, createWebHistory } from 'vue-router';
import BlogList from '../views/BlogList.vue';
import BlogDetail from '../views/BlogDetail.vue';

const routes = [
  {
    path: '/',
    name: 'BlogList',
    component: BlogList,
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;