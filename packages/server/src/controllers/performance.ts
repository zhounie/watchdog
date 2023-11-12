import { PerformanceModel } from '../models'


class PerformanceClass {
    private Performance = new PerformanceModel()

    constructor() {
    }
    getPerformance = async (ctx, next) => {
        
        const result = await this.Performance.get(ctx.request.query)
        
        ctx.body = {
            code: 200,
            data: result
        }
    }
    statistics = async (ctx, next) => {
        const result = await this.Performance.statistics()

        ctx.body = {
            code: 200,
            data: result
        }
    }
}

export const Performance = new PerformanceClass()