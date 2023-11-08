import Router from 'koa-router'
import User from './user'
import Report from './report'
import Performance from './performance'

const router = new Router()

User(router)
Report(router)
Performance(router)

export default router