import { Error } from '../controllers/index'
import router from './index'

export default function (router) {
    router
    .get('/errors', Error.getError)
}