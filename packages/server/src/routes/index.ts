import Router from 'koa-router'
import User from './user'

const router = new Router()

User(router)

export default router