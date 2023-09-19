
export default function (options = {}) {
    
    return async function(ctx, next) {
        try {
            await next()
        } catch (error) {
            ctx.status = error.statusCode || 500
            ctx.body = {
                code: 500,
                msg: error.message
            }
        }
    }
}