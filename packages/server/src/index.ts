import Koa from 'koa'
import koaBodyparser from 'koa-bodyparser'
import Db from './db/index'
import Router from './routes/index'

const app = new Koa()

new Db()

app.use(koaBodyparser())
app.use(Router.routes())



app.listen(3000, () => {
    console.log('服务已启动: http://localhost:3000')
})
