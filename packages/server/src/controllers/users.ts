import { UserModel } from '../models'
import jwt from 'jsonwebtoken'


class UsersClass {
    private User = new UserModel()

    constructor() {
    }
    getUsers = async (ctx, next) => {
        const users = await this.User.get(ctx.request.query)
        
        ctx.body = {
            code: 200,
            data: users
        }
    }
    getUser = async (ctx, next) => {
        const users = await this.User.findById(ctx.params.id)
        ctx.body = {
            code: 200,
            data: users
        }
    }
    addUser = async (ctx, next) => {
        const { username, password } = ctx.request.body
        try {
            const user = await this.User.findOne({ username })
            if (user) {
                return ctx.body = {
                    code: 204,
                    data: user,
                    msg: '账户名已存在'
                }
            }
            await this.User.save({ username, password })
            ctx.body = {
                code: 200,
                data: true
            }
        } catch (error) {
            
        }
    }
    updateUser = async (ctx) => {
        const { _id, ...params} = ctx.request.body
        try {
            await this.User.update({ _id }, params)
            ctx.body = {
                code: 200,
                data: true
            }
        } catch (error) {
            console.log(error);
        }
    }
    delUser = async (ctx) => {
        try {
            await this.User.del(ctx.params.id)
            ctx.body = {
                code: 200,
                data: true
            }
        } catch (error) {
            
        }
    }
    login = async (ctx) => {
        const { username, password } = ctx.request.body
        const user = await this.User.findOne({ username, password })
        if(!user) {
            return ctx.body = {
                code: 403,
                data: null,
                msg: '用户名或密码错误!'
            }
        }
        
        const token = jwt.sign({
            username: user.username,
            password: user.password,
        }, 'wocao', {
            expiresIn: 60000
        })
        ctx.body = {
            code: 200,
            data: token,
            msg: '登录成功'
        }
    }
}

export const Users = new UsersClass()