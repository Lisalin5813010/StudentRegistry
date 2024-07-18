(window as any).global = window;
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import store from 'store'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus);
app.use(router)
app.mount('#app')
