import { POST, GET, DELETE, PUT } from '@/utils/request'

export const AddUser = (params = {}) => POST('/user', params)
export const ChangeUser = (params = {}) => PUT('/user', params)
export const GetUserList = (params = {}) => GET('/user', params)
export const DeleteUser = (params = {}) => DELETE(`/user/${params.id}`, params)
export const Login = (params={}) => POST('/user/login', params)


export const GetErrorsList = (params = {}) => GET('/errors', params)