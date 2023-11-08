import type { Context }from 'koa'
import jwt from 'jsonwebtoken'

export default function(options = {}) {

    return async function(ctx: Context, next) {
        const author = ctx.header.authorization
        const excludePath = ['/user/login', '/report']
        if (excludePath.includes(ctx.request.url)) {
            return await next()
        }
        if (!author || !author.startsWith('Bearer ')) {
            return ctx.body =  {
                code: 401,
                msg: '请登录'
            }
        }
        const token = author.split(' ')[1]
        try {
            jwt.verify(token, 'wocao')
            await next()
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return ctx.body = {
                    code: 401,
                    msg: '登录过期'
                }
            }
            return ctx.body = {
                code: 403,
                msg: 'token错误'
            }
        }
    }
}