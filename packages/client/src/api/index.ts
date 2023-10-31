

import { POST, GET } from '@/utils/request'

export const GetErrorsList = (params = {}) => GET('/user', params)