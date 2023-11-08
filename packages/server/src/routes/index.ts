import Router from 'koa-router'
import User from './user'
import Report from './report'

const router = new Router()

User(router)
Report(router)

export default router