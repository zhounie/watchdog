import { User } from '../db/index'

export class UserModel {
    constructor() {
        
    }

    async get() {
        const res = await User.find()
        return res
    }

    async findById(id) {
        const res = await User.findById(id)
        return res
    }

    save() {}

    update() {}

    async del(id) {
        const res = await User.findOneAndRemove(id)
        return res
    }
}

