import { createRouter, createWebHistory} from 'vue-router'
import CategoryList from './components/CategoryList.vue'
import CategoryDetail from './components/CategoryDetail.vue'
import Login from './components/Login.vue'
import ProductList from './components/ProductList.vue'
// import Register from './components/Register.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: ProductList,
        meta: { requiredLogin: false }
    },
    {
        path: '/categories',
        name: 'categories',
        component: CategoryList,
        meta: { requiredLogin: true }
    },
    {
        path: '/categories/:id',
        name: 'categoryDetails',
        component: CategoryDetail,
        meta: { requiredLogin: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiredLogin: false }
    },
]

const router = createRouter({
    history: createWebHistory(''),
    routes,
  });

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    console.log("token: " + token);
    console.log("to.meta.requiredLogin: " + to.meta.requiredLogin);
    if(to.meta.requiredLogin && !token){
        console.log("call login page");
        next({name: 'Login'});
    } else {
        next();
    }
})

  export default router;