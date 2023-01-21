import { createApp, h, provide } from 'vue'
import App from './App.vue'
import router from './router'
import { apolloClient } from '@/apollo-config'

import './assets/main.css'
import './index.css'


const app = createApp(App)

app.use(router)
app.use(apolloClient as any)

app.mount('#app')
