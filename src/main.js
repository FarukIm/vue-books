import './index.css'

import { createApp } from 'vue'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueCookies, { expires: -1 })
app.use(router)

app.mount('#app')
