import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 导入Tailwind CSS
import './assets/tailwind.css'
// 导入Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
app.use(router)
app.mount('#app') 