import { Errors } from '../db/index'


export class ErrorModel {
    async save(params: []) {
        const res = await Errors.insertMany(params)
        return res
    }
    async get(query) {
        try {
            let condition: {
                startTime?: string;
                endTime?: string;
                errorTime?: {
                    $gte: string;
                    $lte: string;
                }
            } = {}
            Object.entries(query).forEach(([key, value]) => {
                if (key !== 'pageNum' && key !== 'pageSize') {
                    condition[key] = value
                }
            })
            if(condition.startTime && condition.endTime) {
                condition.errorTime = {
                    $gte: condition.startTime,
                    $lte: condition.endTime,
                }
                delete condition.startTime
                delete condition.endTime
            }
            
            const res = await Errors.find(condition).skip((query.pageNum  - 1) * query.pageSize).limit(query.pageSize)
            const count = await Errors.count(condition)
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
}
