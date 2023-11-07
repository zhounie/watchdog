import { PerformanceModel } from '../models'
import jwt from 'jsonwebtoken'


class ReportClass {
    private Performance = new PerformanceModel()

    constructor() {
    }
    add = async (ctx, next) => {
        const {
            type,
            lcp,
            cls,
            fid
        } = ctx.request.body
        try {
            await this.Performance.save({type, lcp, cls, fid})
            ctx.body = {
                code: 200,
                data: true
            }
        } catch (error) {
            
        }
    }

}

export const Report = new ReportClass()