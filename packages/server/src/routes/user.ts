import { Users } from '../controllers/index'
import router from './index'

export default function (router) {
    router
    .get('/user/:id', Users.getUser)
    .get('/user', Users.getUsers)
    .post('/user', Users.addUser)
    .put('/user', Users.updateUser)
    .del('/user/:id', Users.delUser)
}