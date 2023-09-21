import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'

import router from './router/index'

const app = createApp(App)
app.use(router)
app.use(Antd)

app.mount('#app')