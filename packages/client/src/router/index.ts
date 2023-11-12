import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/',
        name: '',
        redirect: '/index',
        component: () => import('@/layout/index.vue'),
        children: [
            { path: '/index', component: () => import('@/views/index/index.vue') },
            { path: '/errors', component: () => import('@/views/errors/index.vue') },
            { path: '/users', component: () => import('@/views/users/index.vue') },
            { path: '/performance', component: () => import('@/views/performance/index.vue') },
            { path: '/demo', component: () => import('@/views/demo.vue') },
        ]
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})


export default router
