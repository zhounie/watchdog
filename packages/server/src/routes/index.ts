import Router from 'koa-router'
import User from './user'
import Report from './report'
import Performance from './performance'
import Error from './error'

const router = new Router()

User(router)
Report(router)
Performance(router)
Error(router)

export default router