import { POST, GET, DELETE } from '@/utils/request'

export const GetUserList = (params = {}) => GET('/user', params)
export const DeleteUser = (params = {}) => DELETE(`/user/${params.id}`, params)
export const Login = (params={}) => POST('/user/login', params)