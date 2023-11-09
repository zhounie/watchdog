import { ErrorModel } from '../models'


class ErrorClass {
    private Error = new ErrorModel()

    constructor() {
    }
    getError = async (ctx, next) => {
        
        const result = await this.Error.get(ctx.request.query)
        
        ctx.body = {
            code: 200,
            data: result
        }
    }
}

export const Error = new ErrorClass()