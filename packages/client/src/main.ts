import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'

import router from './router/index'
import dogForm from './components/dogForm.vue'
import dogSearch from './components/dogSearch.vue'
import dogTable from './components/dogTable.vue'

import 'virtual:uno.css'

import { client } from '@watchdog/core'



const app = createApp(App)
app.use(client({
    url: '/api/report',
    isVue: true
}))


// app.config.errorHandler = (err, instance, info) => {
//     console.log(err);
//     console.log(instance);
//     console.log(info);
// }
app.component(dogForm.name, dogForm)
app.component(dogTable.name, dogTable)
app.component(dogSearch.name, dogSearch)

app.use(router)
app.use(Antd)

app.mount('#app')