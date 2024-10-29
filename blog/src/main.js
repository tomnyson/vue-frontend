import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index'; // import the router configuration
import 'bootstrap/dist/css/bootstrap.css'; // import Bootstrap CSS
import { createMetaManager } from 'vue-meta';

const app = createApp(App);
const metaManager = createMetaManager();


app.use(router); // use Vue Router
app.use(metaManager); 

app.mount('#app');