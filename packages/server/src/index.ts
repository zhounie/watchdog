import Koa from 'koa'
import koaBodyparser from 'koa-bodyparser'
import Db from './db/index'
import Router from './routes/index'
import errorMiddleware from './middleware/errorMiddleware'
import jwtMiddleware from './middleware/jwtMiddleware'

const app = new Koa()

new Db()

app.use(errorMiddleware())
app.use(jwtMiddleware())
app.use(koaBodyparser())
app.use(Router.routes())


export default app.listen(3000, () => {
    // console.log('服务已启动: http://localhost:3000')
})
