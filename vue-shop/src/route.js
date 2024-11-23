import { createRouter, createWebHistory} from 'vue-router'
import CategoryList from './components/CategoryList.vue'
import CategoryDetail from './components/CategoryDetail.vue'
import Login from './components/Login.vue'
// import Register from './components/Register.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: CategoryList
    },
    {
        path: '/categories',
        name: 'categories',
        component: CategoryList
    },
    {
        path: '/categories/:id',
        name: 'categoryDetails',
        component: CategoryDetail
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(''),
    routes,
  });

  export default router;