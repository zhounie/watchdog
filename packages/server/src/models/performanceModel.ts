import { User, Performance, Errors } from '../db/index'

export class PerformanceModel {
    async save(params: []) {
        const res = await Performance.insertMany(params)
        return res
    }
    async get(query) {
        try {
            let condition = {}
            const res = await Performance.find(condition).skip((query.pageNum  - 1) * query.pageSize).limit(query.pageSize)
            const count = await Performance.count(condition)
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
    async statistics() {
        try {
            const res = await Performance.aggregate([
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createTime"
                            }
                        },
                        lcp: {
                            '$avg': "$lcp"
                        },
                        cls: {
                            '$avg': "$cls"
                        },
                        fid: {
                            '$avg': "$fid"
                        },
                        count: {
                            '$sum': 1
                        }
                    },
                    
                },
                {
                    $project: {
                        createTime: '$_id',
                        lcp: '$lcp',
                        cls: '$cls',
                        fid: '$fid',
                        count: '$count',
                        _id: 0
                    }
                },
                {
                    $sort: {
                        createTime: 1
                    }
                }
            ])
            return res
        } catch (error) {
            console.log(error)
        }
    }
}

