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

    async findOne(query) {
        const res = await User.findOne(query)
        return res
    }

    async save(params) {
        const res = await User.create(params)
        return res
    }

    async update(query, params) {
        const res = await User.findOneAndUpdate(query, params)
        return res
    }

    async del(id) {
        const res = await User.findOneAndRemove(id)
        return res
    }
}

