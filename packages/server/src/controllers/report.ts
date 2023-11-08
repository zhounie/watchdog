import { PerformanceModel } from '../models'
import jwt from 'jsonwebtoken'


class ReportClass {
    private Performance = new PerformanceModel()

    constructor() {
    }
    add = async (ctx, next) => {
        const params = ctx.request.body
        try {
            if (+params.type === 0) {
                const { lcp, cls, fid, href } = params
                await this.Performance.save({
                    href,
                    lcp,
                    cls,
                    fid
                })
            }
            ctx.body = {
                code: 200,
                data: true
            }
        } catch (error) {
            console.log(error);
            
            ctx.body = {
                code: 301,
                data: false
            }
        }
    }

}

export const Report = new ReportClass()