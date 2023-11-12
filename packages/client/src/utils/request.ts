import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import router from '../router/index'
import { Modal } from 'ant-design-vue'


const instance = axios.create({
    baseURL: '/api'
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers = Object.assign(config.headers, {
        Authorization: `Bearer ${token}`
    })
    
    return config
})

instance.interceptors.response.use((response) => {
    if (response.status === 200) {
        if(response.data.code === 401) {
            Modal.warning({
                title: '登录过期',
                content: `登录过期，请重新登录。`,
                afterClose: () => {
                    router.push({
                        path: '/login'
                    })
                }
            });
        }
        return response.data
    }
    return response
})


const request = async (options: AxiosRequestConfig) => {
    return await instance(options)
}


export const POST = async (url: string, params: Record<string, any> = {}) => {
    return await request({
        method: 'post',
        url,
        data: params
    })
}

export const GET = async (url: string, params: Record<string, any> = {}) => {
    return await request({
        method: 'get',
        url,
        params
    })
}

export const DELETE = async (url: string, params: Record<string, any> = {}) => {
    return await request({
        method: 'delete',
        url,
        params
    })
}

export const PUT = async (url: string, params: Record<string, any> = {}) => {
    return await request({
        method: 'put',
        url,
        data: params
    })
}
