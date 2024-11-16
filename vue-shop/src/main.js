// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import router from './route';
// import "bootstrap/dist/bootstrap/bootstrap.min.js"
createApp(App).use(router).mount('#app')
