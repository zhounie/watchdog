import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'


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
    return response
})


const request = async (options: AxiosRequestConfig) => {
    return await instance(options)
}


export const POST = async (url: string, params: Record<string, any> = {}) => {
    return await request({
        method: 'post',
        url,
        params
    })
}

export const GET = async (url: string, params: Record<string, any> = {}) => {
    return await request({
        method: 'get',
        url,
        params
    })
}