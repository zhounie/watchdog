import { User } from '../db/index'

export class UserModel {
    constructor() {
        
    }

    async get(query) {
        // const res = await User.find(query)
        try {
            let condition = {}
            // if (Object.keys(query).length) {
            //     condition = {
            //         $or: Object.entries(query).map(([key, value]: [string, string | number]) => {
            //             return {
            //                 [key]: { $regex: new RegExp(''+value, 'i') }
            //             }
            //         })
            //     }
            // }
            console.log(query);
            
            const res = await User.find(condition).skip((query.pageNum  - 1) * query.pageSize).limit(query.pageSize)
            const count = await User.count(condition)
            
            return {
                items: res,
                page: {
                    pageSize: query.pageSize,
                    pageNum: query.pageNum,
                    total:count
                }
            }
       } catch (error) {
        console.log(error);
        
       }
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

