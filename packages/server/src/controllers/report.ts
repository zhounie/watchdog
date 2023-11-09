import { PerformanceModel, ErrorModel } from '../models'
import jwt from 'jsonwebtoken'


class ReportClass {
    private Performance = new PerformanceModel()
    private Error = new ErrorModel()

    constructor() {
    }
    add = async (ctx, next) => {
        const params = ctx.request.body
        try {
            const userAgent = ctx.request.header['user-agent']
            params.forEach((item) => {
                item.userAgent = userAgent
            })
            const performanceList = params.filter(item => (+item.type) === 0)
            const errorList = params.filter(item => (+item.type) !== 0)
            if (performanceList.length) {
                // const { lcp, cls, fid, href } = performanceList[0]
                // {
                //     href,
                //     lcp,
                //     cls,
                //     fid,
                //     userAgent: ctx.request.header['user-agent']
                // }
                await this.Performance.save(performanceList)
            }
            if (errorList.length) {
                await this.Error.save(errorList)
            }
            // if (+params.type === 0) {
                
            // } else {
                
            // }
            ctx.body = {
                code: 200,
                data: true
            }
        } catch (error) {
            ctx.body = {
                code: 301,
                data: false,
                msg: error
            }
        }
    }

}

export const Report = new ReportClass()