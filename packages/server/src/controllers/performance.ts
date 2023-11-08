import { PerformanceModel } from '../models'


class PerformanceClass {
    private Performance = new PerformanceModel()

    constructor() {
    }
    getPerformance = async (ctx, next) => {
        
        const users = await this.Performance.get(ctx.request.query)
        
        ctx.body = {
            code: 200,
            data: users
        }
    }
}

export const Performance = new PerformanceClass()