// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import router from './route';
import store from './store';
createApp(App).use(router).use(store).mount('#app')
