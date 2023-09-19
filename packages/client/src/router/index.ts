import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

console.log(router.getRoutes());


export default router
