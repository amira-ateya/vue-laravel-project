import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ThemeManager } from './utils/themeManager'



import App from './App.vue'
import router from './router'
ThemeManager.init()
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
