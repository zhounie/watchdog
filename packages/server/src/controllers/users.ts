import { UserModel } from '../models'


class UsersClass {
    private User = new UserModel()

    constructor() {
    }
    getUsers = async (ctx, next) => {
        const users = await this.User.get()
        
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
    addUser() {

    }
    updateUser() {}
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
}

export const Users = new UsersClass()